const { SlashCommandBuilder, PermissionFlagsBits, Role } = require('discord.js');
const nekosConfig = require('../../../configs/nekos-config.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gib')
        .setDescription('Get NSFW image')
        .addStringOption(option =>
            option.setName('tag')
            .setDescription('Input tag'))
        .setDefaultMemberPermissions('0'),
    async execute(interaction) {
        const tag = interaction.options.getString('tag');

        if(tag == 'help') {
            var tagsList = getListOfTags();
            await interaction.reply(tagsList);

            return;
        }

        const isValidTag = validateTag(tag);

        if(!isValidTag) return;

        var data = await getNsfwImageData(tag);
        var hasData = data != undefined;

        if(!hasData) return;

        await interaction.reply(data.image);
    }
}

async function getNsfwImageData(tag) {
    try {
        var response = await axios.get(nekosConfig.url + tag.toLowerCase());

        return response.data;
    }
    catch(error) {
        console.error(error);
    }
}

function getListOfTags() {
    let tagsString = "";
    nekosConfig.tags.forEach(tag => {
        tagsString += tag + ' ';
    });

    return tagsString;
}

function validateTag(tag) {
    if(tag == undefined) return false;

    var isValid = nekosConfig.tags.includes(tag.toLowerCase());

    return isValid;
}

module.exports.validateTag = validateTag;