const { SlashCommandBuilder } = require('discord.js');
const challengeConfig = require('../../configs/challenge-config.json');
//const challengeConfig = require('../../configs/test-challenge-config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report-team-challenge-results')
        .setDescription('Report Dream Team challenge results')
        .addMentionableOption(option =>
            option.setName('player1')
                .setDescription('Team A Player 1')
                .setRequired(true))
        .addMentionableOption(option =>
            option.setName('player2')
                .setDescription('Team A Player 2')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('teama-score')
                .setDescription('Score')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('teamb-score')
                .setDescription('Score')
                .setRequired(true))
        .addMentionableOption(option =>
            option.setName('opponent1')
                .setDescription('Team B Player 1')
                .setRequired(true))
        .addMentionableOption(option =>
            option.setName('opponent2')
                .setDescription('Team B Player 2')
                .setRequired(true)),
    async execute(interaction) {

        const channel = interaction.guild.channels.cache.get(challengeConfig.tekkenChallengesChannelID);
        const player1 = interaction.options.getMentionable('player1');
        const player2 = interaction.options.getMentionable('player2');
        const opponent1 = interaction.options.getMentionable('opponent1');
        const opponent2 = interaction.options.getMentionable('opponent2');
        var teamAScore = interaction.options.getInteger('teama-score');
        var teamBScore = interaction.options.getInteger('teamb-score');

        const role = interaction.guild.roles.cache.find(role => role.id == challengeConfig.dreamTeamRoleID);
        const membersWithRole = interaction.guild.members.cache.filter(member => member.roles.cache.has(role.id));
        membersWithRole.forEach(member => {
            member.roles.remove(challengeConfig.dreamTeamRoleID);
        });

        if(teamAScore > teamBScore) {
            teamAScore = `**${teamAScore}**`;

            const playerA = await interaction.guild.members.fetch(player1);
            const playerB = await interaction.guild.members.fetch(player2);

            playerA.roles.add(challengeConfig.dreamTeamRoleID);
            playerB.roles.add(challengeConfig.dreamTeamRoleID);
        } 
        else {
            teamBScore = `**${teamBScore}**`;

            const playerC = await interaction.guild.members.fetch(opponent1);
            const playerD = await interaction.guild.members.fetch(opponent2);

            playerC.roles.add(challengeConfig.dreamTeamRoleID);
            playerD.roles.add(challengeConfig.dreamTeamRoleID);
        }

        channel.send(`${player1} & ${player2} ${teamAScore} - ${teamBScore} ${opponent1} & ${opponent2}`);
        
        await interaction.reply(`Results successfully reported!`);
    }
}