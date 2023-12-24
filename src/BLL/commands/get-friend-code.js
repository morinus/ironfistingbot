const { SlashCommandBuilder } = require('discord.js');
const friendCodesSystem = require('./../../BLL/systems/friend-codes-system.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-friend-code')
        .setDescription('Gets steam friend code to from our database.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('User name')
                .setRequired(true)),
    async execute(interaction) {

        const userID = interaction.options.getMentionable('user');
        const steamCode = friendCodesSystem.getFriendCodeByUserID(userID);

        if(steamCode != 0) {

            await interaction.reply(`${userID}'s Steam Friend Code is: **${steamCode}**`);
        } 
        else {

            await interaction.reply(`${userID} was not found in our database.`);
        }
    }
}