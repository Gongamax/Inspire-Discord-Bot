import Discord from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv'
import eventHandler from './handlers/event-handler.mjs'

dotenv.config()

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds, 
		Discord.GatewayIntentBits.GuildMembers,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent
	]
});

// const status = [
// 	{
// 		name : 'with your heart',
// 		type : 'PLAYING'
// 	},
// 	{
// 		name : 'with your mind',
// 		type : 'WATCHING'
// 	},
// 	{
// 		name : 'Living the best life',
// 		type : 'STREAMING',
// 		url : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
// 	}
// ]

// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}!`)
	
// 	setInterval(() => {
// 		let random = Math.floor(Math.random() * status.length);
// 		client.user.setActivity(status[random]);
// 	}, 10000);
// });

eventHandler(client)

client.login(process.env.DISCORD_TOKEN);
