const { SlashCommandBuilder } = require('discord.js');
//const challengeConfig = require('../../configs/challenge-config.json');
const challengeConfig = require('../../configs/test-challenge-config.json');
const challengeSystem = require('../systems/challenge-system.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge-dream-team')
        .addMentionableOption(option =>
            option.setName('partner')
            .setDescription('Partner')
            .setRequired(true))
        .setDescription('Challenge the current holders of The Dream Team of Iron Fisting'),
    async execute(interaction) {

        const userNumber = interaction.member.user.id;
        const userID = `<@${String(userNumber)}>`;
        const partnerNumber = interaction.options.getMentionable('partner').id;
        const partnerID = `<@${String(partnerNumber)}>`;
        const channel = interaction.guild.channels.cache.get(challengeConfig.tekkenChallengesChannelID);

        var canChallenge = challengeSystem.challengeDreamTeam(userID, partnerID);
        if(!canChallenge) {

            await interaction.reply(`Your or your teammate have already challenged The Dream Team. Try again next week!`);
        }
        else {

            channel.send(`<@&${challengeConfig.dreamTeamRoleID}> challenged by ${userID} & ${partnerID}.`);

            await interaction.reply(`We have new challengers, they're ${userID} & ${partnerID}!`);
        }
    }
}
