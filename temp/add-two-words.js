import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

// Dodaj nove reči
async function addSpecificWords() {
  try {
    // Pročitaj postojeće reči
    const data = fs.readFileSync(dictionaryPath, 'utf8');
    let words = JSON.parse(data);
    
    console.log(`Trenutni broj reči: ${words.length}`);
    
    // Dodaj nove reči
    const newWords = ["jaguar", "kasir"];
    const uniqueWords = new Set([...words, ...newWords]);
    const updatedWords = Array.from(uniqueWords);
    
    // Sačuvaj ažurirani rečnik
    fs.writeFileSync(dictionaryPath, JSON.stringify(updatedWords, null, 2), 'utf8');
    
    console.log(`Novi broj reči: ${updatedWords.length}`);
    console.log(`Dodato ${updatedWords.length - words.length} novih reči.`);
  } catch (error) {
    console.error(`Greška pri dodavanju reči: ${error}`);
  }
}

// Pozovi funkciju
addSpecificWords();
