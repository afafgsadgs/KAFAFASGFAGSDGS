const Discord = require('discord.js');
exports.run = (client, message, args) => {   

 let mesaj = args.slice(0).join(' ');
 let member = message.mentions.members.first();
 let body = 'https://mc-heads.net/body/' + mesaj
 if (mesaj.length < 1) return message.channel.send('skin adı gir')
 if (mesaj == member) {
   message.channel.send('skin adı belirt')
 } else {
 const mcbody = new Discord.MessageEmbed()
   .setColor('BLUE')
   .setImage(body)

 message.channel.send(mcbody);
 }//KΞJ ツ XRD-EnDeRmAn#2010
}

exports.conf = {//KΞJ ツ XRD-EnDeRmAn#2010
  enabled: true,
  guildOnly: true,
  aliases: ["mccilt"],//KΞJ ツ XRD-EnDeRmAn#2010
  permLevel: 0
};

exports.help = {//KΞJ ツ XRD-EnDeRmAn#2010
  name: "mcskin"//KΞJ ツ XRD-EnDeRmAn#2010
};//KΞJ ツ XRD-EnDeRmAn#2010