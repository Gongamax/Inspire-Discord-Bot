import { REST } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.CLIENT_ID;
const token = process.env.DISCORD_TOKEN;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started deleting all application (/) commands.');

    // Fetch the existing commands first
    const existingCommands = await rest.get(`/applications/${clientId}/commands`);

    // Delete each command one by one
    for (const command of existingCommands) {
      await rest.delete(`/applications/${clientId}/commands/${command.id}`);
    }

    console.log('Successfully deleted all application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
