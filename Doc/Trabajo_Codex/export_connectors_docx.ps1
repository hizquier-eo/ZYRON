$ErrorActionPreference='Stop'
$root='C:\Users\ASUS\Desktop\Empresa Zyron\ZYRON PRIMUS'
$res=Join-Path $root 'recursos\laboratorio-conectores'
$ev=Join-Path $root 'Doc\Evidencia\2026-07-28_CONECTORES_FASE_1F'
New-Item -ItemType Directory -Force -Path $ev | Out-Null
$word=New-Object -ComObject Word.Application
$word.Visible=$false
$word.DisplayAlerts=0
try {
 foreach($file in Get-ChildItem -LiteralPath $res -Filter '*.docx'){
  $doc=$word.Documents.Open($file.FullName,$false,$true)
  try{
   $pdf=Join-Path $res ($file.BaseName+'.pdf')
   $doc.ExportAsFixedFormat($pdf,17)
   Copy-Item -LiteralPath $pdf -Destination (Join-Path $ev ($file.BaseName+'-docx-render.pdf')) -Force
  } finally {$doc.Close(0)}
 }
} finally {$word.Quit()}
