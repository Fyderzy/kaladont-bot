import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from '../vite';

/**
 * Validates Serbian words for the Kaladont game
 */
export class WordValidator {
  private dictionary: Set<string> = new Set();
  private dictionaryPath: string;

  constructor() {
    // Get directory path for ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    // Set path to the dictionary file
    this.dictionaryPath = path.resolve(__dirname, '../data/serbian-dictionary-mega.json');
    
    // Load the dictionary
    this.loadDictionary();
  }

  /**
   * Load the Serbian dictionary from file
   */
  private loadDictionary(): void {
    try {
      // Check if the dictionary file exists
      if (fs.existsSync(this.dictionaryPath)) {
        const data = fs.readFileSync(this.dictionaryPath, 'utf8');
        const words = JSON.parse(data) as string[];
        
        // Add all words to the dictionary set
        for (const word of words) {
          this.dictionary.add(word.toLowerCase());
        }
        
        log(`Loaded ${this.dictionary.size} Serbian words into dictionary`, 'word-validator');
      } else {
        // If the file doesn't exist, create a fallback dictionary with basic words
        this.createFallbackDictionary();
      }
    } catch (error) {
      log(`Error loading dictionary: ${error}`, 'word-validator');
      this.createFallbackDictionary();
    }
  }

  /**
   * Create a fallback dictionary with basic Serbian words
   */
  private createFallbackDictionary(): void {
    const basicWords = [
      'kuća', 'soba', 'auto', 'mama', 'tata', 'brat', 'sestra', 'pas', 'mačka',
      'drvo', 'nebo', 'sunce', 'mesec', 'zvezda', 'grad', 'selo', 'put', 'reka',
      'more', 'planina', 'škola', 'knjiga', 'olovka', 'tabla', 'lopta', 'igra',
      'muzika', 'film', 'slika', 'boja', 'crven', 'plav', 'zelen', 'žut', 'crn',
      'beo', 'siv', 'veliki', 'mali', 'dobro', 'loše', 'brzo', 'sporo', 'visoko',
      'nisko', 'hladno', 'toplo', 'levo', 'desno', 'gore', 'dole', 'dan', 'noć',
      'jutro', 'veče', 'leto', 'zima', 'jesen', 'proleće', 'hleb', 'sir', 'mleko',
      'voda', 'sok', 'kafa', 'čaj', 'meso', 'riba', 'voće', 'povrće', 'jabuka',
      'banana', 'narandža', 'limun', 'kompjuter', 'telefon', 'televizor', 'radio',
      'sat', 'vreme', 'godina', 'mesec', 'nedelja', 'dan', 'sat', 'minut', 'sekunda'
    ];
    
    // Add the basic words to the dictionary
    for (const word of basicWords) {
      this.dictionary.add(word);
    }
    
    log(`Created fallback dictionary with ${basicWords.length} words`, 'word-validator');
    
    // Save the fallback dictionary to file
    try {
      // Make sure the data directory exists
      const dataDir = path.dirname(this.dictionaryPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(this.dictionaryPath, JSON.stringify(basicWords, null, 2), 'utf8');
      log('Fallback dictionary saved to file', 'word-validator');
    } catch (error) {
      log(`Error saving fallback dictionary: ${error}`, 'word-validator');
    }
  }

  /**
   * Check if a word is valid (exists in the dictionary)
   */
  public isValidWord(word: string): boolean {
    return this.dictionary.has(word.toLowerCase());
  }

  /**
   * Get all words starting with specific letters
   */
  public getWordsStartingWith(letters: string): string[] {
    const result: string[] = [];
    letters = letters.toLowerCase();
    
    // Convert Set to Array before iteration to avoid compatibility issues
    const wordsArray = Array.from(this.dictionary);
    
    for (const word of wordsArray) {
      if (word.startsWith(letters)) {
        result.push(word);
      }
    }
    
    return result;
  }

  /**
   * Get the count of words in the dictionary
   */
  public getDictionarySize(): number {
    return this.dictionary.size;
  }
}
