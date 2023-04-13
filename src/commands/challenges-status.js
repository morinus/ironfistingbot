const { SlashCommandBuilder } = require('discord.js');
const challengeService = require('../services/challenge-service.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show-challenge-status')
        .setDescription('Shows the amount of challenges the user has.')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('User name')
                .setRequired(true)),
    async execute(interaction) {

        const userId = interaction.options.getMentionable('user');
        const princeChallengesLeft = challengeService.getPrinceChallengesRemainingByUserId(userId);
        const kingChallengesLeft = challengeService.getKingChallengesRemainingByUserId(userId);
        const princeChallengesLeftMessage = (princeChallengesLeft > 0) ? "Prince Challenge\n" : "";
        const kingChallengesLeftMessage = (kingChallengesLeft > 0) ? "King Challenge\n" : "";

        await interaction.reply(`${userId} challenges remaining:\n${kingChallengesLeftMessage}${princeChallengesLeftMessage}`);
    }
}