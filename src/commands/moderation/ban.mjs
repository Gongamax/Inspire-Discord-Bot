import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
  
export const deleted = true;
export const name = 'ban';
export const description = 'Bans a member!!!';
export const options = [
    {
        name: 'target-user',
        description: 'The user to ban.',
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
    },
    {
        name: 'reason',
        description: 'The reason for banning.',
        type: ApplicationCommandOptionType.String,
    },
];
export const permissionsRequired = [PermissionFlagsBits.Administrator];
export const botPermissions = [PermissionFlagsBits.Administrator];
export function callback(client, interaction) {
    interaction.reply('ban..');
}