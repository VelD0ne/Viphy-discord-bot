const Discord = require('discord.js');
const config = require('./config.json');
const { commands } = require('./deploy-commands.js');
// Configure logger settings

const prefix='!';

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

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'hi') {
        const greet = "Hello, "+ interaction.member.user.username + (interaction.member.id === config.authorId ? ", my creator":"") + "!";
		await interaction.reply(greet);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});



client.login(config.token);