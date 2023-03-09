const { SlashCommandBuilder } = require('discord.js');
const economyService = require('../services/economy-service.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show-points')
        .setDescription('Shows the amount of points the user has.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('User name')
                .setRequired(true)),
    async execute(interaction) {

        const userId = interaction.options.getMentionable('user');
        const points = economyService.getPointsByUserId(userId);

        await interaction.reply(`${userId} has **${points}** points!`);
    }
}