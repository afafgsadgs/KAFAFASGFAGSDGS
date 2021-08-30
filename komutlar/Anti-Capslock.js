module.exports = {
    kod: "anti-capslock",
  async run (client, message, args){
    const db = require('../database.js')
    const { MessageEmbed } = require('discord.js')
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Yetkin yok.')
    if (!args[0]) return message.channel.send("Doğru kullanımı anti-capslock aç/kapat")
    if (args[0].toLowerCase() === "kapat"){
      if (!db.kontrol("anti-capslock" + message.guild.id)) return message.channel.sen('Bu sunucuda **anti capslock** zaten kapalı.')
      db.sil("anti-capslock" + message.guild.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla anti capslock kapatıldı.')
      .setDescription(`Artık üyeler capslocklu mesajlar atabilecekler.`)
      .setColor('GREEN')
      return message.channel.send(embed)
    }
    if (args[0].toLowerCase() === "aç"){
      db.yaz("anti-capslock" + message.guild.id, "açık")
      const embed = new MessageEmbed()
      .setTitle('Başarıyla anti capslock açıldı.')
      .setDescription(`Artık üyeler capslocklu mesajlar atamayacak.`)
      .setColor('YELLOW')
      message.channel.send(embed)
    } else {
        message.channel.send('Doğru kullanımı anti-capslock aç/kapat')
    }
  }
}