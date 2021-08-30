const db = require('../database.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "prefix",
  async run (client, message, args){
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Yetkin yok.')
    if (!args[0]) return message.channel.send('Lürfen geçerli bir prefix gir.')
    const eskiprefix = db.kontrol("prefix" + message.guild.id) ? db.bul("prefix" + message.guild.id) : "!"
    if (eskiprefix == args.join(" ")) return message.channel.send("Prefix ayarım bu sunucuda zaten böyle.")
    db.yaz("prefix" + message.guild.id, args.join(" "))
    const embed = new MessageEmbed()
    .setTitle('Başarıyla Prefix Ayarlandı')
    .setDescription("Yeni Prefix'iniz **" + args.join(" " ) + "** oldu.")
    .addField("Eski Prefix:", eskiprefix)
    .setFooter("Prefix Sıfırlamak için " + args.join(" ") + " prefix-sıfırla yazın")
    message.channel.send(embed)
  }
}

//prefix67856
