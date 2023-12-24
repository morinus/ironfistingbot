const { SlashCommandBuilder } = require('discord.js');
const economySystem = require('../../BLL/systems/economy-system.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-points')
        .setDescription('Adds the amount of points the user.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('User name')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('points')
                .setDescription('Points to add')
                .setRequired(true)),
    async execute(interaction) {

        const userId = interaction.options.getMentionable('user');
        const points = interaction.options.getInteger('points');
        const totalPoints = economySystem.addPointsToUserId(userId, points);

        await interaction.reply(`${userId} was given **${points}** points and now has a total of **${totalPoints}** points!`);
    }
}