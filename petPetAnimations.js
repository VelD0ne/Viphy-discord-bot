const Discord = require("discord.js");
const petPetGif = require("pet-pet-gif");


exports.createPetPetAnimation = async (url) => {
    const animatedGif = await petPetGif(url);
    return new Discord.MessageAttachment(animatedGif, "petpet.gif");	
  }
  
exports.attachIsImage = (msgAttach) => {
    const url = msgAttach.url;
    const isImage = (url.indexOf("png", url.length - "png".length) !== -1) || 
    (url.indexOf("jpg", url.length - "jpg".length) !== -1);
    return isImage;
  }