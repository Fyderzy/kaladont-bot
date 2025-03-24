import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Game model for Kaladont
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  guildId: text("guild_id").notNull(),
  channelId: text("channel_id").notNull(),
  currentWord: text("current_word").notNull(),
  nextLetters: text("next_letters").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  winnerId: text("winner_id"),
  winnerUsername: text("winner_username"),
});

export const insertGameSchema = createInsertSchema(games).pick({
  guildId: true,
  channelId: true,
  currentWord: true,
  nextLetters: true,
  isActive: true,
});

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

// GameWord model for tracking words used in a game
export const gameWords = pgTable("game_words", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull(),
  word: text("word").notNull(),
  playerId: text("player_id").notNull(),
  playerName: text("player_name").notNull(),
  playedAt: timestamp("played_at").notNull().defaultNow(),
  turnNumber: integer("turn_number").notNull(),
});

export const insertGameWordSchema = createInsertSchema(gameWords).pick({
  gameId: true,
  word: true,
  playerId: true,
  playerName: true,
  turnNumber: true,
});

export type InsertGameWord = z.infer<typeof insertGameWordSchema>;
export type GameWord = typeof gameWords.$inferSelect;

// Dictionary model for Serbian words
export const dictionaryWords = pgTable("dictionary_words", {
  id: serial("id").primaryKey(),
  word: text("word").notNull().unique(),
});

export const insertDictionaryWordSchema = createInsertSchema(dictionaryWords).pick({
  word: true,
});

export type InsertDictionaryWord = z.infer<typeof insertDictionaryWordSchema>;
export type DictionaryWord = typeof dictionaryWords.$inferSelect;
