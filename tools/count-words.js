import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

// Funkcija za proveru i prikaz informacija o rečniku
function checkDictionary() {
  try {
    // Pročitaj postojeće reči
    const data = fs.readFileSync(dictionaryPath, 'utf8');
    let words = JSON.parse(data);
    
    console.log(`Ukupan broj reči u rečniku: ${words.length}`);
    
    // Analiza dužine reči
    const wordLengths = words.map(word => word.length);
    const avgLength = wordLengths.reduce((sum, len) => sum + len, 0) / words.length;
    const minLength = Math.min(...wordLengths);
    const maxLength = Math.max(...wordLengths);
    
    console.log(`Prosečna dužina reči: ${avgLength.toFixed(2)} slova`);
    console.log(`Najkraća reč: ${minLength} slova`);
    console.log(`Najduža reč: ${maxLength} slova`);
    
    // Pregled reči po početnim slovima
    const letterCounts = {};
    for (const word of words) {
      const firstLetter = word.charAt(0);
      letterCounts[firstLetter] = (letterCounts[firstLetter] || 0) + 1;
    }
    
    console.log("\nBroj reči po početnom slovu:");
    for (const [letter, count] of Object.entries(letterCounts).sort()) {
      console.log(`${letter}: ${count}`);
    }
    
    // Proveri duplikate
    const uniqueWords = new Set(words);
    if (uniqueWords.size < words.length) {
      console.log(`\nPronađeno ${words.length - uniqueWords.size} duplikata.`);
    } else {
      console.log("\nNema duplikata u rečniku.");
    }
    
  } catch (error) {
    console.error(`Greška pri proveri rečnika: ${error}`);
  }
}

// Pozovi funkciju
checkDictionary();