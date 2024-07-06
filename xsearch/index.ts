import { file, write } from 'bun';
import convertFromXSearch from './src/from-xsearch';
import convertToXSearch from './src/to-xsearch';
import toEdge from './src/to-edge';

const args = process.argv.slice(2);
if (args.length < 3) throw new Error('Expected three arguments: from|to, inputPath, outputPath');

const [ mode, inputPath, outputPath ] = args;
if (mode !== 'from' && mode !== 'to' && mode !== 'to-edge') throw new Error('Expected mode to be "from" or "to" or "to-edge".');

if (!(await file(inputPath).exists())) throw new Error(`${inputPath} does not exist.`);

if (mode === 'from') {
  await write(outputPath, convertFromXSearch(JSON.parse(await file(inputPath).text())));
} else if (mode === 'to') {
  await write(outputPath, JSON.stringify(convertToXSearch(await file(inputPath).text()), undefined, 2) + '\n');
} else if (mode === 'to-edge') {
  await toEdge(inputPath, outputPath);
}

console.log('Done');
