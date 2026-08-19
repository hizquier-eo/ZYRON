$ErrorActionPreference = 'Stop'
$root = 'C:\Users\ASUS\Desktop\Empresa Zyron\ZYRON PRIMUS'
$resourceDir = Join-Path $root 'recursos\laboratorio-live'
$evidenceDir = Join-Path $root 'Doc\Evidencia\2026-07-26_LIVE_FASE_1D'
New-Item -ItemType Directory -Force -Path $evidenceDir | Out-Null
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  foreach ($file in Get-ChildItem -LiteralPath $resourceDir -Filter '*.docx') {
    $document = $word.Documents.Open($file.FullName, $false, $true)
    try {
      $target = Join-Path $evidenceDir ($file.BaseName + '-docx-render.pdf')
      $document.ExportAsFixedFormat($target, 17)
      Write-Output $target
    } finally {
      $document.Close(0)
    }
  }
} finally {
  $word.Quit()
}
