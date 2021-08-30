const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.** <a:Yldz:742698148329291826>`)
  const linqo = `https://habbofont.net/font/habbo_new/${yazi}.gif`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")//KΞJ ツ XRD-EnDeRmAn#2010
  .setColor("RANDOM")//KΞJ ツ XRD-EnDeRmAn#2010
  .setImage(linqo)
  .setFooter('Habbo Font Logo Oluşturuldu')//KΞJ ツ XRD-EnDeRmAn#2010
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yazıfoto','yazı-foto'],
    permLevel: 0//KΞJ ツ XRD-EnDeRmAn#2010
}

exports.help = {
    name: 'habbo',
    description: 'Yazdığınız yazıyı dinamik çevirir.',
    usage: 'habbo <yazı>'
}//KΞJ ツ XRD-EnDeRmAn#2010