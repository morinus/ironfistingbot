const { SlashCommandBuilder } = require('discord.js');
const challengeConfig = require('../../../configs/challenge-config.json');
const challengeSystem = require('../../BLL/systems/challenge-system');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset-weekly-challenges')
        .setDescription('Resets the weekly challenges.'),
    async execute(interaction) {

        challengeSystem.scheduledChallengesReset();

        const channel = interaction.guild.channels.cache.get(challengeConfig.tekkenChallengesChannelID);

        channel.send(`Weekly challenges have been reset!`);

        await interaction.reply("Challenges successfuly reset!");
    }
}