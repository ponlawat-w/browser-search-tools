# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A browser search engine management tool that synchronizes custom search engine configurations between Microsoft Edge's SQLite database and portable formats (CSV, XSearch JSON). The primary TypeScript tool lives in `xsearch/` and is run with Bun.

## Commands

All commands are run from the repo root unless noted.

**Install dependencies** (run inside `xsearch/`):
```sh
bun install
```

**Convert XSearch JSON → CSV:**
```sh
bun ./xsearch from ./search-tools-xsearch.json ./search-tools.csv
```

**Convert CSV → XSearch JSON:**
```sh
bun ./xsearch to ./search-tools.csv ./search-tools-xsearch.json
```

**Sync XSearch JSON → Edge browser SQLite database:**
```sh
bun ./xsearch to-edge ./search-tools-xsearch.json <path-to-Edge-Web-Data>
```

**Shell workflow scripts** (macOS, executable):
- `./xexp` — Export: convert XSearch → CSV, push all Edge profiles, run git sync
- `./ximp` — Import: convert CSV → XSearch, run git sync
- `./sync` — Git diff/add/commit/push

## Architecture

```
search-tools-xsearch.json   ← primary source of truth (XSearch format)
search-tools.csv            ← portable CSV representation
Edge "Web Data" (SQLite)    ← live browser database
```

**`xsearch/` TypeScript tool** (Bun runtime):
- `index.ts` — CLI entry point; dispatches `from`, `to`, or `to-edge` subcommands
- `src/from-xsearch.ts` — XSearch JSON → CSV
- `src/to-xsearch.ts` — CSV → XSearch JSON
- `src/to-edge.ts` — XSearch JSON → Edge's `keywords` table via `bun:sqlite`
- `src/csv.ts` — Column definitions shared by CSV read/write
- `src/types.ts` — `XSearchEngine` and `CSVRecord` TypeScript types

**Data shape differences:**
| Field | XSearch JSON | CSV | Edge SQLite |
|---|---|---|---|
| Search placeholder | `%s` | `{searchTerms}` | `{searchTerms}` |
| Multi-keyword | `shortcuts[]` array | one row per keyword | one row per keyword |

**Windows scripts** (in `import/`): PowerShell + SQL for syncing between Edge profiles on Windows.

## Key Data Files

- `search-tools-xsearch.json` — ~150 search engines in XSearch format
- `search-tools.csv` — flat CSV export of the above
- `command.sql` — exports Edge `keywords` table to CSV for inspection
- `import/import.sql` — merges keywords between Edge profiles (deduplication)

## Notes

- Commit dates follow Thai Buddhist calendar year (e.g., "Updated 2569/03/17" = 2026 CE).
- The `xsearch/` subdirectory is a standalone Bun project; run `bun install` there before use.
