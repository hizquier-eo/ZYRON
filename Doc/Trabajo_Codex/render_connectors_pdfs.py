from pathlib import Path
import pypdfium2 as pdfium

root=Path(r"C:\Users\ASUS\Desktop\Empresa Zyron\ZYRON PRIMUS")
res=root/"recursos"/"laboratorio-conectores"
ev=root/"Doc"/"Evidencia"/"2026-07-28_CONECTORES_FASE_1F"
ev.mkdir(parents=True,exist_ok=True)
for pdf in res.glob("*.pdf"):
    doc=pdfium.PdfDocument(str(pdf))
    for i,page in enumerate(doc):
        image=page.render(scale=1.5).to_pil()
        image.save(ev/f"{pdf.stem}-{i+1}.png")
