import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

/**
 * Proverava broj reči u rečniku i pokazuje osnovne statistike
 */
function checkDictionary() {
  try {
    // Proveri da li rečnik postoji
    if (!fs.existsSync(dictionaryPath)) {
      console.error('Rečnik ne postoji!');
      return;
    }

    // Učitaj rečnik
    const data = fs.readFileSync(dictionaryPath, 'utf8');
    const dictionary = JSON.parse(data);

    // Izračunaj statistike
    const totalWords = dictionary.length;
    
    // Broj reči po dužini
    const wordsByLength = {};
    let totalLength = 0;

    for (const word of dictionary) {
      totalLength += word.length;
      
      const length = word.length;
      if (!wordsByLength[length]) {
        wordsByLength[length] = 0;
      }
      wordsByLength[length]++;
    }

    const averageLength = totalLength / totalWords;

    // Izračunaj koliko reči se završava sa 'nt' (potencijalne Kaladont reči)
    const kaladontWords = dictionary.filter(word => word.endsWith('nt'));

    // Prikaži statistike
    console.log('=== STATISTIKA REČNIKA ===');
    console.log(`Ukupan broj reči: ${totalWords}`);
    console.log(`Prosečna dužina reči: ${averageLength.toFixed(2)} karaktera`);
    console.log(`Broj reči koje se završavaju sa 'nt' (Kaladont): ${kaladontWords.length}`);
    
    // Prikaži broj reči po dužini
    console.log('\nBroj reči po dužini:');
    const lengths = Object.keys(wordsByLength).sort((a, b) => Number(a) - Number(b));
    
    for (const length of lengths) {
      const count = wordsByLength[length];
      const percentage = ((count / totalWords) * 100).toFixed(2);
      console.log(`  ${length} karaktera: ${count} (${percentage}%)`);
    }

  } catch (error) {
    console.error(`Greška pri proveravanju rečnika: ${error.message}`);
  }
}

// Pokreni funkciju ako je skripta pokrenuta direktno
checkDictionary();