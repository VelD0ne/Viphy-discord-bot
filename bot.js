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

const petCommandExample = async (param) => {
    let animatedGif = await petPetGif(param.member.avatar)

    // Example #1: Reply with the image attached
    bot.createMessage(param.channel.id,
        {
          "embed": {
            "image": {
              "url": 'attachment://pet.gif',
            }
          }
        },
        {
            file: animatedGif,
            name: 'pet.gif'
        })

    // Example #2: Or you could save it somewhere.
    fs.writeFile('idi_nahui.gif', animatedGif, function (err) {
        console.log('Cyka blyat! An error occurred!')
    })
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'hi') {
        const greet = "Hello, "+ interaction.member.user.username + (interaction.member.id === config.authorId ? ", my creator":"") + "!";
		await interaction.reply(greet);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	} else if (commandName === 'pet_me') {
		console.log('1');
		let animatedGif = await petPetGif(interaction.member.user.avatarURL({ format: "jpg"} ))
		const file = new Discord.MessageAttachment(animatedGif, "avatar.gif");	
		interaction.channel.send({files: [file] });
	}
});



client.login(config.token);	