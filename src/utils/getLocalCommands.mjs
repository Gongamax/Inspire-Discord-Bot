import getAllFiles from './getAllFiles.mjs';
import path from 'path'
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url'
import { createRequire } from 'module'
const { resolve } = createRequire(import.meta.url)


export default async (exceptions = []) => {
    let localCommands = []

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const commandCategories = getAllFiles(path.join(__dirname, '..', 'commands'), true)

    for(const commandCat  of commandCategories) {
        const commandFiles = getAllFiles(commandCat)
        for(const commandFile of commandFiles) {
            const resolvePath = pathToFileURL(resolve(commandFile)).toString()
            const command = await import(resolvePath)
            if(exceptions.includes(command.name)) {
                continue
            } 
            localCommands.push(command)
        }
    }

    return localCommands
}