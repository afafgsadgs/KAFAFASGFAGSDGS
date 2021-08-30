const db = require('../database.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "yetkili-etiket",
    async run (client, message, args) {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Yetkin yok.')
      if (!args[0]) return message.reply("Geçersiz bir ayar girdin. Lütfen aç yada kapat yazınız.")
      let ayar = args[0].toLowerCase()
      if (ayar === "aç"){
        db.yaz("yetkilietiket" + message.guild.id, true)
        const embed = new MessageEmbed()
        .setTitle('Yetkili etiketlemek başarıyla yasaklandı.')
        .setColor("RANDOM")
        message.channel.send(embed)
      } else if (ayar === "kapat"){
        if (!db.kontrol("yetkilietiket" + message.guild.id)) return message.channel.send("Yetkili etiketlemek zaten kapalı.")
        db.sil("yetkilietiket" + message.guild.id)
        const embed = new MessageEmbed()
        .setTitle('Yetkili etiketleme yasağı başarıyla kapatıldı.')
        .setColor("RANDOM")
        message.channel.send(embed)
      } else {
        message.reply("Geçersiz bir ayar girdin. Lütfen aç yada kapat yazınız.")
      }
    }
}
