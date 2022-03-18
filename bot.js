const Discord = require('discord.js');
const config = require('./config.json');
const { commands } = require('./deploy-commands.js');
const petPetGif = require('pet-pet-gif')
const fs = require('fs');
// Configure logger settings

// Initialize Discord client

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

async function createPetPetAnimation(url) {
  const animatedGif = await petPetGif(url);
  return new Discord.MessageAttachment(animatedGif, "petpet.gif");	
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'hi') {
    const greet = "Hello, "+ interaction.member.user.username + (interaction.member.id === config.authorId ? ", my creator":"") + "!";
		await interaction.reply(greet);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	} else if (commandName === 'pet_me') {
    const file = await createPetPetAnimation(interaction.member.user.avatarURL({ format: "png"} ));
		interaction.reply({files: [file] });

	}
});

client.on('messageCreate' , message => {
  if(message.author.id === config.clientId || !message.content.startsWith(config.prefix)) return;

  const commands = message.content.substring(1).split(" ");

  if (message.attachments.size > 0 && commands[0]==="petpet") {
    if (message.attachments.every(attachIsImage)){
        message.attachments.map(async val => {
        const file = await createPetPetAnimation(val.attachment);
        await message.reply({files: [file]});
      });
    }
}
});

function attachIsImage(msgAttach) {
  const url = msgAttach.url;
  //True if this url is a png image.
  const isImage = (url.indexOf("png", url.length - "png".length /*or 3*/) !== -1) || 
  (url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1);
  return isImage;
}

client.login(config.token);	