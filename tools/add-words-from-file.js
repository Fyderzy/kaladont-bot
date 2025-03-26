import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

/**
 * Dodaje reči iz datoteke u rečnik
 * @param {string} filePath - Putanja do datoteke sa rečima, jedna reč po liniji
 */
async function addWordsFromFile(filePath) {
  try {
    // Proveri da li datoteka sa rečima postoji
    if (!fs.existsSync(filePath)) {
      console.error(`Datoteka ${filePath} ne postoji.`);
      return;
    }

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
    const newWords = [];

    // Čitaj reči iz datoteke liniju po liniju
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      const word = line.trim().toLowerCase();
      // Dodaj samo reči koje su duže od 1 karaktera i nisu već u rečniku
      if (word.length > 1 && !existingWords.has(word)) {
        newWords.push(word);
        existingWords.add(word);
      }
    }

    if (newWords.length === 0) {
      console.log('Nema novih reči za dodavanje u rečnik.');
      return;
    }

    // Spoji nove reči sa postojećim rečnikom i sortiraj
    const updatedDictionary = Array.from(existingWords).sort();

    // Sačuvaj ažurirani rečnik
    fs.writeFileSync(dictionaryPath, JSON.stringify(updatedDictionary), 'utf8');
    console.log(`Uspešno dodato ${newWords.length} novih reči u rečnik.`);
    console.log(`Ukupno reči u rečniku: ${updatedDictionary.length}`);
  } catch (error) {
    console.error(`Greška pri dodavanju reči: ${error.message}`);
  }
}

// Ako je skripta pokrenuta direktno sa komandne linije, obradi argumente
if (process.argv.length < 3) {
  console.log('Upotreba: node add-words-from-file.js putanja/do/fajla.txt');
} else {
  const filePath = process.argv[2];
  addWordsFromFile(filePath);
}

export { addWordsFromFile };