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

        if(data != undefined) {
            await interaction.reply(data.image);
        }
    }
}

async function getNsfwImageData(tag) {
    try {
        var data;

        await axios.get("http://api.nekos.fun:8080/api/" + tag.toLowerCase())
        .then((response) => {
            data = response.data;
        });

        return data;
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