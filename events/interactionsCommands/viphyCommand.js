const discordFunctions = require("../../functions/discordjs");

module.exports.viphyCommand = async (interaction) => {
    const query = interaction.options._hoistedOptions[0].value;
    const row = await discordFunctions.createMessageRow(interaction, query);
    const isAnyGifs = row.components[0].options.length > 0;
    if (isAnyGifs) {
        await interaction.reply({
            content: "List of gifs!",
            components: [row],
        });
    } else {
        await interaction.reply({ content: "Gifs now found" });
    }
};
