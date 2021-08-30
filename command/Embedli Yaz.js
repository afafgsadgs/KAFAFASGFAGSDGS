const Discord = require('discord.js');

exports.run = (client, message, args) => {
 let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('bişey yaz lutfen!');
const yaz = new Discord.MessageEmbed()
      .setColor('#fff000')
      .addField(`Buyur Mesajın`, `${mesaj}`)
    return message.channel.sendEmbed(yaz);
};
 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ey'],
  permLevel: 0
};

exports.help = {
  name: 'yaz',
  description: 'Embedli Yaz Komutu',
  usage: 'Embed'
};