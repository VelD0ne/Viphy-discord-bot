const isAuthor = () => id === config.authorId;

module.exports.greetCommand = async (interaction) => {
  const {
    id,
    user: { username },
  } = interaction.member;
  const greet = `Hello, ${username}${isAuthor ? ", my creator" : ""}!`;
  await interaction.reply(greet);
};
