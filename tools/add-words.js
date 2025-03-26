import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

/**
 * Dodaje nove reči u srpski rečnik za Kaladont
 * @param {string[]} newWords - Niz novih reči za dodavanje
 */
async function addWordsToDictionary(newWords) {
  try {
    // Učitaj postojeći rečnik
    let dictionary = [];
    if (fs.existsSync(dictionaryPath)) {
      try {
        const data = fs.readFileSync(dictionaryPath, 'utf8');
        dictionary = JSON.parse(data);
        console.log(`Učitan rečnik sa ${dictionary.length} reči.`);
      } catch (error) {
        console.error(`Greška pri učitavanju rečnika: ${error.message}`);
        dictionary = [];
      }
    } else {
      console.log('Rečnik ne postoji, biće kreiran novi.');
    }

    // Kreiraj Set radi brže provere duplikata
    const existingWords = new Set(dictionary);
    const addedWords = [];

    // Obradi nove reči
    for (const word of newWords) {
      const cleanWord = word.trim().toLowerCase();
      // Dodaj samo reči koje su duže od 1 karaktera i nisu već u rečniku
      if (cleanWord.length > 1 && !existingWords.has(cleanWord)) {
        addedWords.push(cleanWord);
        existingWords.add(cleanWord);
      }
    }

    if (addedWords.length === 0) {
      console.log('Nema novih reči za dodavanje u rečnik.');
      return;
    }

    // Spoji nove reči sa postojećim rečnikom i sortiraj
    const updatedDictionary = Array.from(existingWords).sort();

    // Sačuvaj ažurirani rečnik
    fs.writeFileSync(dictionaryPath, JSON.stringify(updatedDictionary), 'utf8');
    console.log(`Uspešno dodato ${addedWords.length} novih reči u rečnik.`);
    console.log(`Ukupno reči u rečniku: ${updatedDictionary.length}`);
    
    // Ispiši dodate reči
    console.log('Dodate reči:');
    console.log(addedWords.join(', '));
  } catch (error) {
    console.error(`Greška pri dodavanju reči: ${error.message}`);
  }
}

// Interaktivno dodaj reč u rečnik
async function interactiveAddWords() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const words = [];
  
  const askForWord = () => {
    rl.question('Unesite reč za dodavanje (ili pritisnite Enter za kraj): ', (word) => {
      if (word.trim() === '') {
        rl.close();
        if (words.length > 0) {
          addWordsToDictionary(words);
        } else {
          console.log('Nijedna reč nije uneta.');
        }
      } else {
        words.push(word.trim());
        askForWord();
      }
    });
  };

  askForWord();
}

// Ako je skripta pokrenuta direktno sa komandne linije
if (process.argv.length > 2) {
  // Preskočimo prvi dva argumenta (node i ime skripte)
  const words = process.argv.slice(2);
  addWordsToDictionary(words);
} else {
  interactiveAddWords();
}

export { addWordsToDictionary };