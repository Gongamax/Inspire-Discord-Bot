export default (client) => {
    console.log(`Logged in as ${client.user.tag}!`)

    const status = [
        {
            name : 'with your heart',
            type : 'PLAYING'
        },
        {
            name : 'with your mind',
            type : 'WATCHING'
        },
        {
            name : 'Living the best life',
            type : 'STREAMING',
            url : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
    ]

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
	}, 10000);
}