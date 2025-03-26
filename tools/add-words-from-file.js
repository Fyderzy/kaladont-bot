import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');
const newWordsPath = path.resolve(__dirname, '../attached_assets/Pasted-a-A-B-AA-AAA-AAOM-AAS-AB-aba-Aba-ABAB-aba-e-abacija-abacijama-abacije-abaciji-abacijo-abacijom-abaci-1743007128261.txt');

// Funkcija za dodavanje reči iz fajla u rečnik
async function addWordsFromFile() {
  try {
    // Učitaj postojeći rečnik
    const dictionaryData = fs.readFileSync(dictionaryPath, 'utf8');
    let existingWords = new Set(JSON.parse(dictionaryData));
    
    console.log(`Trenutni broj reči u rečniku: ${existingWords.size}`);
    
    // Učitaj nove reči iz fajla (čitamo ih red po red da izbegnemo preopterećenje memorije)
    const content = fs.readFileSync(newWordsPath, 'utf8');
    const newWords = content.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    
    console.log(`Broj reči u priloženom fajlu: ${newWords.length}`);
    
    // Brojač za dodane reči
    let addedCount = 0;
    
    // Dodaj reči u rečnik (Set automatski eliminiše duplikate)
    for (const word of newWords) {
      // Dodajemo samo reči sa 2 ili više karaktera, koje su samo mala slova (nemaju velika slova ili specijalne karaktere)
      if (word.length >= 2 && /^[a-zčćšžđ]+$/.test(word)) {
        if (!existingWords.has(word)) {
          existingWords.add(word);
          addedCount++;
        }
      }
    }
    
    // Konvertuj Set nazad u niz i sačuvaj
    const updatedWords = Array.from(existingWords);
    fs.writeFileSync(dictionaryPath, JSON.stringify(updatedWords, null, 2), 'utf8');
    
    console.log(`Novi broj reči u rečniku: ${updatedWords.length}`);
    console.log(`Dodato ${addedCount} novih reči.`);
  } catch (error) {
    console.error(`Greška pri dodavanju reči iz fajla: ${error}`);
  }
}

// Pozovi funkciju
addWordsFromFile();
