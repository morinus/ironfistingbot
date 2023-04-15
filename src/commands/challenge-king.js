const { SlashCommandBuilder } = require('discord.js');
const challengeConfig = require('../../configs/challenge-config.json');
const challengeService = require('../services/challenge-service.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge-king')
        .setDescription('Challenge The King of Iron Fisting'),
    async execute(interaction) {

        const userNumber = interaction.member.user.id;
        const userId = `<@${String(userNumber)}>`;
        const channel = interaction.guild.channels.cache.get(challengeConfig.reportChallengeChannelID);

        if(!challengeService.spendKingChallenge(userId)) {
            await interaction.reply(`You have already used your King Challenge. Try again next week!`);
            
            return;
        }

        channel.send(`<@&${challengeConfig.kingRoleID}> challenged by ${userId}.`);
        
        await interaction.reply(`We have a new challenger, it's ${userId}!`);
    }
}