import getLocalCommands from "../../utils/getLocalCommands.mjs";
import getApplicationCommands from "../../utils/getApplicationCommands.mjs"
import areCommandsDifferent from "../../utils/areCommandsDifferent.mjs"

export default async (client) => {
    try {
        const localCommands = await getLocalCommands(); 
        const applicationCommands = await getApplicationCommands(client);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;
            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name);
            if(existingCommand) {
                if(localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id)
                    console.log(`Deleted command ${name}`)
                    continue
                }

                if(await areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, { name, description, options })
                    console.log(`Updated command ${name}`)
                }

            } else {
                await applicationCommands.create({ name, description, options })
                console.log(`Created command ${name}`)
            }
        }
    } catch (error) {
        console.log(`There was an error while registering application commands: ${error}`)
    }
}
