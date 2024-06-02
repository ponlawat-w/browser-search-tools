import { stringify } from 'csv/sync';
import type { CSVRecord, XSearchEngine } from './types';
import { columns } from './csv';

export default function convertFromXSearch(engines: XSearchEngine[]): string {
  const records: CSVRecord[] = engines
    .filter(e => e.shortcuts.length)
    .map(e => ({ short_name: e.title, keyword: e.shortcuts[0], url: e.mobile.replaceAll('%s', '{searchTerms}') }));
  return stringify(records, { columns, header: true });
};
