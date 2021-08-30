const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "reklam-engel",
  async run (client, message, args){
    const db = require("../database.js")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu sadece YÖNETİCİLER kullanabilir.')
    if (!args[0]) return message.channel.send("Lütfen `aç` ya da `kapat`")
    let ayar = args[0].toLowerCase()
    if (ayar === "aç"){
      db.yaz("reklam" + message.guild.id, "açık")
      const embed = new MessageEmbed()
      .setTitle('Reklam engelleme başarıyla açıldı.')
      .setColor("RANDOM")
      message.channel.send(embed)
    } else if (ayar === "kapat") {
      if (!db.kontrol("reklam" + message.guild.id)) return message.reply("Reklam engelleme zaten kapalı.")
      db.sil("reklam" + message.guild.id)
      const embed = new MessageEmbed()
      .setTitle('Reklam engelleme başarıyla kapatıldı.')
      .setColor("RANDOM")
      message.channel.send(embed)
    } else {
      message.reply("Geçersiz bir ayar girdin. Lütfen aç yada kapat yazınız.")
    }
  }
}
