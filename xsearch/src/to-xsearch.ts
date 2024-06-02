import { parse } from 'csv/sync';
import type { CSVRecord, XSearchEngine } from './types';
import { columns } from './csv';

export default function convertToXSearch(csvContent: string): XSearchEngine[] {
  const records: CSVRecord[] = parse(csvContent, { columns, fromLine: 2 });
  return records.map(r => ({ title: r.short_name, shortcuts: [r.keyword], mobile: r.url.replaceAll('{searchTerms}', '%s') }));
};
