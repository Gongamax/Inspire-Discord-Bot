import fetch from 'node-fetch';

export const name = 'qofd';
export const description = 'Replies the quote of the day!';
export const testOnly = false;
export const options = [];
export function callback(client, interaction) {
    getDailyImageQuote().then(quote => interaction.reply(quote))
}

async function getDailyImageQuote() {
    return fetch('https://zenquotes.io/api/image ')
        .then(res => { return res.url })
}