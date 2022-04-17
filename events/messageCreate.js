const petPetAnimations = require("../petPetAnimations");
const config = require("../config.json");

exports.petPetCommand = (client) => {

    client.on('messageCreate' , message => {
        if(message.author.id === config.clientId || !message.content.startsWith(config.prefix)) return;
    
        const commands = message.content.substring(1).split(" ");
    
        if (message.attachments.size > 0 && commands[0]==="petpet") {
            if (message.attachments.every(petPetAnimations.attachIsImage)){
                message.attachments.map(async val => {
                    const file = await petPetAnimations.createPetPetAnimation(val.attachment);
                    await message.reply({files: [file]});
                });
            }
        }   
    });
  
}