const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');
const challengeConfig = require('../../configs/challenge-config.json');
//const challengeConfig = require('../../configs/test-challenge-config.json');
const challengeSystem = require('../systems/challenge-system.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('withdraw-challenge')
        .addStringOption(new SlashCommandStringOption()
            .setName('role')
            .setDescription('Challenge role')
            .setRequired(true)
            .addChoices(
                { name: 'King', value: challengeConfig.kingRoleID },
                { name: 'Prince', value: challengeConfig.princeRoleID },
                { name: 'Mokujin', value: challengeConfig.mokujinRoleID },
                { name: 'Dream Team', value: challengeConfig.dreamTeamRoleID },
            )
        )
        .setDescription('Withdraw from the challenge'),
    async execute(interaction) {

        const userNumber = interaction.member.user.id;
        const userID = `<@${String(userNumber)}>`;
        const role = interaction.options.getString('role');

        challengeSystem.withdrawFromChallenge(userID, role);

        const validRoles = [challengeConfig.kingRoleID, challengeConfig.princeRoleID, challengeConfig.mokujinRoleID, challengeConfig.dreamTeamRoleID];
        if(!validRoles.includes(role)) {

            await interaction.reply(`Oops, looks like you typed invalid role. Please try again!`);
        }
        else {

            await interaction.reply(`You've withdrawn from the challenge!`);
        }
    }
}
