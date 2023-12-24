require("dotenv").config( {path: './.env' });

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const playerRepository = require('./DLL/repositories/player-repository.js');
const tournamentSystem = require('./BLL/systems/tournament-system.js');

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

    // Scheduled Features
    //
    // setInterval(() => {
    //     challengeSystem.scheduledChallengesReset();
    // }, 1000 * 10);

    // playerRepository.addPlayer("182108428443975680", "Draco");
    // playerRepository.addPlayer("183249262312685569", "MasterVodka");
    // playerRepository.addPlayer("192640977289216000", "Mori");
    // playerRepository.addPlayer("197406374261555201", "YaBoii");
    // playerRepository.addPlayer("249570386277040128", "Uppity");
    // playerRepository.addPlayer("255399498975543296", "Kelo Ex Machina");
    // playerRepository.addPlayer("261104046943764481", "kimiboi");
    // playerRepository.addPlayer("282291958024765451", "TerraTron");
    // playerRepository.addPlayer("302475198643568640", "Sweatington");
    // playerRepository.addPlayer("306166324403503105", "Sickatron");
    // playerRepository.addPlayer("333150133132984322", "Mad Paladin");
    // playerRepository.addPlayer("338941529643286529", "Six");
    // playerRepository.addPlayer("371277908997832705", "SinfulDelight_");
    // playerRepository.addPlayer("491309479497826304", "Pencilette");
    // playerRepository.addPlayer("589791068749299725", "Gollder");

    // tournamentSystem.createMatches();
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

client.login();