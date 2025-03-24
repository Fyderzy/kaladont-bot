import { Client, GatewayIntentBits, Events, Message, TextChannel } from 'discord.js';
import { GameManager } from './game-manager';
import { handleCommand } from './commands';
import { WordValidator } from './word-validator';
import { log } from '../vite';

export class DiscordBot {
  private client: Client;
  private gameManager: GameManager;
  private wordValidator: WordValidator;
  private token: string;
  private prefix: string = '!';

  constructor() {
    // Initialize the Discord client with required intents
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    // Get Discord bot token from environment variable
    this.token = process.env.DISCORD_BOT_TOKEN || '';
    if (!this.token) {
      log('Discord bot token not found. Bot will not start.', 'discord-bot');
    }

    // Initialize the word validator
    this.wordValidator = new WordValidator();

    // Initialize the game manager with the word validator
    this.gameManager = new GameManager(this.wordValidator);

    // Set up event handlers
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // Handle ready event
    this.client.on(Events.ClientReady, () => {
      log(`Logged in as ${this.client.user?.tag}`, 'discord-bot');
    });

    // Handle message event
    this.client.on(Events.MessageCreate, async (message: Message) => {
      try {
        // Ignore messages from bots
        if (message.author.bot) return;

        // Get channel ID for game tracking
        const channelId = message.channel.id;

        // Handle commands that start with the prefix
        if (message.content.startsWith(this.prefix)) {
          const args = message.content.slice(this.prefix.length).trim().split(/ +/);
          const command = args.shift()?.toLowerCase();
          if (command) {
            await handleCommand(command, message, args, this.gameManager);
          }
          return;
        }

        // If not a command, check if this is a word for an active game
        const activeGame = this.gameManager.getGameByChannelId(channelId);
        if (activeGame) {
          const word = message.content.trim().toLowerCase();
          // Process the word if a game is active
          const result = this.gameManager.processWord(channelId, word, message.author.id, message.author.username);
          
          if (result.valid) {
            if (result.isKaladont) {
              await message.reply({
                content: `🎉 **Kaladont!** Bravo ${message.author.username}! Pobedili ste sa rečju *${word}* koja završava sa "nt"!`,
              });
              
              // End the game
              this.gameManager.endGame(channelId);
            } else {
              await message.reply({
                content: `✅ Reč **${word}** je prihvaćena. Sledeći igrač mora da započne sa: **${result.nextLetters}**`,
              });
            }
          } else if (result.error) {
            await message.reply({
              content: `❌ ${result.error}`,
            });
          }
        }
      } catch (error) {
        log(`Error processing message: ${error}`, 'discord-bot');
      }
    });

    // Handle errors
    this.client.on(Events.Error, (error) => {
      log(`Discord client error: ${error.message}`, 'discord-bot');
    });
  }

  /**
   * Start the Discord bot
   */
  public async start(): Promise<void> {
    if (!this.token) {
      log('Cannot start bot: No token provided', 'discord-bot');
      return;
    }

    try {
      await this.client.login(this.token);
      log('Discord bot started successfully', 'discord-bot');
    } catch (error) {
      log(`Failed to start Discord bot: ${error}`, 'discord-bot');
    }
  }

  /**
   * Get bot status information
   */
  public getStatus() {
    return {
      online: this.client?.isReady() || false,
      guildCount: this.client?.guilds.cache.size || 0,
      activeGames: this.gameManager.getActiveGamesCount(),
    };
  }
}

// Create a singleton instance
const discordBot = new DiscordBot();
export default discordBot;
