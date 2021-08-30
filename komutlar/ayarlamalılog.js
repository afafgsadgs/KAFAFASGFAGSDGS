const db = require('../database.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "log-ayarla",
  async run (client, message, args){
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply('Yetkin yok.')
    var channel = message.mentions.channels.first()
    if (!channel) channel = message.guild.channels.cache.find(ch => ch.name.includes(args.join(" ").toLowerCase()))
    if (!channel) channel = message.guild.channels.cache.get(args[0])
    if (!channel) return message.reply("Lütfen geçerli bir kanal gir.")
    db.yaz("logkanal" + message.guild.id, channel.id)
    const embed = new MessageEmbed()
    .setTitle("Log Kanalı Ayarlandı")
    .setDescription("Başarıyla log kanalı <#" + channel.id + "> oldu.")
    .setColor("YELLOW")
    message.channel.send(embed)
  }
}
