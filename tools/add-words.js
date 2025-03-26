import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import readline from 'readline';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

// Funkcija za dodavanje novih reči u rečnik
async function addWordsToDictionary(newWords) {
  try {
    // Pročitaj postojeće reči
    const data = fs.readFileSync(dictionaryPath, 'utf8');
    let words = JSON.parse(data);
    
    console.log(`Trenutni broj reči: ${words.length}`);
    
    // Dodaj nove reči
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

// Funkcija za čitanje reči iz komandne linije
async function readWordsFromCommandLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Unesite srpske reči za dodavanje u rečnik (jednu po liniji).");
  console.log("Kada završite, unesite 'KRAJ' ili 'END' za kraj unosa.");
  
  const words = [];
  
  for await (const line of rl) {
    const word = line.trim();
    
    if (word.toUpperCase() === 'KRAJ' || word.toUpperCase() === 'END') {
      break;
    }
    
    if (word) {
      words.push(word);
      console.log(`Dodato: "${word}"`);
    }
  }
  
  rl.close();
  return words;
}

// Funkcija za čitanje reči iz fajla
function readWordsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Razdvoj tekst po linijama i ukloni prazne linije
    const words = content.split('\n')
      .map(word => word.trim())
      .filter(word => word.length > 0);
    
    console.log(`Pročitano ${words.length} reči iz fajla ${filePath}`);
    return words;
  } catch (error) {
    console.error(`Greška pri čitanju fajla: ${error}`);
    return [];
  }
}

// Glavni deo skripte
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Ako je prosleđen argument, pretpostavi da je to putanja do fajla
    const filePath = args[0];
    const words = readWordsFromFile(filePath);
    
    if (words.length > 0) {
      await addWordsToDictionary(words);
    }
  } else {
    // Ako nema argumenta, čitaj reči sa komandne linije
    console.log("Dobrodošli u alat za dodavanje reči u srpski rečnik!");
    const words = await readWordsFromCommandLine();
    
    if (words.length > 0) {
      await addWordsToDictionary(words);
    } else {
      console.log("Nijedna reč nije uneta.");
    }
  }
}

// Pozovi glavnu funkciju
main();