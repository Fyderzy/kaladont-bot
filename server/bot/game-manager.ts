import { WordValidator } from './word-validator';

// Interface for word information
interface WordInfo {
  word: string;
  playerId: string;
  playerName: string;
}

// Interface for game state
interface Game {
  channelId: string;
  isActive: boolean;
  currentWord: string;
  nextLetters: string;
  playedWords: WordInfo[];
  usedWords: Set<string>;
  startTime: Date;
}

// Interface for word processing result
interface WordResult {
  valid: boolean;
  error?: string;
  nextLetters?: string;
  isKaladont?: boolean;
}

/**
 * Manages Kaladont games across different channels
 */
export class GameManager {
  private games: Map<string, Game> = new Map();
  private wordValidator: WordValidator;
  
  // Initial words to start games with
  private startingWords: string[] = [
    'lopta', 'kuća', 'soba', 'mobilni', 'prozor', 
    'tabla', 'stolica', 'student', 'knjiga', 'jabuka',
    'ulica', 'dnevnik', 'fakultet', 'muzika', 'leto',
    'putovanje', 'planina', 'more', 'kompjuter', 'zvezda'
  ];

  constructor(wordValidator: WordValidator) {
    this.wordValidator = wordValidator;
  }

  /**
   * Start a new game in a channel
   */
  public startGame(channelId: string): Game {
    // Select a random starting word
    const randomIndex = Math.floor(Math.random() * this.startingWords.length);
    const startWord = this.startingWords[randomIndex];
    
    // Get the last two letters to set up the next player's turn
    const nextLetters = startWord.slice(-2);
    
    // Create a new game
    const game: Game = {
      channelId,
      isActive: true,
      currentWord: startWord,
      nextLetters,
      playedWords: [],
      usedWords: new Set([startWord]), // Add the starting word to used words
      startTime: new Date()
    };
    
    // Store the game
    this.games.set(channelId, game);
    
    return game;
  }

  /**
   * Check if a game is active in a channel
   */
  public isGameActive(channelId: string): boolean {
    const game = this.games.get(channelId);
    return !!game && game.isActive;
  }

  /**
   * Get a game by channel ID
   */
  public getGameByChannelId(channelId: string): Game | undefined {
    return this.games.get(channelId);
  }

  /**
   * End a game in a channel
   */
  public endGame(channelId: string): void {
    const game = this.games.get(channelId);
    if (game) {
      game.isActive = false;
      // Keep the game in the map for history, but mark it as inactive
    }
  }

  /**
   * Process a word from a player
   */
  public processWord(channelId: string, word: string, playerId: string, playerName: string): WordResult {
    const game = this.games.get(channelId);
    
    // Check if the game exists and is active
    if (!game || !game.isActive) {
      return {
        valid: false,
        error: 'Nema aktivne igre u ovom kanalu. Koristite `!kaladont` da započnete novu igru.'
      };
    }

    // Check if the same player is trying to play twice in a row
    if (game.playedWords.length > 0) {
      const lastPlayer = game.playedWords[game.playedWords.length - 1];
      if (lastPlayer.playerId === playerId) {
        return {
          valid: false,
          error: `Ne možete igrati dva puta zaredom. Sačekajte da neko drugi kaže reč.`
        };
      }
    }
    
    // Check if the word starts with the correct letters
    if (!word.startsWith(game.nextLetters)) {
      return {
        valid: false,
        error: `Reč mora da počinje sa **${game.nextLetters}**. Pokušajte ponovo.`
      };
    }
    
    // Check if the word is valid (in Serbian dictionary)
    if (!this.wordValidator.isValidWord(word)) {
      return {
        valid: false,
        error: `Reč **${word}** nije pronađena u rečniku. Pokušajte sa drugom rečju.`
      };
    }
    
    // Check if the word is already used
    if (game.usedWords.has(word)) {
      return {
        valid: false,
        error: `Reč **${word}** je već upotrebljena u ovoj igri. Pokušajte sa drugom rečju.`
      };
    }
    
    // The word is valid, update the game state
    game.usedWords.add(word);
    game.currentWord = word;
    game.playedWords.push({
      word,
      playerId,
      playerName
    });
    
    // Check if this is a winning move (word ends with "nt")
    if (word.endsWith('nt')) {
      return {
        valid: true,
        isKaladont: true
      };
    }
    
    // Get the next two letters for the next player
    const nextLetters = word.slice(-2);
    game.nextLetters = nextLetters;
    
    return {
      valid: true,
      nextLetters
    };
  }

  /**
   * Get the count of active games
   */
  public getActiveGamesCount(): number {
    let count = 0;
    for (const game of this.games.values()) {
      if (game.isActive) {
        count++;
      }
    }
    return count;
  }
}
