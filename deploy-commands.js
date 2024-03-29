const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
require("dotenv").config();

const commands = [];
const commandFiles = fs.readdirSync('./src/BLL/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./src/BLL/commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch(error) {
        console.error(error);
    }
})();