const contactForm = document.querySelector(".contact-form");
const quickNav = document.querySelector(".quick-nav");
const quickLinks = document.querySelectorAll(".quick-nav a");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const primaryNavigation = document.querySelector(".primary-nav");
let quickNavWasVisible = false;
let pageReturnScrollY = null;
let pageReturnButton = null;

const closeMobileMenu = () => {
  if (!mobileMenuToggle || !primaryNavigation) return;
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  mobileMenuToggle.setAttribute("aria-label", "Abrir menú principal");
  primaryNavigation.classList.remove("is-open");
  document.body.classList.remove("mobile-menu-open");
};

mobileMenuToggle?.addEventListener("click", () => {
  const willOpen = mobileMenuToggle.getAttribute("aria-expanded") !== "true";
  mobileMenuToggle.setAttribute("aria-expanded", String(willOpen));
  mobileMenuToggle.setAttribute("aria-label", willOpen ? "Cerrar menú principal" : "Abrir menú principal");
  primaryNavigation?.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("mobile-menu-open", willOpen);
});

primaryNavigation?.querySelectorAll("a, button").forEach((link) => link.addEventListener("click", closeMobileMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeMobileMenu();
});

const resetQuickNavStart = () => {
  if (quickNav) quickNav.scrollLeft = 0;
};

const getReturnPoint = () => ({
  href: window.location.href,
  path: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
  scrollY: window.scrollY
});

const storeReturnPoint = (point = getReturnPoint()) => {
  sessionStorage.setItem("zyronReturnPoint", JSON.stringify(point));
};

const ensurePageReturnButton = () => {
  if (pageReturnButton) return pageReturnButton;
  pageReturnButton = document.createElement("button");
  pageReturnButton.type = "button";
  pageReturnButton.className = "page-return-button";
  pageReturnButton.innerHTML = '<span aria-hidden="true">←</span><b>Volver</b>';
  pageReturnButton.setAttribute("aria-label", "Volver al punto anterior");
  pageReturnButton.addEventListener("click", () => {
    const raw = sessionStorage.getItem("zyronReturnPoint");
    if (raw) {
      try {
        const point = JSON.parse(raw);
        if (point.path && point.path !== window.location.pathname) {
          location.href = point.href || `${point.path}${point.search || ""}${point.hash || ""}`;
          return;
        }
        sessionStorage.removeItem("zyronReturnPoint");
        window.scrollTo({ top: Number(point.scrollY || 0), behavior: "smooth" });
        pageReturnButton.classList.remove("is-visible");
        pageReturnScrollY = null;
        return;
      } catch (error) {
        sessionStorage.removeItem("zyronReturnPoint");
      }
    }
    if (pageReturnScrollY === null) return;
    window.scrollTo({ top: pageReturnScrollY, behavior: "smooth" });
    pageReturnButton.classList.remove("is-visible");
    pageReturnScrollY = null;
  });
  document.body.appendChild(pageReturnButton);
  return pageReturnButton;
};

const rememberPageReturnPoint = () => {
  pageReturnScrollY = window.scrollY;
  storeReturnPoint({ ...getReturnPoint(), scrollY: pageReturnScrollY });
  ensurePageReturnButton().classList.add("is-visible");
};

const restoreSavedReturnPoint = () => {
  const raw = sessionStorage.getItem("zyronReturnPoint");
  if (!raw) return false;
  try {
    const point = JSON.parse(raw);
    if (point.path && point.path !== window.location.pathname) return false;
    const top = Number(point.scrollY || 0);
    const apply = () => window.scrollTo({ top, behavior: "auto" });
    apply();
    requestAnimationFrame(apply);
    setTimeout(apply, 80);
    setTimeout(apply, 260);
    sessionStorage.removeItem("zyronReturnPoint");
    ensurePageReturnButton().classList.remove("is-visible");
    pageReturnScrollY = null;
    if (point.hash) history.replaceState(null, "", `${window.location.pathname}${window.location.search}${point.hash}`);
    return true;
  } catch (error) {
    sessionStorage.removeItem("zyronReturnPoint");
    return false;
  }
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.dataset.videoSrc || link.classList.contains("page-return-button")) return;
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target && href !== "#top" && href !== "#inicio") return;
    event.preventDefault();
    rememberPageReturnPoint();
    if (href === "#top" || href === "#inicio") {
      resetQuickNavStart();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}${href}`);
  });
});

document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (link.target || link.href.startsWith("mailto:") || link.href.startsWith("tel:")) return;
    storeReturnPoint(getReturnPoint());
  });
});

window.addEventListener("pageshow", () => {
  restoreSavedReturnPoint();
});
const imageModal = document.querySelector(".image-modal");
const imageModalImage = imageModal?.querySelector("img");
const imageModalCaption = imageModal?.querySelector("p");
const imageModalClose = imageModal?.querySelector(".image-modal__close");
const pdfModal = document.querySelector(".pdf-modal");
const pdfModalFrame = pdfModal?.querySelector("iframe");
const pdfModalTitle = pdfModal?.querySelector("strong");
const pdfModalDownload = pdfModal?.querySelector(".pdf-modal__download");
const constructionModal = document.querySelector(".construction-modal");
const siteMapModal = document.querySelector(".site-map-modal");
const siteMapClose = siteMapModal?.querySelector(".site-map-modal__close");
let siteMapReturnTarget = null;
let imageModalReturnTarget = null;
let pdfModalReturnTarget = null;
let constructionReturnTarget = null;
let issuedCredential = null;

const syncModalPageState = () => {
  const hasOpenModal = Boolean(document.querySelector(".video-modal.is-open, .image-modal.is-open, .pdf-modal.is-open, .construction-modal.is-open, .site-map-modal.is-open"));
  document.body.classList.toggle("is-modal-open", hasOpenModal);
};

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
})[char]);

const getAccentStart = (text) => {
  const clean = text.trim();
  const sentenceMatch = clean.match(/\.\s+([^.]+\.?)$/);
  if (sentenceMatch && sentenceMatch[1].length >= 8) {
    return clean.lastIndexOf(sentenceMatch[1]);
  }

  const commaIndex = Math.max(clean.lastIndexOf(","), clean.lastIndexOf(":"));
  if (commaIndex > 0 && clean.length - commaIndex <= 34) {
    return commaIndex + 1;
  }

  const connector = clean.lastIndexOf(" y ");
  if (connector > 0 && clean.length - connector <= 36) {
    return connector + 3;
  }

  const words = clean.split(/\s+/);
  if (words.length <= 2) return -1;
  const accentWordCount = Math.min(3, Math.max(1, Math.ceil(words.length * 0.28)));
  return clean.lastIndexOf(words.slice(-accentWordCount).join(" "));
};


const highlightTerms = [
  "Inteligencia Organizacional",
  "Inteligencia Artificial",
  "organizaciones inteligentes",
  "conocimiento organizacional",
  "capacidad institucional",
  "aprendizaje continuo",
  "visión evolutiva",
  "impacto social",
  "talento humano",
  "propósito",
  "evidencia",
  "innovación",
  "conocimiento",
  "estrategia",
  "liderazgo",
  "adaptarse",
  "evolución",
  "identidad",
  "experiencia",
  "oportunidades",
  "capacidades",
  "diagnóstico",
  "indicadores",
  "automatizarse",
  "modelos ZYRON",
  "LoRAs",
  "datasets",
  "workflows",
  "entrenamiento",
  "evaluación",
  "decisiones",
  "aprendizaje",
  "transformación"
];
const highlightRegex = new RegExp(`\\b(${highlightTerms.map((term) => term.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")).join("|")})\\b`, "gi");
const highlightSelectors = ".section p, .section li, .metric-card p, .zyron-lab-detail p, .dashboard-copy p";

document.querySelectorAll(highlightSelectors).forEach((node) => {
  if (node.closest("a, button") || node.querySelector(".keyword-accent")) return;
  node.innerHTML = node.innerHTML.replace(highlightRegex, '<span class="keyword-accent">$1</span>');
});
document.querySelectorAll([
  ".section-heading h1",
  ".section-heading h2",
  ".manifesto-card h2",
  ".campaign-hero h3",
  ".advisory-visual h2",
  ".owner-card h2",
  ".feature-window h2",
  ".float-card h2",
  ".doctrine-detail h3",
  ".method-grid h3",
  ".academy-grid h3",
  ".proof-grid h3",
  ".dashboard-copy h3",
  ".gauge-card h3"
].join(",")).forEach((title) => {
  if (title.querySelector(".title-accent")) return;
  const text = title.textContent.trim();
  const start = getAccentStart(text);
  if (start <= 0) return;
  const before = text.slice(0, start).trimEnd();
  const accent = text.slice(start).trimStart();
  title.innerHTML = `${escapeHtml(before)} <span class="title-accent">${escapeHtml(accent)}</span>`;
});

const updateQuickNav = () => {
  const showFloatingNavigation = window.scrollY > window.innerHeight * 0.45;
  const showOrbitPanels = window.scrollY > window.innerHeight * 0.82;
  if (quickNav) {
    quickNav.classList.toggle("is-visible", showFloatingNavigation);
    if (showFloatingNavigation && !quickNavWasVisible) {
      quickNav.scrollTo({ left: 0, behavior: "auto" });
    }
  }
  quickNavWasVisible = showFloatingNavigation;
  document.body.classList.toggle("is-orbit-visible", showOrbitPanels);

  let activeId = "";
  document.querySelectorAll("section[id]").forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.38) {
      activeId = section.id;
    }
  });

  quickLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isHome = activeId === "inicio" && href === "#top";
    link.classList.toggle("is-active", href === `#${activeId}` || isHome);
  });
};

window.addEventListener("scroll", updateQuickNav, { passive: true });
window.addEventListener("load", updateQuickNav);
window.addEventListener("load", resetQuickNavStart);

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = "Solicitud de asesoría, consultoría o formación ZYRON";
    const body = [
      `Nombre: ${data.get("nombre") || ""}`,
      `Empresa / institución: ${data.get("empresa") || ""}`,
      `Cargo: ${data.get("cargo") || ""}`,
      `País / ciudad: ${data.get("pais") || ""}`,
      `Correo: ${data.get("correo") || ""}`,
      `WhatsApp: ${data.get("whatsapp") || ""}`,
      `Servicio requerido: ${data.get("servicio") || ""}`,
      "",
      "Mensaje:",
      data.get("mensaje") || ""
    ].join("\\n");

    window.location.href = `mailto:hizquier@gmail.com?cc=henryizquierdo2025@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  if (!counter || counter.dataset.done) return;
  counter.dataset.done = "true";
  const target = Number(counter.dataset.target || 0);
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  }, { threshold: 0.22, rootMargin: "0px 0px -8% 0px" });

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach(animateCounter);
}

window.addEventListener("load", () => {
  setTimeout(() => counters.forEach((counter) => {
    if (!counter.dataset.done && counter.getBoundingClientRect().top < window.innerHeight) animateCounter(counter);
  }), 700);
});

const videoModal = document.querySelector(".video-modal");
const videoPlayer = videoModal?.querySelector("video");
const videoSource = videoPlayer?.querySelector("source");
let videoModalReturnTarget = null;
let videoModalReturnScrollY = 0;

document.querySelectorAll(".video-card, [data-video-src]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    if (!videoModal || !videoPlayer || !videoSource) return;
    const title = trigger.dataset.videoTitle || "Video ZYRON";
    const src = trigger.dataset.videoSrc || "";
    if (!src) return;
    videoModalReturnTarget = trigger;
    videoModalReturnScrollY = window.scrollY;
    videoModal.querySelector("h3").textContent = title;
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.removeAttribute("src");
    videoSource.removeAttribute("src");
    videoModal.classList.add("is-open");
    syncModalPageState();
    videoModal.setAttribute("aria-hidden", "false");
    videoPlayer.src = src;
    videoPlayer.load();
    videoPlayer.focus({ preventScroll: true });
  });
});

const closeVideoModal = () => {
  if (!videoModal || !videoPlayer || !videoSource) return;
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoPlayer.removeAttribute("src");
  videoSource.removeAttribute("src");
  videoPlayer.load();
  videoModal.classList.remove("is-open");
  syncModalPageState();
  videoModal.setAttribute("aria-hidden", "true");
  window.scrollTo({ top: videoModalReturnScrollY, behavior: "auto" });
  videoModalReturnTarget?.focus({ preventScroll: true });
};

// El video queda abierto al finalizar; se vuelve con el botón Inicio.
document.querySelector(".video-modal__close")?.addEventListener("click", closeVideoModal);
document.querySelector(".video-modal")?.addEventListener("click", (event) => {
  if (event.target.classList.contains("video-modal")) closeVideoModal();
});

const zoomableImages = document.querySelectorAll([
  ".doctrine-detail img",
  ".campaign-hero img",
  ".campaign-grid img",
  ".credential-preview img",
  ".advisory-visual img",
  ".zyron-lab-visual img",
  ".zyron-lab-detail img"
].join(","));

zoomableImages.forEach((image) => {
  if (image.closest("a, button")) return;
  image.setAttribute("tabindex", "0");
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Ampliar imagen: ${image.alt || "ZYRON"}`);
});

const openImageModal = (image) => {
  if (!imageModal || !imageModalImage || !imageModalCaption) return;
  imageModalReturnTarget = image;
  imageModalImage.src = image.currentSrc || image.src;
  imageModalImage.alt = image.alt || "Imagen ZYRON ampliada";
  imageModalCaption.textContent = image.alt || "Imagen ZYRON ampliada";
  imageModal.classList.add("is-open");
    syncModalPageState();
  imageModal.setAttribute("aria-hidden", "false");
  imageModalClose?.focus();
};

const closeImageModal = () => {
  if (!imageModal || !imageModalImage) return;
  imageModal.classList.remove("is-open");
  syncModalPageState();
  imageModal.setAttribute("aria-hidden", "true");
  imageModalImage.removeAttribute("src");
  imageModalReturnTarget?.focus({ preventScroll: true });
  imageModalReturnTarget = null;
};

const openPdfModal = (link) => {
  if (!pdfModal || !pdfModalFrame || !pdfModalTitle || !pdfModalDownload) return;
  pdfModalReturnTarget = link;
  const href = link.getAttribute("href");
  const title = link.dataset.pdfTitle || link.textContent.trim() || "Documento ZYRON";
  pdfModalTitle.textContent = title;
  pdfModalFrame.src = href;
  pdfModalDownload.href = href;
  pdfModalDownload.setAttribute("download", `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  pdfModal.classList.add("is-open");
    syncModalPageState();
  pdfModal.setAttribute("aria-hidden", "false");
  pdfModal.querySelector(".pdf-modal__close")?.focus();
};

const closePdfModal = () => {
  if (!pdfModal || !pdfModalFrame) return;
  pdfModal.classList.remove("is-open");
  syncModalPageState();
  pdfModal.setAttribute("aria-hidden", "true");
  pdfModalFrame.removeAttribute("src");
  pdfModalReturnTarget?.focus({ preventScroll: true });
  pdfModalReturnTarget = null;
};

const openConstructionModal = (link) => {
  if (!constructionModal) return;
  constructionReturnTarget = link;
  const title = link.dataset.underConstruction || "Recurso ZYRON";
  constructionModal.querySelector("span").textContent = title;
  constructionModal.classList.add("is-open");
    syncModalPageState();
  constructionModal.setAttribute("aria-hidden", "false");
  constructionModal.querySelector(".construction-modal__close")?.focus();
};

const closeConstructionModal = () => {
  if (!constructionModal) return;
  constructionModal.classList.remove("is-open");
  syncModalPageState();
  constructionModal.setAttribute("aria-hidden", "true");
  constructionReturnTarget?.focus({ preventScroll: true });
  constructionReturnTarget = null;
};

const openSiteMapModal = (trigger) => {
  if (!siteMapModal) return;
  siteMapReturnTarget = trigger || document.activeElement;
  siteMapModal.classList.add("is-open");
  syncModalPageState();
  siteMapModal.setAttribute("aria-hidden", "false");
  siteMapClose?.focus({ preventScroll: true });
};

const closeSiteMapModal = () => {
  if (!siteMapModal) return;
  siteMapModal.classList.remove("is-open");
  syncModalPageState();
  siteMapModal.setAttribute("aria-hidden", "true");
  siteMapReturnTarget?.focus?.({ preventScroll: true });
  siteMapReturnTarget = null;
};

document.querySelectorAll("[data-site-map-open]").forEach((button) => {
  button.addEventListener("click", () => openSiteMapModal(button));
});

document.querySelectorAll("[data-lab-back]").forEach((button) => {
  button.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else window.location.href = "#zyron-ai-lab";
  });
});

document.querySelectorAll("[data-lab-forward]").forEach((button) => {
  button.addEventListener("click", () => history.forward());
});

siteMapClose?.addEventListener("click", closeSiteMapModal);
siteMapModal?.addEventListener("click", (event) => {
  if (event.target.classList.contains("site-map-modal")) closeSiteMapModal();
});

const siteMapSearch = siteMapModal?.querySelector("[data-site-map-search]");
const siteMapEmpty = siteMapModal?.querySelector("[data-site-map-empty]");
const siteSearchResults = siteMapModal?.querySelector("[data-site-search-results]");
const siteMapGrids = siteMapModal?.querySelectorAll(".site-map-grid");
let globalSearchIndex = null;
let globalSearchRequest = null;
let globalSearchVersion = 0;
const normalizeSiteMapText = (value) => String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

const buildMapLinkSearchEntries = () => {
  const entries = [];
  siteMapModal?.querySelectorAll(".site-map-grid a[href]").forEach((link) => {
    const label = link.textContent.trim();
    if (!label) return;
    const mapSection = link.closest("section")?.querySelector("h3")?.textContent.trim() || "Mapa ZYRON";
    entries.push({
      title: label,
      section: `Mapa ZYRON · ${mapSection}`,
      text: [label, link.dataset.searchTerms || ""].join(" ").trim(),
      url: link.getAttribute("href") || ""
    });
  });
  return entries;
};

const getGlobalSearchPool = () => {
  if (Array.isArray(globalSearchIndex) && globalSearchIndex.length) return globalSearchIndex;
  if (Array.isArray(window.ZYRON_SEARCH_INDEX) && window.ZYRON_SEARCH_INDEX.length) {
    globalSearchIndex = [...buildMapLinkSearchEntries(), ...window.ZYRON_SEARCH_INDEX];
    return globalSearchIndex;
  }
  return buildMapLinkSearchEntries();
};

const loadGlobalSearchIndex = () => {
  if (globalSearchRequest) return globalSearchRequest;
  if (Array.isArray(window.ZYRON_SEARCH_INDEX) && window.ZYRON_SEARCH_INDEX.length) {
    globalSearchIndex = [...buildMapLinkSearchEntries(), ...window.ZYRON_SEARCH_INDEX];
    globalSearchRequest = Promise.resolve(globalSearchIndex);
    return globalSearchRequest;
  }
  globalSearchRequest = fetch("assets/zyron-search-index.json")
    .then((response) => {
      if (!response.ok) throw new Error("Índice global no disponible");
      return response.json();
    })
    .then((items) => {
      globalSearchIndex = Array.isArray(items) ? [...buildMapLinkSearchEntries(), ...items] : buildMapLinkSearchEntries();
      return globalSearchIndex;
    })
    .catch(() => {
      globalSearchIndex = buildMapLinkSearchEntries();
      return globalSearchIndex;
    });
  return globalSearchRequest;
};

const scoreSearchResult = (item, terms, phrase) => {
  const title = normalizeSiteMapText(item.title);
  const section = normalizeSiteMapText(item.section);
  const text = normalizeSiteMapText(item.text);
  let score = 0;
  const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const phraseBoundary = new RegExp(`(^|[^a-z0-9])${escapedPhrase}([^a-z0-9]|$)`);
  if (phraseBoundary.test(title)) score += 140;
  if (phraseBoundary.test(section)) score += 90;
  if (phraseBoundary.test(text)) score += 70;
  if (title.includes(phrase)) score += 80;
  if (section.includes(phrase)) score += 45;
  if (text.includes(phrase)) score += 35;
  terms.forEach((term) => {
    if (title.includes(term)) score += 18;
    if (section.includes(term)) score += 10;
    if (text.includes(term)) score += 5;
  });
  return score;
};

const goToSamePageHash = (hash) => {
  closeSiteMapModal();
  if ((hash === "#top" || hash === "#inicio") && !document.querySelector(hash)) {
    resetQuickNavStart();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    return;
  }
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", hash);
  }
};

const openGlobalSearchResult = (event, item) => {
  const rawUrl = String(item.url || "");
  if (rawUrl.startsWith("#")) {
    event.preventDefault();
    goToSamePageHash(rawUrl);
    return;
  }
  const targetUrl = new URL(rawUrl, window.location.href);
  const normalizePath = (path) => path.endsWith("/") ? `${path}index.html` : path;
  const currentPath = normalizePath(window.location.pathname);
  const targetPath = normalizePath(targetUrl.pathname);
  if (targetUrl.origin === window.location.origin && targetPath === currentPath && targetUrl.hash) {
    event.preventDefault();
    goToSamePageHash(targetUrl.hash);
  }
};

const renderGlobalSearch = async () => {
  if (!siteMapModal || !siteSearchResults) return;
  const rawQuery = siteMapSearch?.value || "";
  const query = normalizeSiteMapText(rawQuery).trim();
  const requestVersion = ++globalSearchVersion;
  const searching = query.length > 0;
  siteMapGrids?.forEach((grid) => grid.classList.toggle("is-searching", searching));
  siteSearchResults.classList.toggle("is-visible", searching);
  siteMapEmpty?.classList.remove("is-visible");
  if (!searching) {
    siteSearchResults.innerHTML = "";
    siteSearchResults.dataset.query = "";
    return;
  }

  if (!globalSearchRequest && !Array.isArray(window.ZYRON_SEARCH_INDEX) ) {
    siteSearchResults.innerHTML = '<p class="site-search-status">Buscando contenido de ZYRON…</p>';
  }
  await loadGlobalSearchIndex();
  if (requestVersion !== globalSearchVersion || normalizeSiteMapText(siteMapSearch?.value || "").trim() !== query) return;
  const terms = query.split(/\s+/).filter(Boolean);
  const pool = getGlobalSearchPool();
  const scored = pool
    .map((item) => ({ item, score: scoreSearchResult(item, terms, query), haystack: normalizeSiteMapText(`${item.title} ${item.section} ${item.text}`) }))
    .filter((result) => result.score > 0);
  const fullMatches = scored.filter((result) => terms.every((term) => result.haystack.includes(term)));
  const results = (fullMatches.length ? fullMatches : scored).sort((a, b) => b.score - a.score);

  const visibleResults = results.slice(0, 40);
  siteSearchResults.innerHTML = "";
  siteSearchResults.dataset.query = query;
  visibleResults.forEach(({ item }) => {
    const link = document.createElement("a");
    link.className = "site-search-result";
    link.href = item.url;
    const title = document.createElement("strong");
    title.textContent = item.title || item.url;
    const origin = document.createElement("span");
    origin.textContent = item.section;
    const excerpt = document.createElement("p");
    excerpt.textContent = item.text;
    link.append(title, origin, excerpt);
    link.addEventListener("click", (event) => openGlobalSearchResult(event, item));
    siteSearchResults.appendChild(link);
  });
  if (results.length > visibleResults.length) {
    const more = document.createElement("p");
    more.className = "site-search-status";
    more.textContent = `Mostrando ${visibleResults.length} de ${results.length} coincidencias. Afina la búsqueda para mejores resultados.`;
    siteSearchResults.appendChild(more);
  }
  siteMapEmpty.textContent = "No se encontraron resultados en el contenido global de ZYRON.";
  siteMapEmpty?.classList.toggle("is-visible", results.length === 0);
};

siteMapSearch?.addEventListener("input", renderGlobalSearch);
siteMapSearch?.addEventListener("focus", loadGlobalSearchIndex);

if (window.location.hash === "#mapa-zyron") {
  setTimeout(() => openSiteMapModal(document.querySelector("[data-site-map-open]")), 120);
}

siteMapModal?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    const labPanel = link.dataset.labMapPanel;
    closeSiteMapModal();
    if (labPanel) setTimeout(() => openLabPanel(labPanel, true), 80);
  });
});
zoomableImages.forEach((image) => {
  if (image.closest("a, button")) return;
  image.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openImageModal(image);
  });

  image.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    openImageModal(image);
  });
});

document.querySelector(".view-credential")?.addEventListener("click", () => {
  const credential = document.querySelector("#academia-diplomados .credential-preview img");
  if (credential) openImageModal(credential);
});

document.querySelector(".credential-result__preview")?.addEventListener("click", (event) => {
  openImageModal(event.currentTarget);
});

document.querySelectorAll('a[href$=".pdf"], a[href*=".pdf?"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.dataset.pdfDownload === "true") return;
    event.preventDefault();
    openPdfModal(link);
  });
});

document.querySelectorAll("[data-under-construction]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openConstructionModal(link);
  });
});

const normalizeCredentialText = (value) => (value || "")
  .trim()
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

const createCredentialCode = async (identity, eventName) => {
  const source = `ZYRON|${normalizeCredentialText(identity)}|${normalizeCredentialText(eventName)}`;
  const bytes = new TextEncoder().encode(source);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 24)
    .toUpperCase()
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");
};

const renderQr = (container, code) => {
  if (!container) return;
  const compact = code.replace(/-/g, "");
  container.innerHTML = "";
  for (let index = 0; index < 169; index += 1) {
    const cell = document.createElement("span");
    const charCode = compact.charCodeAt(index % compact.length);
    const on = ((charCode + index * 7 + Math.floor(index / 13) * 11) % 5) < 2;
    cell.classList.toggle("is-on", on || index < 3 || index % 13 < 3 && index < 39);
    container.appendChild(cell);
  }
};

const ensureIssuedDiploma = () => {
  let diploma = document.querySelector(".issued-diploma");
  if (diploma) return diploma;
  diploma = document.createElement("section");
  diploma.className = "issued-diploma";
  diploma.innerHTML = `
    <img src="assets/diploma-zyron-credencial.png?v=diploma-pdf" alt="Diploma electrónico ZYRON" />
    <div class="issued-diploma__data">
      <strong class="issued-diploma__name"></strong>
      <strong class="issued-diploma__event"></strong>
      <span></span>
      <strong class="issued-diploma__code"></strong>
    </div>
    <div class="issued-diploma__qr" aria-label="QR único del diploma"></div>
  `;
  document.body.appendChild(diploma);
  return diploma;
};

const updateIssuedDiploma = (credential) => {
  const diploma = ensureIssuedDiploma();
  diploma.querySelector(".issued-diploma__name").textContent = credential.identity.toUpperCase();
  diploma.querySelector(".issued-diploma__event").textContent = credential.eventName.toUpperCase();
  diploma.querySelector(".issued-diploma__code").textContent = `Código visual de simulación: ${credential.code}`;
  renderQr(diploma.querySelector(".issued-diploma__qr"), credential.code);
  return diploma;
};

document.querySelector(".credential-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const identity = data.get("identidad") || "";
  const eventName = data.get("evento") || "";
  const code = await createCredentialCode(identity, eventName);
  issuedCredential = { identity: String(identity).trim(), eventName: String(eventName).trim(), code };

  const result = document.querySelector(".credential-result");
  result.querySelector("h4").textContent = "Simulación generada correctamente";
  result.querySelector("p").textContent = `Código visual de demostración: ${code}. No constituye una verificación ni una credencial oficial.`;
  renderQr(result.querySelector(".credential-qr"), code);
  document.querySelector(".print-credential").disabled = false;
  document.querySelector(".view-issued-credential").disabled = false;
  updateIssuedDiploma(issuedCredential);
});

document.querySelector(".print-credential")?.addEventListener("click", () => {
  if (!issuedCredential) return;
  updateIssuedDiploma(issuedCredential);
  window.print();
});

document.querySelector(".view-issued-credential")?.addEventListener("click", () => {
  if (!issuedCredential) return;
  const diploma = updateIssuedDiploma(issuedCredential);
  const preview = diploma.querySelector("img");
  if (preview) openImageModal(preview);
});

imageModalClose?.addEventListener("click", closeImageModal);
imageModal?.addEventListener("click", (event) => {
  if (event.target.classList.contains("image-modal")) closeImageModal();
});

document.querySelector(".pdf-modal__close")?.addEventListener("click", closePdfModal);
pdfModal?.addEventListener("click", (event) => {
  if (event.target.classList.contains("pdf-modal")) closePdfModal();
});

document.querySelector(".construction-modal__close")?.addEventListener("click", closeConstructionModal);
constructionModal?.addEventListener("click", (event) => {
  if (event.target.classList.contains("construction-modal")) closeConstructionModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideoModal();
    closeImageModal();
    closePdfModal();
    closeConstructionModal();
    closeSiteMapModal();
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.16 });

document.querySelectorAll(".section, .feature-window").forEach((item) => {
  item.classList.add("reveal-item");
  revealObserver.observe(item);
});
const labCards = document.querySelectorAll(".zyron-lab-card[data-lab-panel]");
const labDetails = document.querySelectorAll("[data-lab-detail]");
const labHub = document.querySelector("#zyron-lab-hub");
const labStage = document.querySelector("#lab-panel-stage");

const openLabPanel = (panelId, shouldScroll = true) => {
  if (!panelId) return;
  labCards.forEach((card) => card.classList.toggle("is-active", card.dataset.labPanel === panelId));
  labDetails.forEach((detail) => detail.classList.toggle("is-active", detail.id === panelId));
  if (shouldScroll && labStage) labStage.scrollIntoView({ behavior: "smooth", block: "start" });
};

labCards.forEach((card) => {
  card.addEventListener("click", () => openLabPanel(card.dataset.labPanel));
});

document.querySelectorAll("[data-lab-map-panel]").forEach((link) => {
  if (link.closest(".site-map-modal")) return;
  link.addEventListener("click", () => {
    setTimeout(() => openLabPanel(link.dataset.labMapPanel, true), 80);
  });
});

document.querySelectorAll(".lab-back-button").forEach((button) => {
  button.addEventListener("click", () => {
    labHub?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


const aiLabToolData = {
  "tool-chatgpt": { id: "chatgpt", company: "OpenAI", year: "2022", country: "Estados Unidos", type: "Asistente conversacional", model: "Freemium / Pago", license: "Propietaria", cloud: "Cloud", api: "Sí", mcp: "Compatible por integraciones", url: "https://chatgpt.com/", docs: "https://platform.openai.com/docs", rating: "★★★★★", recommendation: "Muy recomendable", learning: "15 minutos a 1 semana", ecosystem: ["NotebookLM", "Perplexity", "Google Drive", "Notion", "GitHub", "Mermaid", "n8n"], extensions: ["AIPRM", "Merlin", "Sider", "WebChatGPT", "Glasp", "Compose AI"], related: ["Claude", "Gemini", "Perplexity", "NotebookLM"], compare: ["Claude", "Gemini", "DeepSeek", "Grok"] },
  "tool-claude": { id: "claude", company: "Anthropic", year: "2023", country: "Estados Unidos", type: "Asistente conversacional", model: "Freemium / Pago", license: "Propietaria", cloud: "Cloud", api: "Sí", mcp: "Sí", url: "https://claude.ai/", docs: "https://docs.anthropic.com/", rating: "★★★★★", recommendation: "Muy recomendable", learning: "15 minutos a 1 semana", ecosystem: ["ChatGPT", "Perplexity", "NotebookLM", "GitHub", "MCP"], extensions: ["Claude Integrations", "MCP compatibles", "Conectores soportados"], related: ["ChatGPT", "Gemini", "DeepSeek", "Kimi"], compare: ["ChatGPT", "Gemini", "DeepSeek", "Grok"] },
  "tool-gemini": { id: "gemini", company: "Google", year: "2023", country: "Estados Unidos", type: "Asistente multimodal", model: "Freemium / Pago", license: "Propietaria", cloud: "Cloud", api: "Sí", mcp: "Por integraciones", url: "https://gemini.google.com/", docs: "https://ai.google.dev/", rating: "★★★★☆", recommendation: "Muy recomendable", learning: "15 minutos a 2 horas", ecosystem: ["NotebookLM", "Google Drive", "Gmail", "Docs", "Sheets", "Google AI Studio"], extensions: ["Google Workspace", "Google Drive", "Gmail", "Docs", "Sheets"], related: ["ChatGPT", "Claude", "NotebookLM", "Google AI Studio"], compare: ["ChatGPT", "Claude", "DeepSeek"] },
  "tool-lm-studio": { id: "lmstudio", company: "LM Studio", year: "2023", country: "Por verificar", type: "Modelos locales", model: "Gratuito", license: "Propietaria", cloud: "Local", api: "Servidor local", mcp: "Por integraciones", url: "https://lmstudio.ai/", docs: "https://lmstudio.ai/docs", rating: "★★★★★", recommendation: "Excelente", learning: "2 horas a 1 semana", ecosystem: ["Hugging Face", "Ollama", "GGUF", "DeepSeek", "Qwen", "ComfyUI"], extensions: ["Hugging Face", "Ollama", "GGUF"], related: ["Ollama", "Hugging Face", "DeepSeek", "Qwen"], compare: ["Ollama", "Hugging Face", "Google AI Studio"] },
  "tool-ostris-ai": { id: "ostris", company: "Ostris", year: "Por verificar", country: "Por verificar", type: "Entrenamiento LoRA", model: "Variable", license: "Por verificar", cloud: "Cloud / Local", api: "Por verificar", mcp: "No validado", url: "https://ostris.com/", rating: "★★★★★", recommendation: "Uso profesional", learning: "1 semana a 1 mes", ecosystem: ["Datasets", "Captions", "FluxGym", "Kohya", "CivitAI", "LM Studio"], extensions: ["Datasets", "Captions", "CivitAI"], related: ["FluxGym", "Kohya", "CivitAI"], compare: ["FluxGym", "Kohya"] },
  "tool-notebooklm": { id: "notebooklm", company: "Google", type: "Investigación documental", model: "Freemium", cloud: "Cloud", url: "https://notebooklm.google/", rating: "★★★★★", recommendation: "Muy recomendable", learning: "15 minutos a 2 horas", ecosystem: ["Gemini", "Google Drive", "Google Docs", "Perplexity", "Consensus"], extensions: ["Google Drive", "Google Docs", "PDF", "YouTube", "Audio"], related: ["Gemini", "Perplexity", "Consensus"], compare: ["Perplexity", "Consensus"] },
  "tool-cursor": { id: "cursor", company: "Anysphere", type: "Desarrollo IA", model: "Freemium / Pago", cloud: "Local + Cloud", api: "No aplica", mcp: "Sí", url: "https://www.cursor.com/", rating: "★★★★★", recommendation: "Uso profesional", learning: "2 horas a 1 semana", ecosystem: ["GitHub", "Claude", "ChatGPT", "MCP", "VS Code"], extensions: ["GitHub", "VS Code", "MCP"], related: ["Windsurf", "GitHub", "Google AI Studio"], compare: ["Windsurf", "GitHub Copilot"] },
  "tool-n8n": { id: "n8n", company: "n8n", type: "Automatización", model: "Freemium / Pago", cloud: "Cloud / Local", api: "Sí", url: "https://n8n.io/", rating: "★★★★★", recommendation: "Uso profesional", learning: "2 horas a 1 semana", ecosystem: ["ChatGPT", "Google Drive", "Slack", "GitHub", "Zapier", "Webhook"], extensions: ["Nodos IA", "Webhooks", "APIs"], related: ["Opal", "Dify", "Flowise"], compare: ["Zapier", "Make", "Dify"] },
  "tool-perplexity": { id: "perplexity", company: "Perplexity AI", type: "Investigación web", model: "Freemium / Pago", cloud: "Cloud", url: "https://www.perplexity.ai/", rating: "★★★★☆", recommendation: "Muy recomendable", learning: "15 minutos", ecosystem: ["NotebookLM", "Consensus", "ChatGPT"], related: ["NotebookLM", "Consensus"], compare: ["ChatGPT", "Gemini"] },
  "tool-github": { id: "github", company: "GitHub", type: "Desarrollo y repositorios", model: "Freemium / Pago", cloud: "Cloud", api: "Sí", url: "https://github.com/", rating: "★★★★★", recommendation: "Uso profesional", learning: "2 horas a 1 semana", ecosystem: ["Cursor", "Windsurf", "ChatGPT", "Claude"], related: ["Cursor", "Windsurf"], compare: ["GitLab", "Bitbucket"] },
  "tool-mammouth-ai": { id: "mammouthai", company: "Mammouth AI", year: "Por verificar", country: "Por verificar", type: "Asistente IA", model: "Por clasificar", license: "Por verificar", cloud: "Cloud", api: "Por verificar", mcp: "Por verificar", url: "https://mammouth.ai/", docs: "https://mammouth.ai/", rating: "?????", recommendation: "En evaluacion", learning: "15 minutos a 2 horas", ecosystem: ["ChatGPT", "Claude", "Gemini", "Perplexity"], extensions: [], related: ["ChatGPT", "Claude", "Gemini", "Perplexity"], compare: ["ChatGPT", "Claude", "Gemini", "Grok"] },
  "tool-artificial-analysis": { id: "artificialanalysis", company: "Artificial Analysis", type: "Benchmark", model: "Web", cloud: "Cloud", url: "https://artificialanalysis.ai/", rating: "★★★★☆", recommendation: "Muy recomendable", learning: "15 minutos", ecosystem: ["LM Arena", "ChatGPT", "Claude", "Gemini"], related: ["LM Arena"], compare: ["LM Arena"] }
};

const aiLabOfficialUrls = { "tool-grok":"https://x.ai/grok", "tool-qwen":"https://chat.qwen.ai/", "tool-deepseek":"https://www.deepseek.com/", "tool-kimi":"https://www.kimi.com/", "tool-meta-ai":"https://www.meta.ai/", "tool-z-ai":"https://chat.z.ai/", "tool-mammouth-ai":"https://mammouth.ai/", "tool-ollama":"https://ollama.com/", "tool-hugging-face":"https://huggingface.co/", "tool-fluxgym":"https://github.com/cocktailpeanut/fluxgym", "tool-kohya":"https://github.com/bmaltais/kohya_ss", "tool-civitai":"https://civitai.com/", "tool-opal":"https://opal.withgoogle.com/", "tool-manus":"https://manus.im/", "tool-flowise":"https://flowiseai.com/", "tool-dify":"https://dify.ai/", "tool-ideogram":"https://ideogram.ai/", "tool-leonardo-ai":"https://leonardo.ai/", "tool-recraft":"https://www.recraft.ai/", "tool-kling":"https://klingai.com/", "tool-flow":"https://labs.google/fx/tools/flow", "tool-runway":"https://runwayml.com/", "tool-consensus":"https://consensus.app/", "tool-windsurf":"https://windsurf.com/", "tool-google-ai-studio":"https://aistudio.google.com/", "tool-lm-arena":"https://lmarena.ai/" };
const aiLabLogoDomains = {
  "ChatGPT":"chatgpt.com", "OpenAI":"openai.com", "Claude":"claude.ai", "Anthropic":"anthropic.com", "Gemini":"gemini.google.com", "Google":"google.com", "Grok":"x.ai", "Qwen":"chat.qwen.ai", "DeepSeek":"deepseek.com", "Kimi":"kimi.com", "Meta AI":"meta.ai", "Z.ai":"chat.z.ai", "Mammouth AI":"mammouth.ai", "Mammouth":"mammouth.ai",
  "LM Studio":"lmstudio.ai", "Ollama":"ollama.com", "Hugging Face":"huggingface.co", "Ostris AI":"ostris.com", "Ostris":"ostris.com", "FluxGym":"github.com", "Kohya":"github.com", "CivitAI":"civitai.com",
  "Opal":"opal.withgoogle.com", "Manus":"manus.im", "n8n":"n8n.io", "Flowise":"flowiseai.com", "Dify":"dify.ai", "Ideogram":"ideogram.ai", "Leonardo AI":"leonardo.ai", "Recraft":"recraft.ai", "Kling":"klingai.com", "Flow":"labs.google", "Runway":"runwayml.com",
  "NotebookLM":"notebooklm.google", "Perplexity":"perplexity.ai", "Consensus":"consensus.app", "GitHub":"github.com", "Cursor":"cursor.com", "Windsurf":"windsurf.com", "Google AI Studio":"aistudio.google.com", "Artificial Analysis":"artificialanalysis.ai", "LM Arena":"lmarena.ai",
  "Google Drive":"drive.google.com", "Google Docs":"docs.google.com", "Gmail":"gmail.com", "Docs":"docs.google.com", "Sheets":"sheets.google.com", "Notion":"notion.so", "Mermaid":"mermaid.js.org", "Slack":"slack.com", "Zapier":"zapier.com", "MCP":"modelcontextprotocol.io", "VS Code":"code.visualstudio.com", "GGUF":"huggingface.co", "APIs":"rapidapi.com", "API":"rapidapi.com", "Webhooks":"webhook.site", "PDF":"adobe.com", "YouTube":"youtube.com", "Audio":"youtube.com", "AIPRM":"aiprm.com", "Merlin":"getmerlin.in", "Sider":"sider.ai", "WebChatGPT":"chromewebstore.google.com", "Glasp":"glasp.co", "Compose AI":"compose.ai", "Claude Integrations":"claude.ai", "MCP compatibles":"modelcontextprotocol.io", "Conectores soportados":"modelcontextprotocol.io", "Google Workspace":"workspace.google.com", "Nodos IA":"n8n.io", "OpenAI compatible API":"openai.com", "Vector DB":"pinecone.io", "LangChain":"langchain.com", "RAG":"dify.ai", "Agentes":"dify.ai", "Veo":"deepmind.google", "Google Scholar":"scholar.google.com", "GitLab":"gitlab.com", "Bitbucket":"bitbucket.org", "GitHub Copilot":"github.com", "Make":"make.com", "Webhook":"webhook.site", "Datasets":"huggingface.co", "Captions":"huggingface.co", "ComfyUI":"github.com"
};
const aiLabLogoUrl = (value) => {
  const clean = String(value || "").replace(/^.*?:\s*/, "").trim();
  const domain = aiLabLogoDomains[clean];
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : "";
};
const aiLabLogoStyle = (value) => {
  const url = aiLabLogoUrl(value);
  return url ? ` style="--logo-url:url('${url}')"` : "";
};
const categoryDefaults = { "Asistentes IA": { ecosystem:["NotebookLM","Perplexity","Google Drive","n8n"], use:["necesites escribir, investigar o razonar","quieras apoyo conversacional"], avoid:["necesites entrenar LoRAs","requieras inferencia local avanzada"] }, "Modelos Locales": { ecosystem:["LM Studio","Ollama","Hugging Face","GGUF"], use:["necesites privacidad o control local","quieras probar modelos en tu equipo"], avoid:["no tienes hardware suficiente","buscas una solución sin configuración"] }, "Entrenamiento LoRA": { ecosystem:["Datasets","Captions","CivitAI","FluxGym","Kohya"], use:["necesites entrenar identidad o estilo","tienes dataset preparado"], avoid:["solo necesitas conversar con IA","no tienes imágenes/captions listos"] }, "Automatización": { ecosystem:["ChatGPT","APIs","Google Drive","Webhooks"], use:["quieras automatizar procesos","necesites conectar herramientas"], avoid:["solo necesitas una tarea manual simple"] }, "Imagen": { ecosystem:["Ideogram","Leonardo AI","Recraft"], use:["necesites crear imágenes o piezas visuales"], avoid:["necesites video o LoRA avanzada"] }, "Video": { ecosystem:["Kling","Runway","Flow"], use:["quieras generar o prototipar video IA"], avoid:["solo necesitas texto o investigación"] }, "Investigación": { ecosystem:["NotebookLM","Perplexity","Consensus","Google Drive"], use:["necesites investigar fuentes","quieras resumir documentos"], avoid:["necesites automatización productiva"] }, "Desarrollo IA": { ecosystem:["GitHub","Cursor","Windsurf","MCP"], use:["quieras programar o prototipar con IA"], avoid:["no trabajas con código"] }, "Benchmark": { ecosystem:["Artificial Analysis","LM Arena"], use:["quieras comparar modelos"], avoid:["necesitas producir contenido directamente"] } };
const professionsDefault = ["Médicos", "Docentes", "Abogados", "Programadores", "Diseñadores", "Analistas", "Empresas", "Investigadores"];
const tutorialsDefault = ["Primeros pasos", "Nivel básico", "Nivel intermedio", "Nivel avanzado", "Casos reales", "Videos"];
const toolButtons = document.querySelectorAll("[data-tool-profile]");
const getLogoText = (value) => String(value || "AI").split(/\s+/).filter(Boolean).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
toolButtons.forEach((button) => { const label = button.textContent.trim(); button.dataset.toolLogo = getLogoText(label); const url = aiLabLogoUrl(label); if (url) { button.style.setProperty("--tool-logo-url", `url("${url}")`); button.classList.add("has-logo-image"); } });
const toolKnowledgeProfile = document.querySelector("#tool-knowledge-center");
let lastToolTrigger = null;
const getTool = (profileId, button) => { const name = button?.textContent.trim() || "Herramienta IA"; const category = button?.closest(".lab-tool-category")?.querySelector("h5")?.textContent.trim() || "Categoría pendiente"; const base = aiLabToolData[profileId] || {}; const defaults = categoryDefaults[category] || {}; const id = base.id || profileId.replace(/^tool-/, ""); return { id, name: base.name || name, category, logo: base.logo || name.split(/\s+/).map(w=>w[0]).join("").slice(0,2).toUpperCase(), logoImage: base.logoImage || aiLabLogoUrl(base.name || name), logoStatus: base.logoStatus || "Logo por dominio oficial / favicon verificable", company: base.company || "Por documentar", year: base.year || "Por documentar", country: base.country || "Por documentar", type: base.type || category, model: base.model || "Por clasificar", license: base.license || "Por documentar", cloud: base.cloud || "Por clasificar", api: base.api || "Por verificar", mcp: base.mcp || "Por verificar", platforms: base.platforms || ["Web"], url: base.url || aiLabOfficialUrls[profileId] || "#", docs: base.docs || "#", rating: base.rating || "★★★☆☆", recommendation: base.recommendation || "En evaluación", learning: base.learning || "Por definir", ecosystem: base.ecosystem || defaults.ecosystem || [], extensions: base.extensions || [], related: base.related || [], compare: base.compare || [], use: base.use || defaults.use || ["necesites evaluar esta herramienta"], avoid: base.avoid || defaults.avoid || ["la capacidad no esté validada por ZYRON"] }; };
const setHtml = (sel, html) => { const el = toolKnowledgeProfile?.querySelector(sel); if (el) el.innerHTML = html; };
const pillLogo = (value) => getLogoText(String(value).split(":").pop().trim());
const itemUrl = (value) => { const key = String(value || "").split(":").pop().trim(); const domain = aiLabLogoDomains[key]; return domain ? `https://${domain}` : ""; };
const pillNode = (value, linked = true) => { const text = String(value); const url = linked ? itemUrl(text) : ""; const inner = `<i${aiLabLogoStyle(text)}>${escapeHtml(pillLogo(text))}</i><b>${escapeHtml(text)}</b>`; return url ? `<a class="knowledge-pill-link" href="${escapeHtml(url)}" target="_blank" rel="noopener">${inner}</a>` : `<span>${inner}</span>`; };
const pills = (items, linked = true) => (items?.length ? items : ["Pendiente de documentacion ZYRON"]).map((x) => pillNode(x, linked)).join("");
const links = (tool) => [{label:"Pagina oficial",url:tool.url},{label:"Documentacion",url:tool.docs},{label:"API / Recursos",url:tool.url}].map(l=>`<a class="${!l.url||l.url==="#"?"is-disabled":""}" href="${!l.url||l.url==="#"?"#":escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`).join("");
const mini = (items) => (items?.length ? items : ["Extensiones por validar"]).map((x) => { const url = itemUrl(x); return `<article><div class="knowledge-mini-head"><i${aiLabLogoStyle(x)}>${escapeHtml(getLogoText(x))}</i><b>${escapeHtml(String(x))}</b></div><p>Extension recomendada para ampliar el flujo de trabajo. Validacion ZYRON pendiente.</p><a class="${url ? "" : "is-disabled"}" href="${url ? escapeHtml(url) : "#"}" target="_blank" rel="noopener">${url ? "Pagina oficial" : "Enlace pendiente"}</a></article>`; }).join("");
const list = (items, mark) => (items||[]).map(x=>`<li><span>${mark}</span>${escapeHtml(String(x))}</li>`).join("");
const openToolProfile = (profileId) => { if(!profileId||!toolKnowledgeProfile)return; const btn=document.querySelector(`[data-tool-profile="${profileId}"]`); const t=getTool(profileId,btn); lastToolTrigger=btn||lastToolTrigger; const logoBox = toolKnowledgeProfile.querySelector("[data-k-logo]"); logoBox.textContent=t.logo; if (t.logoImage) { logoBox.style.setProperty("--logo-url", `url("${t.logoImage}")`); logoBox.classList.add("has-logo-image"); } else { logoBox.classList.remove("has-logo-image"); } toolKnowledgeProfile.querySelector("[data-k-kicker]").textContent=`${t.category} / Centro de Conocimiento`; toolKnowledgeProfile.querySelector("[data-k-title]").textContent=t.name; toolKnowledgeProfile.querySelector("[data-k-summary]").textContent=`ID unico: ${t.id}. Centro preparado para documentacion tecnica, comparativas, tutoriales y recomendacion ZYRON.`; toolKnowledgeProfile.querySelector("[data-k-logo-status]").textContent=t.logoStatus; const open=toolKnowledgeProfile.querySelector("[data-k-open]"); open.textContent=`Abrir ${t.name}`; open.dataset.logo=t.logo; open.target="_blank"; open.rel="noopener"; if (t.logoImage) open.style.setProperty("--logo-url", `url("${t.logoImage}")`); open.href=t.url; open.classList.toggle("is-disabled",!t.url||t.url==="#"); setHtml("[data-k-recommendation]",`<strong>Recomendacion ZYRON</strong><b>${escapeHtml(t.rating)}</b><span>${escapeHtml(t.recommendation)}</span><small>${escapeHtml(t.learning)}</small>`); setHtml("[data-k-identity]",pills([`Empresa: ${t.company}`,`Ano: ${t.year}`,`Pais: ${t.country}`,`Tipo de IA: ${t.type}`,`Categoria: ${t.category}`,`Modelo: ${t.model}`,`Licencia: ${t.license}`,`Cloud/Local: ${t.cloud}`,`API: ${t.api}`,`MCP: ${t.mcp}`,`ID: ${t.id}`], false)); setHtml("[data-k-verification]",pills(["Verificado por ZYRON: En evaluacion","Ultima revision: 2026-07-05","Responsable: ZYRON AI LAB","Version: En revision"], false)); setHtml("[data-k-platforms]",pills(t.platforms, false)); setHtml("[data-k-resources]",links(t)); setHtml("[data-k-extensions]",mini(t.extensions)); const extensionStrip = toolKnowledgeProfile.querySelector("[data-k-extension-strip]"); if (extensionStrip) extensionStrip.innerHTML = `<strong>Criterio de extensiones</strong><span><b>Destacadas:</b> accesos prioritarios del flujo. <b>Recomendadas:</b> fichas con logo, contexto y enlace oficial cuando existe.</span>`; setHtml("[data-k-integrations]",pills(t.ecosystem)); setHtml("[data-k-ecosystem]",pills(t.ecosystem)); setHtml("[data-k-professions]",pills(professionsDefault, false)); setHtml("[data-k-use]",list(t.use,"OK")); setHtml("[data-k-avoid]",list(t.avoid,"NO")); setHtml("[data-k-related]",pills(t.related)); setHtml("[data-k-compare]",pills(t.compare)); setHtml("[data-k-tutorials]",pills(tutorialsDefault, false)); toolButtons.forEach(b=>b.classList.toggle("is-active",b.dataset.toolProfile===profileId)); toolKnowledgeProfile.classList.add("is-active"); toolKnowledgeProfile.scrollIntoView({behavior:"smooth",block:"nearest"}); };
toolButtons.forEach((button)=>button.addEventListener("click",()=>openToolProfile(button.dataset.toolProfile)));
toolButtons.forEach((button)=>button.addEventListener("click",()=>{ const chatgptCase=toolKnowledgeProfile?.querySelector("[data-k-chatgpt-case]"); if(chatgptCase) chatgptCase.hidden=button.dataset.toolProfile!=="tool-chatgpt"; }));
if (toolButtons.length && toolKnowledgeProfile) openToolProfile("tool-chatgpt");
document.querySelectorAll(".tool-back-button").forEach((button)=>button.addEventListener("click",()=>{ if(lastToolTrigger){ lastToolTrigger.scrollIntoView({behavior:"smooth",block:"center"}); lastToolTrigger.focus({preventScroll:true}); } else { document.querySelector(".lab-tool-categories")?.scrollIntoView({behavior:"smooth",block:"start"}); } }));
const officialLibraryItems = [
  {id:"openai",name:"OpenAI",cat:"Modelos y Prompt Engineering",desc:"Documentación oficial para modelos, APIs, prompting, agentes y desarrollo con OpenAI.",url:"https://platform.openai.com/docs",date:"2026-07-06",status:"En revisión"},
  {id:"gemini",name:"Google Gemini",cat:"Modelos y Prompt Engineering",desc:"Guías oficiales de Gemini API, Google AI Studio, prompting y capacidades multimodales.",url:"https://ai.google.dev/gemini-api/docs",date:"2026-07-06",status:"En revisión"},
  {id:"claude",name:"Anthropic Claude",cat:"Modelos y Prompt Engineering",desc:"Documentación oficial de Claude, prompt engineering, herramientas, API y buenas prácticas.",url:"https://docs.anthropic.com/",date:"2026-07-06",status:"En revisión"},
  {id:"midjourney",name:"Midjourney",cat:"Imagen IA",desc:"Documentación y guías oficiales para generación visual con Midjourney.",url:"https://docs.midjourney.com/",date:"2026-07-06",status:"Pendiente"},
  {id:"flux",name:"FLUX",cat:"Imagen IA",desc:"Documentación y recursos oficiales del ecosistema FLUX para generación de imágenes.",url:"https://blackforestlabs.ai/",date:"2026-07-06",status:"Pendiente"},
  {id:"stability",name:"Stability AI",cat:"Imagen IA",desc:"Documentación oficial de Stability AI para modelos generativos de imagen y APIs.",url:"https://platform.stability.ai/docs",date:"2026-07-06",status:"Pendiente"},
  {id:"qwen",name:"Qwen",cat:"Modelos y Prompt Engineering",desc:"Documentación y modelos oficiales Qwen para lenguaje, visión y razonamiento.",url:"https://qwen.readthedocs.io/",date:"2026-07-06",status:"Pendiente"},
  {id:"seedance",name:"Seedance",cat:"Video IA",desc:"Espacio preparado para documentación oficial de generación de video Seedance.",url:"https://www.volcengine.com/",date:"2026-07-06",status:"Pendiente"},
  {id:"kling",name:"Kling",cat:"Video IA",desc:"Documentación y recursos oficiales para video generativo Kling AI.",url:"https://klingai.com/",date:"2026-07-06",status:"Pendiente"},
  {id:"vidu",name:"Vidu",cat:"Video IA",desc:"Documentación y recursos oficiales de Vidu para video generativo.",url:"https://www.vidu.com/",date:"2026-07-06",status:"Pendiente"},
  {id:"skyreels",name:"SkyReels",cat:"Video IA",desc:"Espacio preparado para documentación oficial de SkyReels y modelos de video.",url:"https://github.com/SkyworkAI/SkyReels-V1",date:"2026-07-06",status:"Pendiente"},
  {id:"runway",name:"Runway",cat:"Video IA",desc:"Guías oficiales de Runway para generación, edición y flujos de video IA.",url:"https://runwayml.com/",date:"2026-07-06",status:"Pendiente"},
  {id:"pika",name:"Pika",cat:"Video IA",desc:"Recursos oficiales de Pika para generación de video con IA.",url:"https://pika.art/",date:"2026-07-06",status:"Pendiente"},
  {id:"luma",name:"Luma",cat:"Video IA",desc:"Documentación y recursos oficiales de Luma para video, 3D y modelos multimodales.",url:"https://lumalabs.ai/",date:"2026-07-06",status:"Pendiente"},
  {id:"wan",name:"Wan Video",cat:"Video IA",desc:"Espacio documental para modelos Wan Video y generación audiovisual.",url:"https://github.com/Wan-Video/Wan2.1",date:"2026-07-06",status:"Pendiente"},
  {id:"comfyui",name:"ComfyUI",cat:"Workflows IA",desc:"Documentación y repositorio oficial para flujos nodales de generación y automatización IA.",url:"https://github.com/comfyanonymous/ComfyUI",date:"2026-07-06",status:"En revisión"},
  {id:"huggingface",name:"Hugging Face",cat:"Modelos y Datasets",desc:"Documentación oficial para modelos, datasets, Spaces, Transformers y Hub.",url:"https://huggingface.co/docs",date:"2026-07-06",status:"En revisión"},
  {id:"civitai",name:"CivitAI",cat:"LoRAs y Modelos Visuales",desc:"Recursos oficiales para modelos visuales, LoRAs, publicación y comunidad.",url:"https://civitai.com/",date:"2026-07-06",status:"Pendiente"},
  {id:"langchain",name:"LangChain",cat:"Agentes Inteligentes",desc:"Documentación oficial para aplicaciones LLM, chains, RAG, herramientas y agentes.",url:"https://docs.langchain.com/",date:"2026-07-06",status:"En revisión"},
  {id:"langgraph",name:"LangGraph",cat:"Agentes Inteligentes",desc:"Documentación oficial para agentes con estado, grafos y flujos complejos.",url:"https://langchain-ai.github.io/langgraph/",date:"2026-07-06",status:"En revisión"},
  {id:"mcp",name:"MCP",cat:"Agentes Inteligentes",desc:"Documentación oficial del Model Context Protocol para conectar modelos con herramientas y datos.",url:"https://modelcontextprotocol.io/docs",date:"2026-07-06",status:"En revisión"},
  {id:"n8n",name:"n8n",cat:"Automatización",desc:"Documentación oficial para automatización, integraciones, APIs, agentes y flujos.",url:"https://docs.n8n.io/",date:"2026-07-06",status:"En revisión"},
  {id:"make",name:"Make",cat:"Automatización",desc:"Documentación oficial para automatización visual, escenarios e integraciones.",url:"https://www.make.com/en/help",date:"2026-07-06",status:"Pendiente"},
  {id:"ostris",name:"Ostris AI Toolkit",cat:"LoRAs y Entrenamiento",desc:"Espacio preparado para documentación de entrenamiento LoRA, datasets, captions y publicación.",url:"https://ostris.com/",date:"2026-07-06",status:"Pendiente"},
  {id:"kohya",name:"Kohya SS",cat:"LoRAs y Entrenamiento",desc:"Repositorio y documentación comunitaria para entrenamiento LoRA avanzado.",url:"https://github.com/bmaltais/kohya_ss",date:"2026-07-06",status:"Pendiente"},
  {id:"onetrainer",name:"OneTrainer",cat:"LoRAs y Entrenamiento",desc:"Repositorio y documentación para entrenamiento de modelos personalizados.",url:"https://github.com/Nerogar/OneTrainer",date:"2026-07-06",status:"Pendiente"},
  {id:"diffusers",name:"Diffusers",cat:"Frameworks IA",desc:"Documentación oficial de Hugging Face Diffusers para modelos generativos.",url:"https://huggingface.co/docs/diffusers",date:"2026-07-06",status:"En revisión"},
  {id:"peft",name:"PEFT",cat:"Frameworks IA",desc:"Documentación oficial para fine-tuning eficiente con parámetros reducidos.",url:"https://huggingface.co/docs/peft",date:"2026-07-06",status:"En revisión"},
  {id:"accelerate",name:"Accelerate",cat:"Frameworks IA",desc:"Documentación oficial para entrenamiento distribuido y optimización con Hugging Face.",url:"https://huggingface.co/docs/accelerate",date:"2026-07-06",status:"En revisión"},
  {id:"pwc",name:"Papers With Code",cat:"Investigación IA",desc:"Repositorio de papers, benchmarks, datasets y código asociado.",url:"https://paperswithcode.com/",date:"2026-07-06",status:"Pendiente"},
  {id:"arxiv",name:"arXiv",cat:"Investigación IA",desc:"Repositorio científico para papers de IA, aprendizaje automático y computación.",url:"https://arxiv.org/",date:"2026-07-06",status:"Pendiente"},
  {id:"googleresearch",name:"Google Research",cat:"Investigación IA",desc:"Investigación oficial de Google en IA, aprendizaje automático y sistemas.",url:"https://research.google/",date:"2026-07-06",status:"Pendiente"},
  {id:"openaires",name:"OpenAI Research",cat:"Investigación IA",desc:"Publicaciones e investigación oficial de OpenAI.",url:"https://openai.com/research/",date:"2026-07-06",status:"Pendiente"},
  {id:"anthropicres",name:"Anthropic Research",cat:"Investigación IA",desc:"Investigación oficial de Anthropic sobre modelos, seguridad y alineación.",url:"https://www.anthropic.com/research",date:"2026-07-06",status:"Pendiente"}
];
const libraryGrid = document.querySelector("#official-library-grid");
const libraryFilters = document.querySelector("[data-library-filters]");
const librarySearch = document.querySelector("[data-library-search]");
const libraryCount = document.querySelector("[data-library-count]");
let activeLibraryCategory = "Todos";
const libraryCategories = ["Todos", ...new Set(officialLibraryItems.map((item) => item.cat))];
const getLibraryStatusClass = (status) => status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
const renderLibraryFilters = () => {
  if (!libraryFilters) return;
  libraryFilters.innerHTML = libraryCategories.map((cat) => `<button type="button" class="${cat === activeLibraryCategory ? "is-active" : ""}" data-library-category="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`).join("");
  libraryFilters.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => { activeLibraryCategory = button.dataset.libraryCategory; renderOfficialLibrary(); }));
};
const renderOfficialLibrary = () => {
  if (!libraryGrid) return;
  const query = (librarySearch?.value || "").trim().toLowerCase();
  const filtered = officialLibraryItems.filter((item) => (activeLibraryCategory === "Todos" || item.cat === activeLibraryCategory) && [item.name, item.cat, item.desc, item.status].join(" ").toLowerCase().includes(query));
  if (libraryCount) libraryCount.textContent = String(officialLibraryItems.length);
  libraryGrid.innerHTML = filtered.map((item) => `<article class="official-library-card"><div class="library-card-head"><span>${escapeHtml(item.name.slice(0,2).toUpperCase())}</span><div><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.cat)}</small></div></div><p>${escapeHtml(item.desc)}</p><div class="library-meta"><span>${escapeHtml(item.date)}</span><span class="status-${getLibraryStatusClass(item.status)}">${escapeHtml(item.status)}</span></div><div class="library-actions"><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Abrir Documentación</a><button type="button" disabled>Descargar PDF</button><button type="button" disabled>Resumen ZYRON</button><button type="button" disabled>Ejemplos</button><button type="button" disabled>Casos de Uso</button></div></article>`).join("") || `<p class="tool-note">No se encontraron documentos para la búsqueda actual.</p>`;
};
if (libraryGrid) {
  renderLibraryFilters();
  renderOfficialLibrary();
  librarySearch?.addEventListener("input", renderOfficialLibrary);
}
if (window.location.hash && document.querySelector(`[data-lab-detail]${window.location.hash}`)) {
  openLabPanel(window.location.hash.slice(1), false);
}
const aiLabSection = document.querySelector("#zyron-ai-lab");
if (aiLabSection) {
  const aiLabNavObserver = new IntersectionObserver((entries) => {
    const minimumVisibleRatio = window.innerWidth <= 720 ? 0.01 : 0.18;
    const visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > minimumVisibleRatio);
    document.body.classList.toggle("is-reading-ai-lab", visible);
  }, { threshold: [0, .01, .18, .4] });
  aiLabNavObserver.observe(aiLabSection);
}






















