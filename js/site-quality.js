(() => {
  "use strict";

  const accentTerms = [
    "Inteligencia Organizacional",
    "Inteligencia Artificial",
    "organizaciones inteligentes",
    "conocimiento organizacional",
    "transformación digital",
    "capacidad institucional",
    "aprendizaje continuo",
    "visión evolutiva",
    "impacto sostenible",
    "impacto social",
    "talento humano",
    "toma de decisiones",
    "decisiones inteligentes",
    "experiencias web",
    "aplicaciones ligeras",
    "sitios web",
    "ChatGPT Sites",
    "Centro OpenAI",
    "Ecosistema OpenAI",
    "ZYRON AI LAB",
    "Factores Estratégicos",
    "Identidad Institucional",
    "Razón de Ser",
    "desarrollo sostenible",
    "desarrollo humano",
    "Inteligencia",
    "IA",
    "organización",
    "organizaciones",
    "personas",
    "Ecosistema",
    "ZYRON",
    "misión",
    "visión",
    "valores",
    "doctrina",
    "principios",
    "conducta",
    "declaración",
    "futuro",
    "tecnología",
    "responsabilidad",
    "integridad",
    "confianza",
    "seguridad",
    "privacidad",
    "permisos",
    "publicación",
    "despliegue",
    "versiones",
    "automatización",
    "innovación",
    "conocimiento",
    "aprendizaje",
    "transformación",
    "diagnóstico",
    "indicadores",
    "evidencia",
    "propósito",
    "estrategia",
    "liderazgo",
    "adaptación",
    "evolución",
    "identidad",
    "experiencia",
    "oportunidades",
    "capacidades",
    "arquitectura",
    "metodología",
    "investigación",
    "evaluación",
    "resultados",
    "objetivos",
    "herramientas",
    "recursos",
    "riesgos",
    "datos",
    "modelos",
    "agentes",
    "workflows",
    "LoRAs",
    "datasets"
  ].sort((a, b) => b.length - a.length);

  const escapedTerms = accentTerms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const accentPattern = new RegExp(
    `(?<![\\p{L}\\p{N}])(${escapedTerms.join("|")})(?![\\p{L}\\p{N}])`,
    "giu"
  );
  const contentSelector = [
    "body p",
    "main section p",
    "main section li",
    "main article p",
    "main article li",
    "main .strategy-factor-grid b",
    "main .identity-card h3",
    "main .doctrine-detail h3",
    "main .manifesto-card h2",
    "main .manifesto-copy strong",
    ".section p",
    ".section li",
    ".openai-research-shell p",
    ".openai-research-shell li"
  ].join(",");
  const fallbackStopwords = new Set([
    "además", "algunas", "algunos", "antes", "aunque", "cada", "como",
    "cuando", "desde", "donde", "durante", "entre", "estas", "estos",
    "hacia", "hasta", "mediante", "mientras", "mismo", "otras", "otros",
    "porque", "puede", "pueden", "sobre", "también", "todas", "todos",
    "través", "utiliza", "utilizar", "para", "pero", "según", "solo",
    "tiene", "tienen", "dentro", "fuera", "frente", "con", "del", "las",
    "los", "una", "uno", "unos", "unas", "que", "por", "sin", "más"
  ]);

  const accentTextNode = (textNode, remaining) => {
    const text = textNode.nodeValue;
    if (!text || !text.trim() || remaining <= 0) return 0;

    accentPattern.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let inserted = 0;
    let match;

    while (inserted < remaining && (match = accentPattern.exec(text))) {
      if (match.index > cursor) {
        fragment.append(text.slice(cursor, match.index));
      }
      const accent = document.createElement("span");
      accent.className = "keyword-accent";
      accent.textContent = match[0];
      fragment.append(accent);
      cursor = match.index + match[0].length;
      inserted += 1;
    }

    if (!inserted) return 0;
    fragment.append(text.slice(cursor));
    textNode.replaceWith(fragment);
    return inserted;
  };

  const accentFallback = (textNodes) => {
    let best = null;
    textNodes.forEach((node) => {
      const words = node.nodeValue?.match(/\p{L}{3,}/gu) || [];
      words.forEach((word) => {
        const normalized = word.toLocaleLowerCase("es");
        if (fallbackStopwords.has(normalized)) return;
        if (!best || word.length > best.word.length) best = { node, word };
      });
    });
    if (!best) return;

    const index = best.node.nodeValue.indexOf(best.word);
    if (index < 0) return;
    const fragment = document.createDocumentFragment();
    fragment.append(best.node.nodeValue.slice(0, index));
    const accent = document.createElement("span");
    accent.className = "keyword-accent";
    accent.textContent = best.word;
    fragment.append(accent);
    fragment.append(best.node.nodeValue.slice(index + best.word.length));
    best.node.replaceWith(fragment);
  };

  document.querySelectorAll(contentSelector).forEach((block) => {
    if (block.closest("nav, button, code, pre, .ai-lab-tech-sheet")) return;

    const initialAccents = block.querySelectorAll(".keyword-accent").length;
    let remaining = Math.max(0, 2 - initialAccents);
    if (!remaining) return;

    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest(".keyword-accent, button, code, pre")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      if (remaining <= 0) return;
      remaining -= accentTextNode(node, remaining);
    });

    if (
      initialAccents === 0 &&
      remaining === 2 &&
      block.textContent.trim().length >= 3
    ) {
      accentFallback(textNodes);
    }
  });

  const returnKey = "zyronPageOrigin";
  document.querySelectorAll('a[href$=".pdf"], a[href*=".pdf?"]').forEach((link) => {
    if (link.hasAttribute("download") || (link.hasAttribute("data-pdf-title") && document.querySelector(".pdf-modal"))) return;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("aria-label", `${link.textContent.trim()} (abre en una pestaña nueva)`);
  });
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (
      !link ||
      link.hasAttribute("download") ||
      link.hasAttribute("data-return-to-origin") ||
      link.target === "_blank"
    ) return;
    try {
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
      sessionStorage.setItem(returnKey, JSON.stringify({
        destination: destination.href,
        source: window.location.href
      }));
    } catch {
      // Los enlaces no navegables se ignoran.
    }
  });

  document.querySelectorAll("[data-return-to-origin]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      const fallback = control.getAttribute("href") || "../../centro-investigacion-openai.html";
      try {
        const stored = JSON.parse(sessionStorage.getItem(returnKey) || "null");
        const current = new URL(window.location.href);
        const destination = stored?.destination ? new URL(stored.destination) : null;
        const source = stored?.source ? new URL(stored.source) : null;
        if (
          destination &&
          source &&
          destination.pathname === current.pathname &&
          source.origin === current.origin &&
          source.href !== current.href
        ) {
          window.location.href = source.href;
          return;
        }
      } catch {
        // Si el origen guardado no es válido, se utiliza el destino seguro.
      }
      window.location.href = fallback;
    });
  });
})();
