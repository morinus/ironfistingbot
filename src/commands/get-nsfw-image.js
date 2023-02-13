const { SlashCommandBuilder } = require('discord.js');
const nsfwTags = require('./nsfw-tags.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gib')
        .setDescription('Get NSFW image')
        .addStringOption(option =>
            option.setName('tag')
            .setDescription('Input tag')),
    async execute(interaction) {
        const tag = interaction.options.getString('tag');
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
        var response = await axios.get("http://api.nekos.fun:8080/api/" + tag.toLowerCase());

        return response.data;
    }
    catch(error) {
        console.error(error);
    }
}

function validateTag(tag) {
    if(tag == undefined) return false;

    var isValid = nsfwTags.tags.includes(tag.toLowerCase());

    return isValid;
}

module.exports.validateTag = validateTag;