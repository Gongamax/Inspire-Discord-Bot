import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv'

dotenv.config()

const commands = [
    {
        name: 'ping',
        description: 'Replies with pong!'
    },
    {
        name: 'inspire',
        description: 'Replies with an inspirational quote!'
    },
    {
        name: 'daily',
        description: 'Replies with an inspirational quote!'
    },
    {
        name : 'hello',
        description : 'Replies with hello!'
    }
]

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => { 
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body : commands }
        )

        console.log('Successfully registered application commands.')
    } catch(e) {
        console.error(e)
    }
})();
