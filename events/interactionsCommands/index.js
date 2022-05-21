const { greetCommand } = require("./greetCommand");
const { petMe } = require("./petMeCommand");
const { viphyCommand } = require("./viphyCommand");
const { viphySelectCommand } = require("./viphySelectCommand");

module.exports.commands = {
  greetCommand,
  petMe,
  viphyCommand,
  viphySelectCommand,
};
