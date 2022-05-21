const petPetAnimations = require("../../petPetAnimations");

module.exports.petMe = async (interaction) => {
  const file = await petPetAnimations.createPetPetAnimation(
    interaction.member.user.avatarURL({ format: "png" })
  );
  interaction.reply({ files: [file] });
};
