const { SlashCommandBuilder } = require('discord.js');
const challengeConfig = require('../../configs/challenge-config.json');
const challengeService = require('../services/challenge-service.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge-prince')
        .setDescription('Challenge The Prince of Iron Fisting'),
    async execute(interaction) {

        const userId = interaction.member.user.id;
        const channel = interaction.guild.channels.cache.get(challengeConfig.testReportingChallengeChannelID);
        const challengesLeft = challengeService.getPrinceChallengesRemainingByUserId(userId);

        if(challengesLeft == 0) {
            await interaction.reply(`You have already used your Prince Challenge. Try again next week!`);
            
            return;
        }

        challengeService.spendPrinceChallenge(userId);

        channel.send(`<@&${challengeConfig.testingPrinceRoleID}> challenged by <@${userId}>.`);
        
        await interaction.reply(`We have a new challenger, it's <@${userId}>!`);
    }
}