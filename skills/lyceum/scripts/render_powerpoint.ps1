param(
    [Parameter(Mandatory = $true)][string]$DeckPath,
    [Parameter(Mandatory = $true)][string]$OutDir
)

# Native Windows verification. Fail on an unreadable deck or failed export.
$ErrorActionPreference = 'Stop'
$deckAbsolute = (Resolve-Path -LiteralPath $DeckPath).Path
$outputAbsolute = [IO.Path]::GetFullPath($OutDir)
New-Item -ItemType Directory -Force -Path $outputAbsolute | Out-Null
$alreadyRunning = @(Get-Process POWERPNT -ErrorAction SilentlyContinue).Count -gt 0
$application = $null
$presentation = $null
try {
    $application = New-Object -ComObject PowerPoint.Application
    $presentation = $application.Presentations.Open($deckAbsolute, -1, 0, 0)
    $count = $presentation.Slides.Count
    for ($index = 1; $index -le $count; $index++) {
        $target = Join-Path $outputAbsolute ("slide-{0}.png" -f $index)
        $presentation.Slides.Item($index).Export($target, 'PNG', 1440, 810)
        if ((Get-Item -LiteralPath $target).Length -eq 0) {
            throw "PowerPoint exported an empty image: $target"
        }
    }
    Write-Output "PowerPoint opened $count slides and exported $count images."
} finally {
    if ($null -ne $presentation) { $presentation.Close() }
    if ($null -ne $application -and -not $alreadyRunning) { $application.Quit() }
}
