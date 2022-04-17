const Discord = require("discord.js");
const config = require("./config.json");
const interactionCreate = require("./events/interactionCreate");
const messageCreate = require("./events/messageCreate");

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

interactionCreate.greetingsCommand(client);
interactionCreate.petMeCommand(client);
interactionCreate.viphyCommand(client);
interactionCreate.viphySelectMenu(client);
messageCreate.petPetCommand(client);

const gifContainer = new Map();

client.login(config.token);	
