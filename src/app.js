//const dotenv = require("dotenv").config({ path: './.env' });
const dotenv = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');
const envFile = process.env.ENV_FILE || './.env';

if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
} else {
    console.error(`The specified .env file (${envFile}) does not exist.`);
    process.exit(1);
}

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, '/BLL/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath,file);
    const command = require(filePath);

    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a require "data" or "execute" property.`);
    }
}

client.once(Events.ClientReady, bot => {

    console.log(`Logged in as ${bot.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {

        await command.execute(interaction);
    } catch (error) {
        
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
    }
});

const token = process.env.DISCORD_TOKEN;
client.login(token);