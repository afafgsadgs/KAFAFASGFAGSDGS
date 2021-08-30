module.exports = {
  kod: "bot-otorol",
  async run (client, message, args){
    const db = require('../database.js')
    const { MessageEmbed } = require('discord.js')
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Yetkin yok.')
    if (!args[0]) return message.channel.send("Doğru kullanım:\nAyarlamak için: bot-otorol @Rol\nKapatmak için: bot-otorol kapat")
    if (args[0].toLowerCase() === "kapat"){
      if (!db.kontrol("otorol" + message.guild.id)) return message.channel.sen('Bu sunucu için ayarlanmış bir **bot-otorol** bulunamadı.')
      db.sil("otorol" + message.guild.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla bot-otorol kapatıldı.')
      .setDescription(`Artık sunucuya gelen botlara otorol verilmeyecek.`)
      .setColor('GREEN')
      return message.channel.send(embed)
    }
    var rol = message.mentions.roles.first()
    if (rol){
      db.yaz("bototorol" + message.guild.id, rol.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla bot-otorol ayarlandı.')
      .setDescription(`Bot-otorol rolü: <@&${rol.id}> oldu. \nBir bot sunucuya geldiğinde ona **${rol.name}** adlı rol verilecek.`)
      .setColor('YELLOW')
      message.channel.send(embed)
    } else {
      rol = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.join(" ").toLowerCase()))
      if (!rol) rol = message.guild.roles.cache.get(args[0])
      if (!rol) return message.channel.send('Rolü bulamadım')
      db.yaz("bototorol" + message.guild.id, rol.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla bot-otorol ayarlandı.')
      .setDescription(`Bot-otorol rolü: <@&${rol.id}> oldu. \nBir bot sunucuya geldiğinde ona **${rol.name}** adlı rol verilecek.`)
      .setColor('YELLOW')
      message.channel.send(embed)
    }
  }
}
