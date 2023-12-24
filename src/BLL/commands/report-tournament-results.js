const { SlashCommandBuilder } = require('discord.js');
const challengeConfig = require('../../../configs/challenge-config.json');
const playerRepository = require('../../DLL/repositories/player-repository.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report-tournament-results')
        .setDescription('Report tournament results')
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

        // Get data
        const channel = interaction.guild.channels.cache.get(challengeConfig.tekkenChallengesChannelID);
        const player = interaction.options.getMentionable('player');
        const opponent = interaction.options.getMentionable('opponent');
        var playersCharacter = interaction.options.getString('character');
        var opponentCharacter = interaction.options.getString('opponents-character');
        var playerScore = interaction.options.getInteger('score');
        var opponentScore = interaction.options.getInteger('opponent-score');

        var playerData = await playerRepository.getPlayer(player.user.id);
        var opponentData = await playerRepository.getPlayer(opponent.user.id);

        // Validate players are in the database
        const validatePlayersExist = playerData != null &&  opponentData != null;
        if(!validatePlayersExist) {

            return;
        }

        // Add scores
        if(playerScore > opponentScore) {

            playerScore = `**${playerScore}**`;
            playerData.score += 6;
            opponentData.score += opponentScore;

        } else {

            opponentScore = `**${opponentScore}**`;
            playerData.score += playerScore;
            opponentData.score += 6;
        }

        await playerRepository.updatePlayer(playerData);
        await playerRepository.updatePlayer(opponentData);

        // Send message to channel
        playersCharacter = formatCharacterNameString(playersCharacter);
        opponentCharacter = formatCharacterNameString(opponentCharacter);

        channel.send(`${player} (${playersCharacter}) ${playerScore} - ${opponentScore} ${opponent} (${opponentCharacter})`);
        
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