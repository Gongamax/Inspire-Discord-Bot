import {Client, GatewayIntentBits} from 'discord.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import eventHandler from './handlers/event-handler.mjs'
import keepAlive from './server.mjs';

dotenv.config()

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

(async () => {
	mongoose.set('strictQuery', false)
	await mongoose.connect(process.env.MONGO_URI, { keepAlive: true })
	console.log('Connected to MongoDB')
	eventHandler(client)
})()

keepAlive()
client.login(process.env.DISCORD_TOKEN);
