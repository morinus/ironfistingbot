const { SlashCommandBuilder } = require('discord.js');
const tournamentSystem = require('../systems/tournament-system.js');
const challengeConfig = require('../../../configs/challenge-config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-tournament-matches')
        .setDescription('Creates new tournament matches.'),
    async execute(interaction) {

        const matches = await tournamentSystem.createMatches();
        const channel = interaction.guild.channels.cache.get(challengeConfig.tekkenChallengesChannelID);

        let matchesMessage = "";

        matchesMessage += "@here Welcome to this week's matchups: \n"

        matches.forEach(match => {
            
            matchesMessage += "\n";
            matchesMessage += "**" + match.player1.username + "**";
            matchesMessage += " ---VS--- ";
            matchesMessage += "**" + match.player2.username + "**";
        });

        matchesMessage += "\n\n";
        matchesMessage += "If you don't have a matchup, it means the system has automatically granted you a win (BYE).";

        channel.send(matchesMessage);
    }
}