import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import readline from 'readline';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.resolve(__dirname, '../server/config/bot-config.json');

/**
 * Ažurira token bota u konfiguracionom fajlu
 */
async function setBotToken() {
  try {
    // Proveri da li konfiguracioni fajl postoji
    if (!fs.existsSync(configPath)) {
      console.log('Konfiguracioni fajl ne postoji. Kreiranje novog...');
      fs.writeFileSync(configPath, JSON.stringify({ token: 'DISCORD_BOT_TOKEN' }, null, 2), 'utf8');
    }
    
    // Pročitaj trenutnu konfiguraciju
    const configData = fs.readFileSync(configPath, 'utf8');
    let config = JSON.parse(configData);
    
    console.log('Trenutni status tokena: ' + (config.token !== 'DISCORD_BOT_TOKEN' ? 'Postavljen' : 'Nije postavljen'));
    
    // Zatraži novi token od korisnika
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const token = await new Promise((resolve) => {
      rl.question('Unesite novi Discord Bot token (ili pritisnite Enter da zadržite trenutni): ', (answer) => {
        resolve(answer.trim());
      });
    });
    
    rl.close();
    
    // Ažuriraj token samo ako je nešto uneto
    if (token) {
      config.token = token;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
      console.log('Token je uspešno ažuriran u konfiguracionom fajlu.');
      console.log('Da bi se promene primenile, potrebno je restartovati bot.');
    } else {
      console.log('Token nije promenjen.');
    }
    
  } catch (error) {
    console.error(`Greška pri postavljanju tokena: ${error}`);
  }
}

// Pozovi funkciju
setBotToken();