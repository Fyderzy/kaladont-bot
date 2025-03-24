import { Message, EmbedBuilder } from 'discord.js';
import { GameManager } from './game-manager';

/**
 * Handles bot commands
 */
export async function handleCommand(
  command: string,
  message: Message,
  args: string[],
  gameManager: GameManager
): Promise<void> {
  const channelId = message.channel.id;

  switch (command) {
    case 'kaladont':
      await handleKaladontCommand(message, gameManager);
      break;
    
    case 'status':
      await handleStatusCommand(message, gameManager);
      break;
    
    case 'pravila':
      await handleRulesCommand(message);
      break;
    
    case 'krajigre':
      await handleEndGameCommand(message, gameManager);
      break;
    
    case 'help':
      await handleHelpCommand(message);
      break;
    
    default:
      // Unknown command, just ignore it
      break;
  }
}

/**
 * Handle the kaladont command to start a new game
 */
async function handleKaladontCommand(message: Message, gameManager: GameManager): Promise<void> {
  const channelId = message.channel.id;
  
  // Check if a game is already active in this channel
  if (gameManager.isGameActive(channelId)) {
    await message.reply('Igra je već aktivna u ovom kanalu! Koristite `!status` da vidite trenutno stanje igre ili `!krajigre` da završite trenutnu igru.');
    return;
  }
  
  // Start a new game
  const game = gameManager.startGame(channelId);
  
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎮 Nova igra Kaladonta je započeta!')
    .setDescription(`Igra počinje rečju: **${game.currentWord}**\n\nSledeći igrač mora napisati reč koja počinje sa: **${game.nextLetters}**`)
    .addFields({
      name: 'Pravila igre:',
      value: `• Svaka nova reč mora početi sa poslednja dva slova prethodne reči
• Reči moraju biti iz srpskog jezika
• Reč koja završava na "nt" označava pobednika (Kaladont!)
• Ne možete koristiti reči koje su već upotrebljene`
    });
  
  await message.reply({ embeds: [embed] });
}

/**
 * Handle the status command to show the current game status
 */
async function handleStatusCommand(message: Message, gameManager: GameManager): Promise<void> {
  const channelId = message.channel.id;
  
  // Check if a game is active
  if (!gameManager.isGameActive(channelId)) {
    await message.reply('Trenutno nema aktivne igre u ovom kanalu. Koristite `!kaladont` da započnete novu igru.');
    return;
  }
  
  const game = gameManager.getGameByChannelId(channelId);
  if (!game) return;
  
  // Create a list of played words
  let playedWordsText = '';
  if (game.playedWords.length > 0) {
    playedWordsText = game.playedWords.map((wordInfo, index) => 
      `${index + 1}. **${wordInfo.word}** (${wordInfo.playerName})`
    ).join('\n');
  } else {
    playedWordsText = 'Još uvek nema odigranih reči.';
  }
  
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📋 Status igre')
    .setDescription(`Trenutna igra: **Aktivna**\nSledeća dva slova: **${game.nextLetters}**`)
    .addFields(
      { name: 'Trenutna reč:', value: game.currentWord, inline: true },
      { name: 'Broj poteza:', value: String(game.playedWords.length), inline: true },
      { name: 'Odigrane reči:', value: playedWordsText }
    );
  
  await message.reply({ embeds: [embed] });
}

/**
 * Handle the rules command to display game rules
 */
async function handleRulesCommand(message: Message): Promise<void> {
  const embed = new EmbedBuilder()
    .setColor('#FAA61A')
    .setTitle('📚 Pravila Kaladont igre')
    .setDescription('Kaladont je tradicionalna igra reči popularna u Srbiji i regionu Balkana.')
    .addFields(
      { 
        name: 'Osnovna pravila:', 
        value: `• Igrač kaže reč, a sledeći igrač mora reći reč koja počinje sa poslednja dva slova prethodne reči.
• Npr. ako je prva reč "**lopta**", sledeća reč mora početi sa "**ta**" (npr. "**tanjir**").
• Sledeći igrač mora reći reč koja počinje sa "**ir**".
• Igra se nastavlja dok neki igrač ne uspe reći reč koja se završava na "**nt**" (Kaladont).
• Igrač koji kaže reč koja se završava na "**nt**" je pobednik.
• Sve reči moraju biti iz srpskog jezika.
• Nije dozvoljeno ponavljanje reči koje su već upotrebljene u igri.`
      }
    );
  
  await message.reply({ embeds: [embed] });
}

/**
 * Handle the end game command to terminate the current game
 */
async function handleEndGameCommand(message: Message, gameManager: GameManager): Promise<void> {
  const channelId = message.channel.id;
  
  // Check if a game is active
  if (!gameManager.isGameActive(channelId)) {
    await message.reply('Nema aktivne igre koju je moguće prekinuti.');
    return;
  }
  
  // End the game
  gameManager.endGame(channelId);
  
  await message.reply('Igra je prekinuta. Koristite `!kaladont` da započnete novu igru.');
}

/**
 * Handle the help command to show available commands
 */
async function handleHelpCommand(message: Message): Promise<void> {
  const embed = new EmbedBuilder()
    .setColor('#FAA61A')
    .setTitle('📚 Pomoć za Kaladont Bot')
    .setDescription('Dostupne komande:')
    .addFields(
      { name: '!kaladont', value: 'Započinje novu igru Kaladonta', inline: false },
      { name: '!status', value: 'Prikazuje trenutno stanje igre', inline: false },
      { name: '!pravila', value: 'Prikazuje pravila igre', inline: false },
      { name: '!krajigre', value: 'Prekida trenutnu igru', inline: false },
      { name: '!help', value: 'Prikazuje ovu poruku', inline: false }
    )
    .setFooter({ text: 'Tokom igre, jednostavno kucajte reči (bez prefiksa) koje počinju sa zadnja dva slova prethodne reči.' });
  
  await message.reply({ embeds: [embed] });
}
