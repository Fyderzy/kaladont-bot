import {
  users, type User, type InsertUser,
  games, type Game, type InsertGame,
  gameWords, type GameWord, type InsertGameWord,
  dictionaryWords, type DictionaryWord, type InsertDictionaryWord
} from "@shared/schema";

// Interface for the storage system
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game operations
  createGame(game: InsertGame): Promise<Game>;
  getGame(id: number): Promise<Game | undefined>;
  getGameByChannelId(channelId: string): Promise<Game | undefined>;
  getActiveGames(): Promise<Game[]>;
  updateGame(id: number, updates: Partial<Game>): Promise<Game | undefined>;
  
  // GameWord operations
  addWordToGame(gameWord: InsertGameWord): Promise<GameWord>;
  getWordsForGame(gameId: number): Promise<GameWord[]>;
  
  // Dictionary operations
  addWordToDictionary(word: InsertDictionaryWord): Promise<DictionaryWord>;
  isWordInDictionary(word: string): Promise<boolean>;
  getAllDictionaryWords(): Promise<string[]>;
  
  // Statistics
  getActiveGamesCount(): Promise<number>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private games: Map<number, Game>;
  private gameWords: Map<number, GameWord>;
  private dictionary: Set<string>;
  
  private userId: number;
  private gameId: number;
  private gameWordId: number;
  private dictionaryWordId: number;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.gameWords = new Map();
    this.dictionary = new Set();
    
    this.userId = 1;
    this.gameId = 1;
    this.gameWordId = 1;
    this.dictionaryWordId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Game operations
  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.gameId++;
    const now = new Date();
    const game: Game = { 
      ...insertGame, 
      id, 
      isActive: insertGame.isActive ?? true,
      startTime: now,
      endTime: null,
      winnerId: null,
      winnerUsername: null
    };
    this.games.set(id, game);
    return game;
  }

  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async getGameByChannelId(channelId: string): Promise<Game | undefined> {
    return Array.from(this.games.values()).find(
      (game) => game.channelId === channelId && game.isActive
    );
  }

  async getActiveGames(): Promise<Game[]> {
    return Array.from(this.games.values()).filter(game => game.isActive);
  }

  async updateGame(id: number, updates: Partial<Game>): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    
    const updatedGame = { ...game, ...updates };
    this.games.set(id, updatedGame);
    return updatedGame;
  }

  // GameWord operations
  async addWordToGame(insertGameWord: InsertGameWord): Promise<GameWord> {
    const id = this.gameWordId++;
    const now = new Date();
    const gameWord: GameWord = { 
      ...insertGameWord, 
      id, 
      playedAt: now
    };
    this.gameWords.set(id, gameWord);
    return gameWord;
  }

  async getWordsForGame(gameId: number): Promise<GameWord[]> {
    return Array.from(this.gameWords.values()).filter(
      word => word.gameId === gameId
    ).sort((a, b) => a.turnNumber - b.turnNumber);
  }

  // Dictionary operations
  async addWordToDictionary(insertWord: InsertDictionaryWord): Promise<DictionaryWord> {
    const id = this.dictionaryWordId++;
    const dictionaryWord: DictionaryWord = { ...insertWord, id };
    this.dictionary.add(insertWord.word.toLowerCase());
    return dictionaryWord;
  }

  async isWordInDictionary(word: string): Promise<boolean> {
    return this.dictionary.has(word.toLowerCase());
  }

  async getAllDictionaryWords(): Promise<string[]> {
    return Array.from(this.dictionary);
  }

  // Statistics
  async getActiveGamesCount(): Promise<number> {
    return (await this.getActiveGames()).length;
  }
}

// Export a singleton instance of the storage
export const storage = new MemStorage();
