const { SlashCommandBuilder } = require('discord.js');
const commandsDatabase = require('../../../databases/commands-database.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists the commands available to use with our bot.'),
    async execute(interaction) {

        var listOfCommandsMessage = GetListOfCommandsMessage();

        await interaction.reply(listOfCommandsMessage);
    }
}

function GetListOfCommandsMessage() {

    let message = "List of commands:\n```";

    Object.entries(commandsDatabase).forEach((entry) => {
        const [key, value] = entry;
        message += `/` + key + " - " + value + `\n`;
    });
    
    message += "```";

    return message;
}