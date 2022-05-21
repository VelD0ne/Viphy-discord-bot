const Discord = require("discord.js");
const giphs = require("../../functions/giphs.js");

module.exports.viphySelectCommand = async (interaction) => {
    await interaction.update({ content: "Wait for your gif", components: [] });
    const idOfGifs = interaction.customId.substring(4);
    const numberOfSelectedOption = parseInt(interaction.values[0]);
    const file = new Discord.MessageAttachment(
        giphs.gifContainer.get(idOfGifs)[numberOfSelectedOption],
        "gif.gif"
    );
    await interaction.editReply({
        content: "Enjoy your gif!",
        files: [file],
        components: [],
    });
};
