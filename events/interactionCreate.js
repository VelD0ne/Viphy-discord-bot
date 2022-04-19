const Discord = require("discord.js");
const config = require("../config.json");
const petPetAnimations = require("../petPetAnimations");
const giphyApi = require("../giphyApi");
const discordFunctions = require("../discordjs");

exports.greetingsCommand = (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        const { commandName } = interaction;
        if (commandName === 'hi') {
            const greet = "Hello, "+ interaction.member.user.username + (interaction.member.id === config.authorId ? ", my creator":"") + "!";
            await interaction.reply(greet);
        }
    });
}

exports.petMeCommand = (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;
        if (commandName === 'pet_me') {
        const file = await petPetAnimations.createPetPetAnimation(interaction.member.user.avatarURL({ format: "png"} ));
        interaction.reply({files: [file] });
        }
    });
}

const gifContainer = new Map();

exports.viphyCommand = (client) => {
    client.on('interactionCreate', async interaction => {
		const { commandName } = interaction;
        if (!interaction.isCommand() || commandName !== 'viphy') return;

		const query = interaction.options._hoistedOptions[0].value;
		const row = await discordFunctions.createMessageRow(interaction, query, gifContainer);
		const isAnyGifs = row.components[0].options.length>0;
		if(isAnyGifs) {
			await interaction.reply({ content: 'List of gifs!', components: [row] });
		} else {
			await interaction.reply({ content: 'Gifs now found' });
		}

    });
}

exports.viphySelectMenu = (client) => {
    client.on('interactionCreate', async interaction => {

        if (!interaction.isSelectMenu() || !interaction.customId.startsWith("gifs")) return;
    
		await interaction.update({content: "Wait for your gif", components: []});
		const idOfGifs = interaction.customId.substring(4);
		const numberOfSelectedOption = parseInt(interaction.values[0]);
		const file = new Discord.MessageAttachment(gifContainer.get(idOfGifs)[numberOfSelectedOption], "gif.gif");
		await interaction.editReply({ content: 'Enjoy your gif!', files: [file], components: [] });

    });
}