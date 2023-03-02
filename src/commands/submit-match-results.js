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
        .addIntegerOption(option =>
            option.setName('opponent-score')
                .setDescription('Score')
                .setRequired(true))
        .addMentionableOption(option =>
            option.setName('opponent')
                .setDescription('Opponent name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('opponents-character')
                .setDescription('Character Name')
                .setRequired(true)),
    async execute(interaction) {

        var channel = interaction.guild.channels.cache.get(challengeConfig.reportChallengeChannelID);
        var playerName = interaction.options.getMentionable('player');
        var opponentName = interaction.options.getMentionable('opponent');
        var playersCharacter = interaction.options.getString('character');
        var opponentCharacter = interaction.options.getString('opponents-character');
        var playerScore = interaction.options.getInteger('score');
        var opponentScore = interaction.options.getInteger('opponent-score');

        if(playerScore > opponentScore) {
            playerScore = `**${playerScore}**`;
        } 
        else {
            opponentScore = `**${opponentScore}**`;
        }

        playersCharacter = formatCharacterNameString(playersCharacter);
        opponentCharacter = formatCharacterNameString(opponentCharacter);

        channel.send(`${playerName} (${playersCharacter}) ${playerScore} - ${opponentScore} ${opponentName} (${opponentCharacter})`);
        
        await interaction.reply(`Results successfully reported!`);
    }
}

function formatCharacterNameString(characterName) {
    let formattedName;
    formattedName = characterName.toLowerCase();
    formattedName = characterName.charAt(0).toUpperCase() + formattedName.slice(1);

    return formattedName;
}

module.exports.formatCharacterNameString = formatCharacterNameString;