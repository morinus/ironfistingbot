const { SlashCommandBuilder } = require('discord.js');
const challengeConfig = require('../../configs/challenge-config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report-results')
        .setDescription('Report challenge results')
        .addMentionableOption(option =>
            option.setName('player')
                .setDescription('Player name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('character')
                .setDescription('Character Name')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('score')
                .setDescription('Score')
                .setRequired(true))
        .addMentionableOption(option =>
            option.setName('opponent')
                .setDescription('Opponent name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('opponents-character')
                .setDescription('Character Name')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('opponent-score')
                .setDescription('Score')
                .setRequired(true))
        .addMentionableOption(option =>
            option.setName('winner-name')
                .setDescription('Winner name')
                .setRequired(true)),
    async execute(interaction) {

        const channel = interaction.guild.channels.cache.get(challengeConfig.reportChallengeChannelID);
        const playerName = interaction.options.getMentionable('player');
        var playersCharacter = interaction.options.getString('character');
        var playerScore = interaction.options.getInteger('score');
        const opponentName = interaction.options.getMentionable('opponent');
        var opponentCharacter = interaction.options.getString('opponents-character');
        var opponentScore = interaction.options.getInteger('opponent-score');
        const winnerName = interaction.options.getMentionable('winner-name');

        if(winnerName == playerName) {
            playerScore = `**${playerScore}**`;
        } 
        else {
            opponentScore = `**${opponentScore}**`;
        }

        playersCharacter = formatCharacterString(playersCharacter);
        opponentCharacter = formatCharacterString(opponentCharacter);

        channel.send(`${playerName} (${playersCharacter}) ${playerScore} - ${opponentScore} ${opponentName} (${opponentCharacter})`);
        
        await interaction.reply(`Results successfully reported!`);
    }
}

function formatCharacterString(characterName) {
    var formattedCharacterName = characterName.toLowerCase();
    formattedCharacterString = formattedCharacterName.charAt(0).toUpperCase() + formattedCharacterName.slice(1)

    return formattedCharacterString;
}