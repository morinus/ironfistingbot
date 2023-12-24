const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');
const challengeConfig = require('../../../configs/challenge-config.json');
const challengeSystem = require('../../BLL/systems/challenge-system.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge')
        .addStringOption(new SlashCommandStringOption()
            .setName('role')
            .setDescription('Challenge Role')
            .setRequired(true)
            .addChoices(
                { name: 'King', value: challengeConfig.kingRoleID },
                { name: 'Prince', value: challengeConfig.princeRoleID },
                { name: 'Mokujin', value: challengeConfig.mokujinRoleID },
            )
        )
        .setDescription('Challenge the current holder of the title'),
    async execute(interaction) {

        const userNumber = interaction.member.user.id;
        const userID = `<@${String(userNumber)}>`;
        const channel = interaction.guild.channels.cache.get(challengeConfig.tekkenChallengesChannelID);
        const role = interaction.options.getString('role');

        const validRoles = [challengeConfig.kingRoleID, challengeConfig.princeRoleID, challengeConfig.mokujinRoleID];
        if(!validRoles.includes(role)) {

            await interaction.reply(`Oops, looks like you typed invalid role. Please try again!`);
        }

        var canChallenge = challengeSystem.challengeRole(userID, role);
        if(!canChallenge) {

            await interaction.reply(`You can only challenge each role once per week. Try again next week!`);
        } 
        else {

            channel.send(`<@&${role}> challenged by ${userID}.`);

            await interaction.reply(`We have a new challenger, it's ${userID}!`);
        }
    }
}
