const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "oylama",
  async run (client, message, args){
    const botmesaji = args.join(" ")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Oylama yapmak için YÖNETICI rolüne sahip olmalisin.');
    if (!botmesaji) return message.reply('Oylamanin ne olacagini yazmadin.');
    message.delete()
    const embed = new MessageEmbed()
    .setTitle('Oylama')
    .setDescription(botmesaji)
    .setFooter('GameMaster Bot');
    message.channel.send({ embed: embed }).then( embedMessage => {
      embedMessage.react("👍")
      embedMessage.react("👎");
    })
  }
}
