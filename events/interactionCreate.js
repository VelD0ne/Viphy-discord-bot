const Discord = require("discord.js");
const config = require("../config.json");
const petPetAnimations = require("../petPetAnimations");
const fetch = require("node-fetch");


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
        if (!interaction.isCommand()) return;
    
        const { commandName } = interaction;
      if (commandName === 'viphy') {
    
        const selectMenuOptionsReducer = (accum, elem, index) => {
          accum.push({
            label: (elem.title? elem.title : "unknown"),
            value: `${index}`,
          });
          return accum;
        } 
        const query = interaction.options._hoistedOptions[0].value;
        const url = `https://api.giphy.com/v1/gifs/search?limit=10&api_key=c7wt1bUOrn2bVUYP1DpTvbVHFvUuUqAe&q=${query}`;
        const response = await fetch(url);
        const {data} = await response.json();
        gifArray = data.map(elem => elem.images.original.url)
        gifContainer.set(interaction.id, gifArray);
        const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageSelectMenu()
            .setCustomId(`gifs${interaction.id}`)
            .setPlaceholder('Select your gif name here!')
            .addOptions(data.reduce(selectMenuOptionsReducer, [])),
        );
        if(row.components[0].options.length>0) {
              await interaction.reply({ content: 'List of gifs!', components: [row] });
        } else {
          await interaction.reply({ content: 'Gifs now found' });
        }
      }
    
    });
}

exports.viphySelectMenu = (client) => {
    client.on('interactionCreate', async interaction => {

        if (!interaction.isSelectMenu()) return;
    
        if (interaction.customId.startsWith("gifs")) {
        await interaction.update({content: "Wait for your gif",components: []});
        const file = new Discord.MessageAttachment(gifContainer.get(interaction.customId.substring(4))[+interaction.values[0]], "gif.gif");
            await interaction.editReply({ content: 'Enjoy your gif!', files: [file], components: [] });
        }
    
    });
}