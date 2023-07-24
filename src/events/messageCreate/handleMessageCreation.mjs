import { getQuote }  from "../../commands/misc/inspirational.mjs"
import Encouragement from "../../model/Encouragement.mjs"

export default async (client, msg) => {
    if (msg.author.bot) return;
  
    const commands = {
        inspire: sendQuote,
        new: updateEncouragements,
        del: deleteEncouragement,
        list: showEncouragements,
    };
  
    const prefix = '--'; 
    const sadWords = ["sad", "depressed", "unhappy", "angry"]
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command in commands) {
        commands[command](msg, args);
    }

    if (sadWords.some(word => msg.content.includes(word))) {
        Encouragement.find().then(encouragements => {
            if (encouragements.length > 0) {
              // Select a random encouraging message
              const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        
              // Send the encouraging message to the same channel where the sad message was sent
              msg.channel.send(encouragement.message);
            } else {
              // Respond with a default encouraging message if there are no stored encouragements
              msg.channel.send("Cheer up! You are not alone.");
            }
          }).catch(err => {
            console.error(err);
            msg.channel.send("Oops! Something went wrong while fetching encouraging messages.");
        });
    }

    function sendQuote(){
        if (msg.content.startsWith(prefix)) {
            if (args.length === 0) {
                // If no user is specified, respond to the original author
                getQuote().then((quote) => {
                msg.channel.send(quote);
                });
            } else {
                // Extract the user mentioned in the command
                const user = args[0].replace(/[<!@>]/g, ''); // Remove any mention characters
                // Send an inspiring quote directed at the specified user
                getQuoteForUser(`<@${user}>`).then((quote) => {
                    msg.channel.send(quote);
                });
            }
        }
    }

    async function getQuoteForUser(user) {
        const quote = await getQuote();
        return `${user} ${quote}`;
    }
  
    function showEncouragements(msg) {
        Encouragement.find().then((encouragements) => {
            const messages = encouragements.map((encouragement) => encouragement.message);
            msg.channel.send(messages.join('\n'));
        });
    }
    
    function updateEncouragements(msg, args) {
        const encouragingMessage = args.join(' ');
    
        const newEncouragement = new Encouragement({ message: encouragingMessage });
        newEncouragement.save().then(() => {
            msg.channel.send('New encouraging message added.');
        });
    }
  
    function deleteEncouragement(msg, args) {
        const index = parseInt(args[0]);
    
        Encouragement.find()
            .then((encouragements) => {
                if (encouragements.length > index) {
                    return Encouragement.findByIdAndDelete(encouragements[index]._id);
                } else {
                    throw new Error('Invalid index.');
                }
            })
            .then(() => {
                msg.channel.send('Encouraging message deleted.');
            })
            .catch((err) => {
                console.error(err);
                msg.channel.send('An error occurred. Please check the index and try again.');
            });
    }
}