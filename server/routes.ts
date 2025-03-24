import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import discordBot from "./bot/discord-bot";

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

  // Add more API routes as needed...

  return httpServer;
}
