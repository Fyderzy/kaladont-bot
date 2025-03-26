import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import discordBot from "./bot/discord-bot";
import { dictionaryManager } from "./bot/dictionary-manager";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // API routes - prefix all routes with /api
  
  // Bot status endpoint
  app.get("/api/bot/status", async (req, res) => {
    try {
      const status = discordBot.getStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ 
        error: "Failed to get bot status",
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get active games count
  app.get("/api/games/active/count", async (req, res) => {
    try {
      const count = await storage.getActiveGamesCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ 
        error: "Failed to get active games count",
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Dictionary Statistics
  app.get("/api/dictionary/stats", async (req, res) => {
    try {
      const stats = await dictionaryManager.getDictionaryStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ 
        error: "Failed to get dictionary statistics",
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });
  
  // Ping endpoint for keeping the bot alive (for services like cron-job.org)
  app.get("/ping", async (req, res) => {
    try {
      const status = discordBot.getStatus();
      res.json({
        message: "Bot je aktivan!",
        online: status.online,
        uptime: process.uptime(), // vreme od pokretanja u sekundama
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ 
        error: "Failed to ping",
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Add a single word to the dictionary
  app.post("/api/dictionary/add-word", async (req: Request, res: Response) => {
    try {
      const { word } = req.body;
      
      if (!word || typeof word !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Nedostaje parametar 'word' ili nije validan string." 
        });
      }
      
      const result = await dictionaryManager.addWord(word);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Add multiple words to the dictionary
  app.post("/api/dictionary/add-words", async (req: Request, res: Response) => {
    try {
      const { words } = req.body;
      
      if (!Array.isArray(words)) {
        return res.status(400).json({ 
          success: false, 
          message: "Parametar 'words' mora biti niz reči." 
        });
      }
      
      const result = await dictionaryManager.addWords(words);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  return httpServer;
}
