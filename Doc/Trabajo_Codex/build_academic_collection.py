from pathlib import Path
from html import escape

ROOT = Path(r"C:\Users\ASUS\Desktop\Empresa Zyron\ZYRON PRIMUS")
BASE = ROOT / "coleccion-academica-zyron-ai"
(ROOT / "recursos" / "coleccion-academica-zyron-ai").mkdir(parents=True, exist_ok=True)
BASE.mkdir(parents=True, exist_ok=True)

volumes = [
    {
        "roman":"I","slug":"volumen-01","title":"Manual Maestro de Inteligencia Artificial","subtitle":"",
        "desc":"Obra introductoria y estructurada que presenta los fundamentos, conceptos, aplicaciones, oportunidades, riesgos y principios esenciales de la Inteligencia Artificial para usuarios académicos, profesionales y organizacionales.",
        "type":"Manual introductorio","audience":"Estudiantes, docentes, profesionales y organizaciones",
        "topics":["Fundamentos de inteligencia artificial","Conceptos y aplicaciones","Oportunidades y riesgos","Principios esenciales"],
        "file":"volumen-01-manual-maestro-inteligencia-artificial.pdf",
    },
    {
        "roman":"II","slug":"volumen-02","title":"Ingeniería Profesional de Prompts","subtitle":"",
        "desc":"Manual especializado para diseñar, estructurar, evaluar y perfeccionar instrucciones profesionales dirigidas a sistemas de Inteligencia Artificial, aplicables a entornos académicos, empresariales y técnicos.",
        "type":"Manual especializado","audience":"Profesionales, docentes, investigadores y equipos técnicos",
        "topics":["Diseño de instrucciones","Estructuración de prompts","Evaluación y perfeccionamiento","Aplicaciones profesionales"],
        "file":"volumen-02-ingenieria-profesional-prompts.pdf",
    },
    {
        "roman":"III","slug":"volumen-03","title":"Biblioteca Profesional de Prompts ZYRON","subtitle":"",
        "desc":"Colección organizada de prompts profesionales reutilizables para productividad, empresas, planificación, análisis, toma de decisiones, logística, Supply Chain y otras áreas de aplicación.",
        "type":"Biblioteca profesional","audience":"Profesionales, consultores, emprendedores y directivos",
        "topics":["Productividad y planificación","Análisis y toma de decisiones","Empresas y operaciones","Logística y Supply Chain"],
        "file":"volumen-03-biblioteca-profesional-prompts-zyron.pdf",
    },
    {
        "roman":"IV","slug":"volumen-04","title":"Cuaderno del Participante","subtitle":"",
        "desc":"Material práctico de acompañamiento para cursos, diplomados, talleres y programas de formación en Inteligencia Artificial, con ejercicios, actividades, reflexiones y espacios de aplicación.",
        "type":"Cuaderno formativo","audience":"Participantes, estudiantes, docentes y facilitadores",
        "topics":["Ejercicios y actividades","Reflexión guiada","Aplicación práctica","Acompañamiento formativo"],
        "file":"volumen-04-cuaderno-del-participante.pdf",
    },
    {
        "roman":"V","slug":"volumen-05","title":"ZYRON AI LAB: Manual Maestro del Laboratorio de Inteligencia Artificial","subtitle":"Del aprendizaje a la innovación profesional",
        "desc":"Manual institucional para comprender, diseñar y desarrollar un laboratorio de Inteligencia Artificial, incluyendo filosofía, gobernanza, infraestructura, ecosistemas tecnológicos, herramientas y métodos de aprendizaje aplicado.",
        "type":"Manual institucional","audience":"Instituciones, docentes, investigadores, directivos y responsables de innovación",
        "topics":["Filosofía y gobernanza","Infraestructura","Ecosistemas y herramientas","Aprendizaje aplicado"],
        "file":"volumen-05-manual-maestro-zyron-ai-lab.pdf",
    },
    {
        "roman":"VI","slug":"volumen-06","title":"Casos Prácticos Profesionales con Inteligencia Artificial","subtitle":"De la teoría a la transformación organizacional",
        "desc":"Selección compacta de casos profesionales que muestran cómo analizar problemas, identificar oportunidades de automatización y aplicar Inteligencia Artificial en contextos empresariales y organizacionales.",
        "type":"Casos profesionales · edición cerrada y compacta","audience":"Profesionales, consultores, directivos y organizaciones",
        "topics":["Análisis de problemas","Oportunidades de automatización","Aplicación empresarial","Capítulos desarrollados hasta el capítulo 9: Recursos Humanos asistido por Inteligencia Artificial"],
        "file":"volumen-06-casos-practicos-profesionales-ia.pdf",
    },
]

def head(title, description, css="../../css/style.css"):
    return f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)} | ZYRON AI</title><meta name="description" content="{escape(description)}"><link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect width=%2264%22 height=%2264%22 rx=%2212%22 fill=%22%2307152b%22/><text x=%2232%22 y=%2242%22 text-anchor=%22middle%22 font-size=%2230%22 fill=%22%23f0a22e%22>Z</text></svg>"><link rel="stylesheet" href="{css}"></head>'''

TITLE_ACCENTS = {
    "Manual Maestro de Inteligencia Artificial": "Inteligencia Artificial",
    "Ingeniería Profesional de Prompts": "Prompts",
    "Biblioteca Profesional de Prompts ZYRON": "ZYRON",
    "Cuaderno del Participante": "Participante",
    "ZYRON AI LAB: Manual Maestro del Laboratorio de Inteligencia Artificial": "ZYRON AI LAB",
    "Casos Prácticos Profesionales con Inteligencia Artificial": "Inteligencia Artificial",
}

def accent_title(title):
    safe_title = escape(title)
    accent = TITLE_ACCENTS.get(title)
    if not accent:
        return safe_title
    safe_accent = escape(accent)
    return safe_title.replace(safe_accent, f'<span class="title-keyword">{safe_accent}</span>', 1)

def return_script():
    return '''<script>
document.querySelectorAll("[data-return-link]").forEach(function (link) {
  link.addEventListener("click", function (event) {
    var referrer = document.referrer;
    if (history.length > 1 && referrer) {
      try {
        if (new URL(referrer).origin === location.origin) {
          event.preventDefault();
          history.back();
        }
      } catch (error) {}
    }
  });
});
</script>'''

def cover(v, compact=False):
    cls=" collection-cover--compact" if compact else ""
    return f'''<div class="collection-cover{cls}" role="img" aria-label="Cubierta editorial del Volumen {v["roman"]}: {escape(v["title"])}">
      <span>COLECCIÓN ACADÉMICA ZYRON AI</span><b>VOLUMEN {v["roman"]}</b><strong>{escape(v["title"])}</strong>
      {f'<em>{escape(v["subtitle"])}</em>' if v["subtitle"] else ''}<small>Dr. Henry Izquierdo, PhD · ZYRON AI LAB</small></div>'''

def pending_block(v, prefix="../../"):
    return f'''<div class="collection-resource-status" aria-label="Estado del recurso">
      <strong>PDF pendiente de incorporación</strong>
      <span>Formato previsto: PDF</span><span>Nombre definitivo: <code>{v["file"]}</code></span>
      <span>Carpeta prevista: <code>recursos/coleccion-academica-zyron-ai/</code></span>
    </div>'''

cards=[]
for v in volumes:
    cards.append(f'''<article class="collection-card" data-volume="{v["roman"]}">
      {cover(v, True)}
      <div class="collection-card__body"><span>Volumen {v["roman"]} · {escape(v["type"])}</span><h3>{accent_title(v["title"])}</h3>
      {f'<p class="collection-subtitle">{escape(v["subtitle"])}</p>' if v["subtitle"] else ''}
      <p>{escape(v["desc"])}</p><p><b>Audiencia:</b> {escape(v["audience"])}</p>
      <div class="collection-card__actions"><a href="{v["slug"]}/index.html">Consultar volumen</a><span aria-disabled="true">PDF pendiente de incorporación</span></div>
      </div></article>''')

index = head("Colección Académica ZYRON AI","Seis obras de inteligencia artificial aplicada para formación académica y profesional.","../css/style.css") + f'''
<body class="openai-research-page collection-page"><a class="skip-link" href="#contenido-coleccion">Saltar al contenido</a>
<header class="ai-lab-topbar"><a href="../index.html">Inicio</a><span>›</span><a href="../index.html#zyron-ai-lab">ZYRON AI LAB</a><span>›</span><strong>Colección Académica</strong></header>
<main id="contenido-coleccion" class="openai-research-shell">
  <nav class="ai-lab-local-index" aria-label="Índice de la colección"><strong>Índice</strong><a href="#presentacion">Presentación</a><a href="#catalogo">Seis volúmenes</a><a href="#ruta">Ruta de aprendizaje</a><a href="#audiencias">Audiencias</a><a href="#editorial">Autor y editor</a></nav>
  <section id="presentacion" class="collection-hero"><div><span>INTELIGENCIA ARTIFICIAL APLICADA</span><h1>Colección Académica <span class="title-keyword">ZYRON AI</span></h1><p>La Colección Académica ZYRON AI reúne seis obras concebidas para facilitar la comprensión, el aprendizaje y la aplicación profesional de la Inteligencia Artificial. Sus contenidos integran fundamentos, ingeniería de prompts, recursos prácticos, formación, laboratorios y casos de aplicación organizacional.</p><dl><div><dt>Autor</dt><dd>Dr. Henry Izquierdo, PhD</dd></div><div><dt>Editor</dt><dd>ZYRON AI LAB</dd></div><div><dt>Serie</dt><dd>Inteligencia Artificial Aplicada</dd></div><div><dt>Lema</dt><dd>Inteligencia para transformar el futuro</dd></div></dl></div><figure class="collection-hero-visual"><img src="../assets/img/coleccion-academica-zyron-ai/zyron-coleccion-academica.png" alt="ZYRON presenta la Colección Académica ZYRON AI en el laboratorio de inteligencia artificial"></figure></section>
  <section class="openai-research-band"><div class="openai-research-heading"><span>PROPÓSITO</span><h2>CONOCIMIENTO PARA <span class="title-keyword">APRENDER, APLICAR Y TRANSFORMAR</span></h2></div><div class="openai-research-grid"><article><h3>Democratizar</h3><p>Facilitar el acceso comprensible al conocimiento sobre IA.</p></article><article><h3>Conectar teoría y práctica</h3><p>Relacionar fundamentos, herramientas y escenarios profesionales.</p></article><article><h3>Fortalecer capacidades</h3><p>Apoyar formación, reutilización de recursos e innovación organizacional.</p></article></div></section>
  <section id="catalogo" class="openai-research-band"><div class="openai-research-heading"><span>CATÁLOGO EDITORIAL</span><h2>SEIS <span class="title-keyword">VOLÚMENES</span></h2><p>La estructura web está disponible. Los seis PDF permanecen pendientes de incorporación y no se ofrecen enlaces de descarga inexistentes.</p></div><div class="collection-download-location"><strong>Ubicación oficial de los PDF descargables</strong><code>recursos/coleccion-academica-zyron-ai/</code><span>Actualmente la carpeta está preparada, pero no contiene los seis archivos definitivos. Cada tarjeta indica el nombre exacto pendiente.</span></div><div class="collection-grid">{''.join(cards)}</div></section>
  <section id="ruta" class="openai-research-band"><div class="openai-research-heading"><span>RUTA SUGERIDA</span><h2>DEL FUNDAMENTO AL <span class="title-keyword">CASO PROFESIONAL</span></h2></div><ol class="collection-learning-path"><li>Fundamentos</li><li>Ingeniería de Prompts</li><li>Biblioteca de Prompts</li><li>Práctica Formativa</li><li>Laboratorio de IA</li><li>Casos Profesionales</li></ol></section>
  <section id="audiencias" class="openai-research-band"><div class="openai-research-heading"><span>AUDIENCIAS</span><h2>FORMACIÓN PARA PERSONAS Y <span class="title-keyword">ORGANIZACIONES</span></h2></div><ul class="collection-audiences"><li>Estudiantes</li><li>Docentes</li><li>Investigadores</li><li>Profesionales</li><li>Consultores</li><li>Emprendedores</li><li>Directivos</li><li>Instituciones públicas</li><li>Organizaciones privadas</li></ul></section>
  <section id="editorial" class="openai-research-band"><div class="openai-research-heading"><span>FICHA EDITORIAL</span><h2>AUTOR Y <span class="title-keyword">EDITOR</span></h2></div><dl class="collection-editorial"><div><dt>Autor</dt><dd>Dr. Henry Izquierdo, PhD</dd></div><div><dt>Editor</dt><dd>ZYRON AI LAB</dd></div><div><dt>Serie</dt><dd>Inteligencia Artificial Aplicada</dd></div><div><dt>Lema</dt><dd>Inteligencia para transformar el futuro</dd></div></dl><p class="openai-research-note">Los documentos de esta colección tienen fines académicos, formativos y profesionales.</p></section>
  <nav class="lab-progress-actions openai-research-nav" aria-label="Navegación de la colección"><a class="collection-return-link" href="../index.html#zyron-ai-lab" data-return-link>← Volver a la página anterior</a><a href="../index.html">Inicio</a><a href="../index.html#zyron-ai-lab">AI LAB</a><a href="../recursos/libros/index.html">Libros ZYRON</a><a href="../index.html#mapa-sitio">Mapa ZYRON</a></nav>
</main>{return_script()}</body></html>'''
(BASE/"index.html").write_text(index,encoding="utf-8")

for i,v in enumerate(volumes):
    prev = f'../{volumes[i-1]["slug"]}/index.html' if i else '../index.html'
    nxt = f'../{volumes[i+1]["slug"]}/index.html' if i < len(volumes)-1 else '../index.html'
    relation = "Forma parte de una secuencia que avanza desde los fundamentos hasta la aplicación profesional. Puede consultarse de manera independiente o dentro del recorrido completo de seis volúmenes."
    page = head(f'Volumen {v["roman"]}: {v["title"]}',v["desc"]) + f'''
<body class="openai-research-page collection-page collection-volume-page"><a class="skip-link" href="#contenido-volumen">Saltar al contenido</a>
<header class="ai-lab-topbar"><a href="../../index.html">Inicio</a><span>›</span><a href="../index.html">Colección Académica</a><span>›</span><strong>Volumen {v["roman"]}</strong></header>
<main id="contenido-volumen" class="openai-research-shell">
  <nav class="ai-lab-breadcrumb" aria-label="Ruta de navegación"><a href="../../index.html">Inicio</a><span>›</span><a href="../../index.html#zyron-ai-lab">ZYRON AI LAB</a><span>›</span><a href="../index.html">Colección Académica ZYRON AI</a><span>›</span><strong>Volumen {v["roman"]}</strong></nav>
  <section class="collection-volume-hero">{cover(v)}<div><span>VOLUMEN {v["roman"]}</span><h1>{accent_title(v["title"])}</h1>{f'<p class="collection-subtitle">{escape(v["subtitle"])}</p>' if v["subtitle"] else ''}<p>{escape(v["desc"])}</p>{pending_block(v)}</div></section>
  <section class="openai-research-band"><div class="openai-research-heading"><span>OBJETIVO GENERAL</span><h2>APORTE DEL <span class="title-keyword">VOLUMEN</span></h2></div><p>{escape(v["desc"])}</p></section>
  <section class="openai-research-band"><div class="openai-research-heading"><span>CONTENIDO VERIFICABLE</span><h2>PRINCIPALES <span class="title-keyword">TEMAS</span></h2></div><ul>{''.join(f'<li>{escape(x)}</li>' for x in v["topics"])}</ul><p class="openai-research-note">No se publica un índice detallado porque el PDF definitivo todavía no ha sido incorporado al proyecto.</p></section>
  <section class="openai-research-band"><div class="openai-research-grid"><article><h3>Audiencia</h3><p>{escape(v["audience"])}</p></article><article><h3>Tipo de contenido</h3><p>{escape(v["type"])}</p></article><article><h3>Relación con la colección</h3><p>{escape(relation)}</p></article></div></section>
  <nav class="lab-progress-actions openai-research-nav" aria-label="Navegación entre volúmenes"><a class="collection-return-link" href="../index.html" data-return-link>← Volver a la página anterior</a><a href="{prev}">Anterior</a><a href="../index.html">Volver a la colección</a><a href="{nxt}">Siguiente →</a></nav>
</main>{return_script()}</body></html>'''
    dest=BASE/v["slug"];dest.mkdir(parents=True,exist_ok=True);(dest/"index.html").write_text(page,encoding="utf-8")
print("Colección y seis páginas individuales generadas.")
