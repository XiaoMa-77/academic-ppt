param([string]$DeckPath, [string]$OutDir)
$ErrorActionPreference = 'Stop'
& (Join-Path $PSScriptRoot '../../skills/lyceum/scripts/render_powerpoint.ps1') -DeckPath $DeckPath -OutDir $OutDir
