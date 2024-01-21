git pull origin master

Invoke-Expression(@(
    'Get-Content', './command.sql', '|',
    '&', "`"$(Resolve-Path '~/exe/sqlite/sqlite3.exe')`"",
    "`"file:$(Resolve-Path '~/AppData/Local/Microsoft/Edge/User Data/Default/Web Data')?immutable=1`""
) -join ' ')

git diff
$confirmation = Read-Host "Do you want to commit? (y/n)"
if ($confirmation -ne 'y') {
  Break
}

git add -A
git status
git commit -m "Updated $([int]$(Get-Date -format 'yyyy') + 543)/$(Get-Date -format 'MM/dd HH:mm')"

$confirmation = Read-Host "Do you want to push? (y/n)"
if ($confirmation -ne 'y') {
  Break
}
git push
