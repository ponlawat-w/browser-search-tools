Invoke-Expression(@(
    'Get-Content', './command.sql', '|',
    '&', "`"$(Resolve-Path '~/exe/sqlite/sqlite3.exe')`"",
    "`"file:$(Resolve-Path '~/AppData/Local/Microsoft/Edge/User Data/Default/Web Data')?immutable=1`""
) -join ' ')
