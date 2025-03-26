import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

// Read the JSON file
const data = fs.readFileSync(dictionaryPath, 'utf8');
const words = JSON.parse(data);

console.log(`Ukupan broj reči u rečniku: ${words.length}`);