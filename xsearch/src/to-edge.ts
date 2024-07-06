import { file } from 'bun';
import { join } from 'path';
import { Database } from 'bun:sqlite';
import type { XSearchEngine } from './types';

export default async function toEdge(xSearchPath: string, edgeDbPath: string) {
  const engines: XSearchEngine[] = JSON.parse(await file(xSearchPath).text());
  if (!Array.isArray(engines)) throw new Error('Invalid input');

  if (!(await file(edgeDbPath).exists())) throw new Error(`File not exists: ${edgeDbPath}`);

  const db = new Database(edgeDbPath);
  db.query('DELETE FROM keywords').run();

  let id = 0;
  const query = db.query('INSERT INTO keywords (id, short_name, keyword, favicon_url, url) VALUES ($id, $short_name, $keyword, \'\', $url)');

  for (const engine of engines) {
    if (!engine.shortcuts.length) continue;
    query.run({
      $id: ++id,
      $short_name: engine.title,
      $keyword: engine.shortcuts[0],
      $url: engine.mobile.replaceAll(/%s/g, '{searchTerms}')
    });
  }
}
