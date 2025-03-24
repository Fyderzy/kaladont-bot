// This is just a small subset of Serbian words for demonstration
// In a production environment, you would load a much larger dataset (17k-25k words)
// These words are stored as lowercase to simplify matching
export const serbianWords = [
  'abeceda', 'adresa', 'advokat', 'atmosfera', 
  'badem', 'banana', 'banket', 'banka',
  'centar', 'cilj', 'crkva', 'cvet',
  'daljina', 'dama', 'dan', 'daska',
  'ekran', 'elaborat', 'epilog', 'evropa',
  'فактор', 'fakultet', 'film', 'fotografija',
  'garaža', 'glava', 'godina', 'grad',
  'harmonika', 'higijena', 'hitno', 'hleb',
  'igra', 'ime', 'internet', 'istorija',
  'jabuka', 'jagoda', 'januar', 'jesen',
  'kaladont', 'kamen', 'knjiga', 'komad',
  'lampa', 'lice', 'limun', 'list',
  'majka', 'mamac', 'mapa', 'maramica',
  'nauka', 'naziv', 'nebo', 'nedelja',
  'obala', 'oblak', 'oblik', 'obrazovanje',
  'padavina', 'papir', 'park', 'partner',
  'radijator', 'radnik', 'reka', 'restoran',
  'sala', 'sapun', 'sestra', 'slika',
  'tabela', 'tacna', 'telefon', 'temperatura',
  'ugovor', 'ulaz', 'usta', 'utakmica',
  'voda', 'vožnja', 'vrata', 'vreme',
  'zakon', 'zamena', 'zemlja', 'zgrada',
  'žaba', 'život', 'žica', 'žurka',
  'šala', 'šansa', 'šolja', 'šuma',
  'čaj', 'čarapa', 'čast', 'član',
  'đak', 'đon', 'đubre', 'đuveč',
  'njiva', 'njegov', 'njen', 'njuška',
  'ljubav', 'ljuljaška', 'ljut', 'ljudi',
  'džak', 'džem', 'džep', 'džungla',
  // Additional words for testing game mechanics
  'mobilni', 'nikad', 'advokat', 'atmosfera', 'ravnica',
  'carica', 'carina', 'carinski', 'dokument', 'element',
  'fragment', 'argument', 'testament', 'student', 'dokument'
];

// Full list would include thousands more words

// Helper functions for the dictionary
export function isValidSerbianWord(word: string): boolean {
  return serbianWords.includes(word.toLowerCase());
}

export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * serbianWords.length);
  return serbianWords[randomIndex];
}

export function getWordsStartingWith(letters: string): string[] {
  return serbianWords.filter(word => 
    word.toLowerCase().startsWith(letters.toLowerCase())
  );
}

export function getLastTwoLetters(word: string): string {
  if (word.length < 2) return word;
  return word.slice(-2);
}

// Check if a word ends with "nt" (Kaladont win condition)
export function isKaladontWord(word: string): boolean {
  return word.toLowerCase().endsWith('nt');
}
