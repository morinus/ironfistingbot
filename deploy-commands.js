const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const dotenv = require("dotenv");

const envFile = process.env.ENV_FILE || './.env';

if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
} else {
    console.error(`The specified .env file (${envFile}) does not exist.`);
    process.exit(1);
}

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
        process.exit(1);
    } catch(error) {
        console.error(error);
    }
})();