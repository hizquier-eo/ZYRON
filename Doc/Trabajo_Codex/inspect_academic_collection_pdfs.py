from pathlib import Path
import json
from pypdf import PdfReader

ROOT = Path(r"C:\Users\ASUS\Desktop\Empresa Zyron\ZYRON PRIMUS")
EVIDENCE = ROOT / "Doc" / "Evidencia" / "2026-07-28_COLECCION_ACADEMICA_ZYRON_AI"
EVIDENCE.mkdir(parents=True, exist_ok=True)
titles = [
    "Manual Maestro de Inteligencia Artificial",
    "Ingeniería Profesional de Prompts",
    "Biblioteca Profesional de Prompts ZYRON",
    "Cuaderno del Participante",
    "Manual Maestro del Laboratorio de Inteligencia Artificial",
    "Casos Prácticos Profesionales con Inteligencia Artificial",
]
results = []
for pdf in ROOT.rglob("*.pdf"):
    relative = pdf.relative_to(ROOT).as_posix()
    if relative.startswith("Doc/Trabajo_Codex/phase"):
        continue
    item = {"path": relative, "size": pdf.stat().st_size, "pages": None, "matches": [], "error": None}
    try:
        reader = PdfReader(str(pdf))
        item["pages"] = len(reader.pages)
        text = "\n".join((p.extract_text() or "") for p in reader.pages[:5])
        folded = text.casefold()
        item["matches"] = [title for title in titles if title.casefold() in folded]
    except Exception as exc:
        item["error"] = str(exc)
    results.append(item)
report = {
    "searched_root": str(ROOT),
    "required_titles": titles,
    "pdfs_checked": len(results),
    "matches": [item for item in results if item["matches"]],
    "all_files": results,
}
(EVIDENCE / "inspeccion-pdf-inicial.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"pdfs_checked": len(results), "matches": report["matches"]}, ensure_ascii=False, indent=2))
