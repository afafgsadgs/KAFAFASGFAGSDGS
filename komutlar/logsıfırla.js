const db = require('../database.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "log-sıfırla",
  async run (client, message, args){
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply('Yetkin yok.')
    if (!db.kontrol("logkanal" + message.guild.id)) return message.channel.send("Log kanalı ayarlı değil zaten.")
    db.sil("logkanal" + message.guild.id)
    const embed = new MessageEmbed()
    .setTitle("Log Kanalı Sıfırlandı")
    .setDescription("Başarıyla log kanalı sıfırlandı")
    .setColor("WHITE")
    message.channel.send(embed)
  }
}
