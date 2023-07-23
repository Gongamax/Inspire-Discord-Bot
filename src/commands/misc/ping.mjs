export const name = 'ping';
export const description = 'Replies with the bot ping!';
export const testOnly = false;
export const options = [];

export async function callback (client, interaction){
  await interaction.deferReply();

  const reply = await interaction.fetchReply();

  const ping = reply.createdTimestamp - interaction.createdTimestamp;

  interaction.editReply(
    `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
  );
}
