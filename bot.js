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


client.on('messageCreate', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === "hi"){
        commands.get(command)(message);
    }

    if(command === "help"){
        commands.get(command)(message);
    }
});

const commands = new Map();
commands.set('hi', (message) => message.channel.send("Hello" + (message.author.id === config.authorId ? ", my creator":"") + "!"))
commands.set('help', (message) => {
    const commandsOfBot = "This Bot has following commands:\n-\n"+[...commands.keys()].reduce((commandsString, elem) => commandsString + elem + "\n" , "") +"-" ;
    message.channel.send(commandsOfBot);
});


client.login(config.token);