param([string]$DeckPath, [string]$OutDir)
$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open((Resolve-Path $DeckPath).Path, $true, $false, $false)
$OutDirAbs = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutDir))
New-Item -ItemType Directory -Force -Path $OutDirAbs | Out-Null
$i = 1
foreach ($slide in $pres.Slides) {
    $f = Join-Path $OutDirAbs ("slide-{0}.png" -f $i)
    $slide.Export($f, 'PNG', 1440, 810)
    $i++
}
$pres.Close()
$app.Quit()
Write-Output ("exported: " + ($i - 1))
