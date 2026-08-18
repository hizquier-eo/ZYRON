from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
EXCLUDED_DIRS = {"Doc", "docs", "tmp"}
STOPWORDS = {
    "además", "algunas", "algunos", "antes", "aunque", "cada", "como",
    "cuando", "desde", "donde", "durante", "entre", "estas", "estos",
    "hacia", "hasta", "mediante", "mientras", "mismo", "otras", "otros",
    "porque", "puede", "pueden", "sobre", "también", "todas", "todos",
    "través", "utiliza", "utilizar", "para", "pero", "según", "solo",
    "tiene", "tienen", "dentro", "fuera", "frente", "con", "del", "las",
    "los", "una", "uno", "unos", "unas", "que", "por", "sin", "más",
}
WORD_RE = re.compile(r"[^\W\d_]{3,}", re.UNICODE)


class CoverageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, dict[str, str]]] = []
        self.paragraphs: list[tuple[str, bool]] = []
        self.card_phrases: list[str] = []
        self.current_kind: str | None = None
        self.current_text: list[str] = []
        self.current_excluded = False

    def handle_starttag(self, tag: str, attrs) -> None:
        attr_map = dict(attrs)
        self.stack.append((tag, attr_map))
        if tag == "p":
            self.current_kind = "p"
            self.current_text = []
            self.current_excluded = self._is_excluded()
        elif tag == "b" and self._has_ancestor_class("strategy-factor-grid"):
            self.current_kind = "card"
            self.current_text = []
            self.current_excluded = False
        elif tag == "h3" and self._has_ancestor_class("doctrine-detail"):
            self.current_kind = "card"
            self.current_text = []
            self.current_excluded = False

    def handle_endtag(self, tag: str) -> None:
        if self.current_kind == "p" and tag == "p":
            self.paragraphs.append((" ".join(self.current_text).strip(), self.current_excluded))
            self.current_kind = None
        elif self.current_kind == "card" and tag in {"b", "h3"}:
            self.card_phrases.append(" ".join(self.current_text).strip())
            self.current_kind = None

        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data: str) -> None:
        if self.current_kind:
            self.current_text.append(data)

    def _has_ancestor_class(self, class_name: str) -> bool:
        return any(
            class_name in attrs.get("class", "").split()
            for _, attrs in self.stack
        )

    def _is_excluded(self) -> bool:
        excluded_tags = {"nav", "button", "code", "pre"}
        if any(tag in excluded_tags for tag, _ in self.stack):
            return True
        return self._has_ancestor_class("ai-lab-tech-sheet")


def has_fallback_candidate(text: str) -> bool:
    for word in WORD_RE.findall(text):
        if word.casefold() not in STOPWORDS:
            return True
    return False


def public_html_files() -> list[Path]:
    files = []
    for path in ROOT.rglob("*.html"):
        relative = path.relative_to(ROOT)
        if relative.parts and relative.parts[0] in EXCLUDED_DIRS:
            continue
        files.append(path)
    return sorted(files)


def main() -> int:
    rows = []
    failures = []
    for path in public_html_files():
        raw = path.read_text(encoding="utf-8")
        parser = CoverageParser()
        parser.feed(raw)

        eligible = [
            (text, excluded)
            for text, excluded in parser.paragraphs
            if not excluded and text
        ]
        excluded = [(text, flag) for text, flag in parser.paragraphs if flag]
        uncovered = [
            text for text, _ in eligible
            if text and not has_fallback_candidate(text)
        ]
        blank = [
            text for text, excluded_flag in parser.paragraphs
            if not excluded_flag and not text
        ]
        script_ok = "site-quality.js?v=20260729-audit-4" in raw
        relative = path.relative_to(ROOT).as_posix()

        if uncovered or not script_ok:
            failures.append((relative, uncovered, blank, script_ok))
        rows.append(
            (
                relative,
                len(parser.paragraphs),
                len(eligible),
                len(excluded),
                len(parser.card_phrases),
                len(uncovered),
                script_ok,
                len(blank),
            )
        )

    print("PÁGINA | PÁRRAFOS | CON TEXTO | EXCLUIDOS | FRASES-TARJETA | SIN COBERTURA | VACÍOS | SCRIPT")
    for row in rows:
        print(
            f"{row[0]} | {row[1]} | {row[2]} | {row[3]} | "
                f"{row[4]} | {row[5]} | {row[7]} | {'OK' if row[6] else 'FALTA'}"
        )
    print(
        f"\nRESUMEN: páginas={len(rows)}; "
        f"párrafos={sum(row[1] for row in rows)}; "
        f"elegibles={sum(row[2] for row in rows)}; "
        f"frases-tarjeta={sum(row[4] for row in rows)}; "
        f"sin-cobertura={sum(row[5] for row in rows)}; "
        f"fallos={len(failures)}"
    )
    if failures:
        for relative, uncovered, blank, script_ok in failures:
            print(f"FALLO {relative}: script={script_ok}; vacíos={len(blank)}")
            for text in uncovered:
                print(f"  SIN PALABRA: {text!r}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
