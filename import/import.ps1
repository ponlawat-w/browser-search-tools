$sourcePath = $(Resolve-Path '~/AppData/Local/Microsoft/Edge/User Data/Default/Web Data')
$exePath = $(Resolve-Path '~/exe/sqlite/sqlite3.exe')

$profileName = $(Get-Content ./.cfg.profile.txt)
if (-not $profileName) {
    Write-Error "Invalid Profile Name"
    break
}
$targetPath = $(Resolve-Path "~/AppData/Local/Microsoft/Edge/User Data/$profileName/Web Data")
if (-not $(Test-Path $targetPath)) {
    Write-Error "$profileName Not Exists"
    break
}

Copy-Item $sourcePath ./.temp.source.sqlite

Invoke-Expression(@(
    'Get-Content', './import.sql', '|',
    '&', $exePath, "`"file:$targetPath`""
) -join ' ')

Remove-Item ./.temp.source.sqlite

Write-Output "Done"
