require("dotenv").config( {path: './.env' });
const { Client } = require('discord.js');

const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent'] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login();