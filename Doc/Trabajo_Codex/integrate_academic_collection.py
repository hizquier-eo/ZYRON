from pathlib import Path

ROOT=Path(r"C:\Users\ASUS\Desktop\Empresa Zyron\ZYRON PRIMUS")

def replace_once(file,before,after):
    path=ROOT/file
    text=path.read_text(encoding="utf-8")
    if after in text:
        return
    if before not in text:
        raise RuntimeError(f"Marcador no encontrado: {file}")
    path.write_text(text.replace(before,after,1),encoding="utf-8")

home_section='''      <section id="coleccion-academica-zyron-ai" class="section collection-home-entry" aria-label="Colección Académica ZYRON AI">
        <div class="section-heading compact"><p>Producción académica institucional</p><h2>Colección Académica ZYRON AI</h2></div>
        <div class="collection-home-entry__content"><div><p>Seis obras de Inteligencia Artificial Aplicada para fundamentos, prompts, formación, laboratorios y casos profesionales.</p><p><b>Autor:</b> Dr. Henry Izquierdo, PhD · <b>Editor:</b> ZYRON AI LAB</p><a href="coleccion-academica-zyron-ai/index.html">Conocer la colección</a></div><div class="collection-home-entry__volumes" aria-label="Seis volúmenes"><span>I</span><span>II</span><span>III</span><span>IV</span><span>V</span><span>VI</span></div></div>
      </section>

'''
replace_once("index.html",'      <section id="zyron-ai-lab" class="section zyron-lab-panel" aria-label="ZYRON AI LAB">',home_section+'      <section id="zyron-ai-lab" class="section zyron-lab-panel" aria-label="ZYRON AI LAB">')
replace_once("index.html",'<a href="centro-investigacion-openai.html">Centro de Investigación OpenAI</a>','<a href="centro-investigacion-openai.html">Centro de Investigación OpenAI</a>\n              <a href="coleccion-academica-zyron-ai/index.html">Colección Académica ZYRON AI</a>')
replace_once("index.html",'<article><b>05</b><h4>Centro de Ecosistemas Inteligentes</h4>','<article><b>05</b><h4>Colección Académica ZYRON AI</h4><p>Seis volúmenes de Inteligencia Artificial Aplicada para aprendizaje y práctica profesional.</p><p><a href="coleccion-academica-zyron-ai/index.html">Abrir colección</a></p></article>\n          <article><b>06</b><h4>Centro de Ecosistemas Inteligentes</h4>')
replace_once("index.html",'<section><h3>6.1 Ecosistemas Inteligentes</h3>','<section><h3>6.1 Colección Académica ZYRON AI</h3><a href="coleccion-academica-zyron-ai/index.html" data-search-terms="coleccion academica zyron ai libros inteligencia artificial">Colección Académica ZYRON AI</a><a href="coleccion-academica-zyron-ai/volumen-01/index.html">Volumen I</a><a href="coleccion-academica-zyron-ai/volumen-02/index.html">Volumen II</a><a href="coleccion-academica-zyron-ai/volumen-03/index.html">Volumen III</a><a href="coleccion-academica-zyron-ai/volumen-04/index.html">Volumen IV</a><a href="coleccion-academica-zyron-ai/volumen-05/index.html">Volumen V</a><a href="coleccion-academica-zyron-ai/volumen-06/index.html">Volumen VI</a></section>\n      <section><h3>6.2 Ecosistemas Inteligentes</h3>')

library='''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Libros ZYRON | Biblioteca ZYRON</title><meta name="description" content="Acceso institucional a la Colección Académica ZYRON AI."><link rel="stylesheet" href="../../css/style.css"></head><body class="openai-research-page collection-page"><nav class="ai-lab-topbar"><a href="../../index.html">Inicio</a><a href="../../index.html#recursos">Biblioteca ZYRON</a></nav><main class="openai-research-shell"><section class="openai-research-band"><div class="openai-research-heading"><span>Biblioteca ZYRON</span><h1>Libros ZYRON</h1><p>Catálogo institucional de obras revisadas y autorizadas.</p></div><div class="openai-research-objective"><strong>Colección académica incorporada</strong><p>La estructura editorial de seis volúmenes está disponible. Los PDF definitivos permanecen pendientes de incorporación, por lo que no se publican descargas inexistentes.</p><a href="../../coleccion-academica-zyron-ai/index.html">Abrir Colección Académica ZYRON AI</a></div></section></main></body></html>'''
(ROOT/"recursos"/"libros"/"index.html").write_text(library,encoding="utf-8")

replace_once("centro-investigacion-openai.html",'<a href="index.html#recursos">Ir a Recursos</a>','<a href="index.html#recursos">Ir a Recursos</a>\n      <a href="coleccion-academica-zyron-ai/index.html">Colección Académica ZYRON AI</a>')
print("Accesos de Inicio, AI LAB, Biblioteca, Centro OpenAI y Mapa ZYRON integrados.")
