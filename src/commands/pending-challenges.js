const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');
const challengeConfig = require('../../configs/challenge-config.json');
//const challengeConfig = require('../../configs/test-challenge-config.json');
const challengeSystem = require('../systems/challenge-system.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pending-challenges')
        .addStringOption(new SlashCommandStringOption()
            .setName('role')
            .setDescription('Challenge Role')
            .setRequired(true)
            .addChoices(
                { name: 'King', value: challengeConfig.kingRoleID },
                { name: 'Prince', value: challengeConfig.princeRoleID },
                { name: 'Mokujin', value: challengeConfig.mokujinRoleID },
                { name: 'Dream Team', value: challengeConfig.dreamTeamRoleID },
            )
        )
        .setDescription('See the pending challenges for the given title'),
    async execute(interaction) {

        const role = interaction.options.getString('role');
        const challengers = challengeSystem.getPendingChallengers(role);
        const validRoles = [challengeConfig.kingRoleID, challengeConfig.princeRoleID, challengeConfig.mokujinRoleID, challengeConfig.dreamTeamRoleID];
        if(!validRoles.includes(role)) {

            await interaction.reply(`Oops, looks like you typed invalid role. Please try again!`);
        } else {

            if(challengers.length != 0) {

                const formattedChallengersString = formatChallengersBasedOnRoleID(challengers, role);

                await interaction.reply(`Pending challengers for the role <@&${role}> are:\n${formattedChallengersString}`);    
            }
            else {

                await interaction.reply(`There are no pending challengers for <@&${role}>.`);
            }
        }
    }
}

function formatChallengersBasedOnRoleID(challengers, roleID) {

    switch(roleID) {

        case challengeConfig.kingRoleID:
        case challengeConfig.mokujinRoleID:
        case challengeConfig.princeRoleID:
            return formatSinglesFromChallengers(challengers);
        case challengeConfig.dreamTeamRoleID:
            return formatDoublesFromChallengers(challengers);
    }
}

function formatSinglesFromChallengers(challengers) {

    var challengersString = "";

    let i = 1;
    challengers.forEach(challenger => {
        
        challengersString += `${i}. ` + challenger + `\n`;
        i++;
    });

    return challengersString;
}

function formatDoublesFromChallengers(challengers) {

    var challengersString = "";

    let i = 1;
    challengers.forEach(challenger => {
        
        if(i % 2 == 1) {
            challengersString += `${i}. ` + challenger;
        } 
        else {
            challengersString += " & " + challenger + `\n`;
        }

        i++;
    });

    return challengersString;
}
