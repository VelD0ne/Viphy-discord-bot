const Discord = require('discord.js');
const config = require('./config.json');

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

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'beep') {
		await interaction.reply('Boop!');
	}
});

client.on('messageCreate', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(commands.has(command)){
        commands.get(command)(message, "Hello" + (message.author.id === config.authorId ? ", my creator":"") + "!");
    }
});

const writeMessage = (message, text) => message.channel.send(text);
const commands = new Map();
commands.set('hi', writeMessage)


client.login(config.token);