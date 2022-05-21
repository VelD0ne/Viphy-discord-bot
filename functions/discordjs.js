const Discord = require("discord.js");
const { selectMenuId } = require("../config.json");
const giphs = require("./giphs.js");

const selectMenuOptionsMapper = (elem, index) => ({
    label: elem.title ? elem.title : "unknown",
    value: `${index}`,
});

exports.createMessageRow = async (interaction, query) => {
    const data = await giphs.getData(query);
    const selectMenuOptions = data.map(selectMenuOptionsMapper);

    const gifArray = data.map((elem) => elem.images.original.url);
    giphs.gifContainer.set(interaction.id, gifArray);

    const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
            .setCustomId(`${selectMenuId}${interaction.id}`)
            .setPlaceholder("Select your gif name here!")
            .addOptions(selectMenuOptions)
    );
    return row;
};
