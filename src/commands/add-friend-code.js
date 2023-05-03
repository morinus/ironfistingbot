const { SlashCommandBuilder } = require('discord.js');
const friendCodesSystem = require('./../systems/friend-codes-system.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-friend-code')
        .setDescription('Adds steam friend code to our database.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('User name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('friend-code')
                .setDescription('Steam Friend Code')
                .setRequired(true)),
    async execute(interaction) {

        const userID = interaction.options.getMentionable('user');
        const friendCode = interaction.options.getString('friend-code');

        friendCodesSystem.saveFriendCodeToDatabase(userID, friendCode);

        await interaction.reply(`${userID}'s Steam Friend Code was added to our database.`);
    }
}