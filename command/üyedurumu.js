const Discord = require("discord.js");

exports.run = (client, message) => {
  let üye = new Discord.MessageEmbed()
    .setAuthor("Üyedurum")
    .setColor("RANDOM")
   .addField("**Toplam Kullanıcı**",message.guild.memberCount )
  
    .setTimestamp()
  return message.channel.send(üye);
};

module.exports.conf = {
  aliases: ["üyedurum"],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

module.exports.help = {//KΞJ ツ XRD-EnDeRmAn#2010
  name: "üyedurum",//KΞJ ツ XRD-EnDeRmAn#2010
  description: "",//KΞJ ツ XRD-EnDeRmAn#2010
  usage: ""
};
