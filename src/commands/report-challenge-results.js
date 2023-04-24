const { SlashCommandBuilder } = require('discord.js');
const challengeConfig = require('../../configs/challenge-config.json')
//const challengeConfig = require('../../configs/test-challenge-config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report-challenge-results')
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
                .setRequired(true))
        .addStringOption(option =>
            option.setName('challenge-type')
                .setDescription('Challenge Type')
                .setRequired(true)
                .addChoices(
                    { name: 'King', value: challengeConfig.kingRoleID },
                    { name: 'Prince', value: challengeConfig.princeRoleID },
                    { name: 'Mokujin', value: challengeConfig.mokujinRoleID },
                )),
    async execute(interaction) {

        const channel = interaction.guild.channels.cache.get(challengeConfig.tekkenChallengesChannelID);
        const player = interaction.options.getMentionable('player');
        const opponent = interaction.options.getMentionable('opponent');
        var playersCharacter = interaction.options.getString('character');
        var opponentCharacter = interaction.options.getString('opponents-character');
        var playerScore = interaction.options.getInteger('score');
        var opponentScore = interaction.options.getInteger('opponent-score');
        const challengeRole = interaction.options.getString('challenge-type');

        const role = interaction.guild.roles.cache.find(role => role.id == challengeRole);
        const membersWithRole = interaction.guild.members.cache.filter(member => member.roles.cache.has(role.id));
        membersWithRole.forEach(member => {
            member.roles.remove(challengeRole);
        });

        if(playerScore > opponentScore) {
            playerScore = `**${playerScore}**`;

            interaction.member.roles.add(challengeRole);
        } 
        else {
            opponentScore = `**${opponentScore}**`;

            const member = await interaction.guild.members.fetch(opponent);
            member.roles.add(challengeRole);
        }

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