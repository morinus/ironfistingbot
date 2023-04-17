const { SlashCommandBuilder } = require('discord.js');
const challengeSystem = require('../systems/challenge-system.js');

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
        const challengeData = challengeSystem.getChallengesRemainingByUserId(userId);
        const princeChallengesLeftMessage = (challengeData.princeChallengesRemaining > 0) ? "Prince Challenge\n" : "";
        const kingChallengesLeftMessage = (challengeData.kingChallengesRemaining > 0) ? "King Challenge\n" : "";

        await interaction.reply(`${userId} challenges remaining:\n${kingChallengesLeftMessage}${princeChallengesLeftMessage}`);
    }
}