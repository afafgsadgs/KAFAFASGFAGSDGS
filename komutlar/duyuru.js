const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "duyuru",
  async run (client, message, args){
    const botmesaji = args.join(" ")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Duyuru yapmak için YÖNETICI rolüne sahip olmalisin.');
    if (!botmesaji) return message.reply('Ne hakkında duyuru yapıcağını yazmadın.');
    message.delete()
    const embed = new MessageEmbed()
    .setTitle('Duyuru')
    .setDescription(botmesaji)
    .setFooter('GameMaster Bot');
    message.channel.send(embed)
  }
}
