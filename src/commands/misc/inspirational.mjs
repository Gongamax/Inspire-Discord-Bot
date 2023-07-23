import fetch from 'node-fetch';

export const name = 'inspirational';
export const description = 'Replies with an inspirational quote!';
export const testOnly = false;
export const options = [];
export function callback(client, interaction) {
    getQuote().then(quote => interaction.reply(quote))
}

async function getQuote() {
    return fetch('https://zenquotes.io/api/random')
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

