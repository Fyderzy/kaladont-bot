import { serbianWords, isValidSerbianWord, getRandomWord, getWordsStartingWith, getLastTwoLetters, isKaladontWord } from '../data/serbian-words';

class DictionaryManager {
  private usedWords: Set<string> = new Set();
  
  constructor() {
    // Initialize with empty set of used words
    this.resetUsedWords();
  }
  
  public resetUsedWords(): void {
    this.usedWords.clear();
  }
  
  public markWordAsUsed(word: string): void {
    this.usedWords.add(word.toLowerCase());
  }
  
  public isWordUsed(word: string): boolean {
    return this.usedWords.has(word.toLowerCase());
  }
  
  public isValidWord(word: string): boolean {
    return isValidSerbianWord(word);
  }
  
  public getRandomStartingWord(): string {
    let attempts = 0;
    let word;
    
    // Try to find a word that hasn't been used yet
    do {
      word = getRandomWord();
      attempts++;
      
      // After 10 attempts, reset the used words if we can't find a new one
      if (attempts > 10) {
        this.resetUsedWords();
        word = getRandomWord();
        break;
      }
    } while (this.isWordUsed(word));
    
    this.markWordAsUsed(word);
    return word;
  }
  
  public getLastTwoLetters(word: string): string {
    return getLastTwoLetters(word);
  }
  
  public isKaladontWord(word: string): boolean {
    return isKaladontWord(word);
  }
  
  public getPossibleNextWords(letters: string): string[] {
    return getWordsStartingWith(letters).filter(word => !this.isWordUsed(word));
  }
  
  public isValidNextWord(currentWord: string, nextWord: string): boolean {
    if (!this.isValidWord(nextWord)) {
      return false;
    }
    
    if (this.isWordUsed(nextWord)) {
      return false;
    }
    
    // Check if the next word starts with the last two letters of the current word
    const lastTwoLetters = this.getLastTwoLetters(currentWord);
    const startsWithLastTwo = nextWord.toLowerCase().startsWith(lastTwoLetters.toLowerCase());
    
    return startsWithLastTwo;
  }
  
  public getDictionarySize(): number {
    return serbianWords.length;
  }
}

// Export a singleton instance
export const dictionaryManager = new DictionaryManager();
