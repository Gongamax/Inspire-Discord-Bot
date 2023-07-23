import { ActivityType } from 'discord.js'

export default async (client) => {
    const status = [
        {
            name : 'with your heart',
            type : ActivityType.Playing
        },
        {
            name : 'with your mind',
            type : ActivityType.Watching
        },
        {
            name : 'Living the best life',
            type : ActivityType.Streaming,
            url : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
    ]

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
	}, 50000);
}