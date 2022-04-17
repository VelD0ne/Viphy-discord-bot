const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('hi').setDescription('Greet with member!'),
	new SlashCommandBuilder().setName('pet_me').setDescription('Create a gif with members avatar!'),
	new SlashCommandBuilder().setName('viphy').setDescription('Recreates giphy function!')
	.addStringOption(option => option.setName('query').setDescription('String to find gifs').setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);