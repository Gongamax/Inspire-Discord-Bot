import getAllFiles from '../utils/getAllFiles.mjs';
import path from 'path'
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url'
import { createRequire } from 'module'
const { resolve } = createRequire(import.meta.url)

export default (client) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true)
  
  for (const eventFolder of eventFolders) {
      const eventFiles = getAllFiles(eventFolder);
      eventFiles.sort((a, b) => a > b);
  
      const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
  
      client.on(eventName, async (arg) => {
        for (const eventFile of eventFiles) {
          const resolvePath = pathToFileURL(resolve(eventFile)).toString()
          const eventFunction = await import(resolvePath).then((module) => module.default)
          await eventFunction(client, arg);
        }
      });
  } 
}