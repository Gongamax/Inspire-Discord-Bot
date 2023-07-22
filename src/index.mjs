import Discord from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv'

dotenv.config()
const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds, 
		Discord.GatewayIntentBits.GuildMembers,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent
	]
});

async function getQuote() {
    return fetch('https://zenquotes.io/api/random')
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}	

async function getDailyImageQuote() {
    return fetch('https://zenquotes.io/api/image ')
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

eventHandler(client)

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
	client.user.setActivity('Keep trying!'); //, { type: 'PLAYING' }

	const ping = new Discord.SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with pong!');

	const inspire = new Discord.SlashCommandBuilder()
	.setName('inspire')
	.setDescription('Replies with an inspirational quote!');

	client.application.commands.create(ping);
	client.application.commands.create(inspire);
});

client.on('messageCreate', (msg) => {
	if (msg.author.bot) return;	
    if (msg.content === 'hello') {
        //getQuote().then(quote => msg.channel.send(quote))
		msg.reply('Hello!');
    } else if (msg.content === 'inspire me') {
		getQuote().then(quote => msg.reply(quote))
	}
})



client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	if (interaction.commandName === 'inspire') {
		getQuote().then(quote => interaction.reply(quote))
	}
})

client.login(process.env.DISCORD_TOKEN);
