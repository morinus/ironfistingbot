const { SlashCommandBuilder } = require('discord.js');
const challengeConfig = require('../../configs/challenge-config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge-prince')
        .setDescription('Challenge The Prince of Iron Fisting'),
    async execute(interaction) {

        const user = interaction.member.user.id;
        const channel = interaction.guild.channels.cache.get(challengeConfig.reportChallengeChannelID);

        channel.send(`<@&${challengeConfig.princeRoleID}> challenged by <@${user}>.`);
        
        await interaction.reply(`We have a new challenger, it's <@${user}>!`);
    }
}