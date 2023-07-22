import getAllFiles from "./utils/getAllFiles.mjs"

export default (client) => {
    const eventFolders = getAllFiles('./src/events', true)
    
    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => a > b);
    
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
    
        client.on(eventName, async (arg) => {
          for (const eventFile of eventFiles) {
            const eventFunction = require(eventFile);
            await eventFunction(client, arg);
          }
        });
    }
}