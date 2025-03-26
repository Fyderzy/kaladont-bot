import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from '../vite';

/**
 * Upravlja srpskim rečnikom za Kaladont igru
 */
export class DictionaryManager {
  private dictionaryPath: string;

  constructor() {
    // Get directory path for ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    // Set path to the dictionary file
    this.dictionaryPath = path.resolve(__dirname, '../data/serbian-dictionary-mega.json');
  }

  /**
   * Učitaj rečnik iz datoteke
   */
  public async loadDictionary(): Promise<string[]> {
    try {
      // Proveri da li postoji datoteka rečnika
      if (fs.existsSync(this.dictionaryPath)) {
        const data = fs.readFileSync(this.dictionaryPath, 'utf8');
        const words = JSON.parse(data) as string[];
        return words;
      } else {
        log(`Dictionary file not found at ${this.dictionaryPath}`, 'dictionary-manager');
        return [];
      }
    } catch (error) {
      log(`Error loading dictionary: ${error}`, 'dictionary-manager');
      return [];
    }
  }

  /**
   * Sačuvaj rečnik u datoteku
   */
  private async saveDictionary(words: string[]): Promise<boolean> {
    try {
      fs.writeFileSync(this.dictionaryPath, JSON.stringify(words, null, 2), 'utf8');
      return true;
    } catch (error) {
      log(`Error saving dictionary: ${error}`, 'dictionary-manager');
      return false;
    }
  }

  /**
   * Dodaj novu reč u rečnik
   */
  public async addWord(word: string): Promise<{ success: boolean, message: string }> {
    try {
      // Pretvori reč u mala slova i ukloni beline
      word = word.toLowerCase().trim();
      
      // Proveri da li je reč prazna
      if (!word) {
        return { success: false, message: "Reč ne može biti prazna." };
      }
      
      // Proveri da li reč sadrži samo slova srpske ćirilice ili latinice
      // Uključuje šumove, č, ć, đ, ž, itd.
      const validChars = /^[a-zčćđšžA-ZČĆĐŠŽ]+$/;
      if (!validChars.test(word)) {
        return { success: false, message: "Reč mora sadržati samo slova srpskog jezika." };
      }
      
      // Učitaj postojeći rečnik
      const words = await this.loadDictionary();
      
      // Proveri da li reč već postoji
      if (words.includes(word)) {
        return { success: false, message: "Reč već postoji u rečniku." };
      }
      
      // Dodaj novu reč
      words.push(word);
      
      // Sačuvaj ažurirani rečnik
      const saved = await this.saveDictionary(words);
      if (saved) {
        return { success: true, message: `Reč "${word}" je uspešno dodata u rečnik.` };
      } else {
        return { success: false, message: "Greška prilikom čuvanja rečnika." };
      }
    } catch (error) {
      log(`Error adding word to dictionary: ${error}`, 'dictionary-manager');
      return { success: false, message: "Došlo je do greške prilikom dodavanja reči." };
    }
  }

  /**
   * Dodaj više reči u rečnik
   */
  public async addWords(newWords: string[]): Promise<{ success: boolean, added: number, message: string }> {
    try {
      // Učitaj postojeći rečnik
      const words = await this.loadDictionary();
      const initialCount = words.length;
      
      // Filtriraj i pripremi nove reči
      const cleanedWords = newWords
        .map(word => word.toLowerCase().trim())
        .filter(word => word && /^[a-zčćđšžA-ZČĆĐŠŽ]+$/.test(word));
      
      // Dodaj samo reči koje već ne postoje
      const uniqueWords = new Set([...words, ...cleanedWords]);
      const updatedWords = Array.from(uniqueWords);
      
      // Sačuvaj ažurirani rečnik
      const saved = await this.saveDictionary(updatedWords);
      if (saved) {
        const addedCount = updatedWords.length - initialCount;
        return { 
          success: true, 
          added: addedCount,
          message: `Uspešno dodato ${addedCount} novih reči u rečnik.` 
        };
      } else {
        return { success: false, added: 0, message: "Greška prilikom čuvanja rečnika." };
      }
    } catch (error) {
      log(`Error adding multiple words to dictionary: ${error}`, 'dictionary-manager');
      return { success: false, added: 0, message: "Došlo je do greške prilikom dodavanja reči." };
    }
  }

  /**
   * Dobavi statistiku rečnika
   */
  public async getDictionaryStats(): Promise<{ 
    wordCount: number, 
    avgLength: number,
    letterCounts: Record<string, number>
  }> {
    try {
      // Učitaj rečnik
      const words = await this.loadDictionary();
      
      // Izračunaj statistiku
      const wordCount = words.length;
      
      // Prosečna dužina
      const totalLength = words.reduce((sum, word) => sum + word.length, 0);
      const avgLength = wordCount > 0 ? totalLength / wordCount : 0;
      
      // Broj reči po početnom slovu
      const letterCounts: Record<string, number> = {};
      for (const word of words) {
        if (word.length > 0) {
          const firstLetter = word[0];
          letterCounts[firstLetter] = (letterCounts[firstLetter] || 0) + 1;
        }
      }
      
      return { wordCount, avgLength, letterCounts };
    } catch (error) {
      log(`Error getting dictionary statistics: ${error}`, 'dictionary-manager');
      return { wordCount: 0, avgLength: 0, letterCounts: {} };
    }
  }
}

// Kreiraj singleton instancu
export const dictionaryManager = new DictionaryManager();