const config = require("../config.json");
const { commands } = require("./interactionsCommands/index");

exports.interactions = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    switch (commandName) {
      case "hi": {
        commands.greetCommand(interaction);
        break;
      }
      case "pet_me": {
        commands.petMe(interaction);
        break;
      }
      case "viphy": {
        commands.viphyCommand(interaction);
        break;
      }
    }
  });
};

exports.viphySelectMenu = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (
      !interaction.isSelectMenu() ||
      !interaction.customId.startsWith(config.selectMenuId)
    )
      return;
    commands.viphySelectCommand(interaction);
  });
};
