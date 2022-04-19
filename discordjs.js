const Discord = require("discord.js");
const giphyApi = require("./giphyApi");

const selectMenuOptionsReducer = (accum, elem, index) => {
    accum.push({
        label: (elem.title ? elem.title : "unknown"),
        value: `${index}`,
    });
    return accum;
} 

exports.createMessageRow = async (interaction ,query, gifContainer) => {
    const gifs = new giphyApi.Gifs(query);
    const data = await gifs.data;
    const gifArray = await gifs.getGifArray();
    const selectMenuOptions = data.reduce(selectMenuOptionsReducer, []);
    gifContainer.set(interaction.id, gifArray);
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageSelectMenu()
            .setCustomId(`gifs${interaction.id}`)
            .setPlaceholder('Select your gif name here!')
            .addOptions(selectMenuOptions),
    );
    return row;
}