const { SlashCommandBuilder } = require('discord.js');
const playerRepository = require('../../DLL/repositories/player-repository.js');
const challengeConfig = require('../../../configs/challenge-config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show-leaderboard')
        .setDescription('Show current tournament leaderboard.'),
    async execute(interaction) {

        let leaderboardMessage = "";
        leaderboardMessage += "**LEADERBOARD:**\n"

        const players = await playerRepository.getAllPlayers();
        players.sort((a, b) => b.score - a.score);

        var count = 0;
        players.forEach(player => {
    
            count++;

            leaderboardMessage += `\n${count}. ${player.username} - **${player.score}**`;
        });


        await interaction.reply(leaderboardMessage);
    }
}