import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Book, CheckCircle, Database, ExternalLink, HelpCircle, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

interface BotStatus {
  online: boolean;
  guildCount: number;
  activeGames: number;
}

export default function Home() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<BotStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        const data = await apiRequest<BotStatus>("/api/bot/status");
        setStatus(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch bot status. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="container flex flex-col items-center max-w-5xl py-10">
      <div className="flex items-center gap-4 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-discord-primary"
        >
          <path
            stroke="#5865F2"
            d="M19.27 5.33C17.91 4.62 16.46 4.05 14.9 3.65C14.7 3.98 14.47 4.42 14.31 4.78C12.63 4.41 10.94 4.41 9.28 4.78C9.12 4.42 8.88 3.98 8.68 3.65C7.14 4.05 5.67 4.63 4.32 5.33C1.94 8.95 1.31 12.45 1.62 15.91C3.42 17.25 5.17 18.08 6.89 18.61C7.27 18.12 7.61 17.6 7.89 17.05C7.22 16.8 6.58 16.5 5.98 16.16C6.14 16.05 6.29 15.93 6.43 15.81C9.57 17.25 13 17.25 16.08 15.81C6.23 15.93 6.38 16.05 6.53 16.16C5.93 16.5 5.29 16.8 4.62 17.05C4.9 17.6 5.24 18.12 5.62 18.61C7.34 18.08 9.09 17.25 10.89 15.91C11.25 18.87 12.3 20.29 14 19.95C14.08 20.08 14.17 20.2 14.27 20.32L14.87 20.26C15.04 20.24 15.2 20.2 15.37 20.16L15.85 20.1C16.03 19.97 16.18 19.84 16.32 19.7C16.98 19.1 17.23 17.92 17.36 16.83C17.38 16.7 17.39 16.58 17.4 16.46C17.42 16.34 17.42 16.22 17.43 16.1C17.43 15.98 17.43 15.86 17.43 15.75L17.42 15.53L17.4 15.31L17.38 15.1L17.36 14.9C17.31 14.47 17.24 14.06 17.16 13.66C17.07 13.27 16.97 12.89 16.86 12.52C17.93 12.02 18.97 11.29 20 15.91C20.31 12.45 19.68 8.95 19.27 5.33Z"></path>
        </svg>
        <h1 className="text-4xl font-bold">Kaladont Bot</h1>
      </div>

      <Card className="w-full mb-8">
        <CardHeader className="bg-discord-primary/20 border-l-4 border-discord-primary">
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            <span>Discord Bot Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-8 h-8 border-4 border-discord-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-muted-foreground">Loading status...</p>
            </div>
          ) : status ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${status.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium">{status.online ? 'Online' : 'Offline'}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Servers</p>
                  <p className="text-2xl font-bold">{status.guildCount}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Active Games</p>
                  <p className="text-2xl font-bold">{status.activeGames}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-4 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>Could not fetch bot status</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card>
          <CardHeader className="bg-discord-primary/20 border-l-4 border-discord-primary">
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              <span>About Kaladont</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p>
              Kaladont is a traditional word game popular in Serbia and the Balkan region. Players take turns saying words
              where each new word must start with the last two letters of the previous word.
            </p>
            <p>
              The goal is to say a word that ends with "nt" (Kaladont), which is a winning move, or to force your opponent
              into a position where they cannot find a valid word.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-yellow-600/20 border-l-4 border-yellow-600">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              <span>Bot Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="bg-muted px-2 py-1 rounded font-mono text-sm">!kaladont</span>
                <span className="text-muted-foreground">Start a new game</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-muted px-2 py-1 rounded font-mono text-sm">!status</span>
                <span className="text-muted-foreground">Show game status</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-muted px-2 py-1 rounded font-mono text-sm">!pravila</span>
                <span className="text-muted-foreground">Show game rules</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-muted px-2 py-1 rounded font-mono text-sm">!krajigre</span>
                <span className="text-muted-foreground">End current game</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-muted px-2 py-1 rounded font-mono text-sm">!help</span>
                <span className="text-muted-foreground">Show help message</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center mt-12 gap-2">
        <p className="text-muted-foreground text-sm">
          Invite the bot to your Discord server by clicking the button below:
        </p>
        <Button className="bg-discord-primary hover:bg-discord-primary/90">
          Add to Discord
        </Button>
        <div className="flex items-center mt-8 text-muted-foreground text-sm">
          <a 
            href="https://github.com/yourusername/discord-kaladont-bot" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
}
