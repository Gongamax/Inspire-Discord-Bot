import {Client, GatewayIntentBits} from 'discord.js';
import dotenv from 'dotenv'
import eventHandler from './handlers/event-handler.mjs'

dotenv.config()

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

eventHandler(client)

client.login(process.env.DISCORD_TOKEN);
