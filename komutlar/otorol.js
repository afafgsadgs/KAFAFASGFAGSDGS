const db = require('../database.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "otorol",
  async run (client, message, args){
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Yetkin yok.')
    if (!args[0]) return message.channel.send('Lürfen bir rol gir. Ya da **!otorol kapat** yazarak otorol ayarını kapatabilirsiniz.')
    if (args[0].toLowerCase() === "kapat"){
      if (!db.kontrol("otorol" + message.guild.id)) return message.reply('Bu sunucu için ayarlanmış bir **otorol** bulunamadı.')
      db.sil("otorol" + message.guild.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla otorol kapatıldı.')
      .setDescription(`Artık sunucuya gelen kişilere otorol verilmeyecek.`)
      .setColor('GREEN')
      return message.channel.send(embed)
    }
    var rol = message.mentions.roles.first()
    if (rol){
      db.yaz("otorol" + message.guild.id, rol.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla otorol ayarlandı.')
      .setDescription(`Otorol rolü: <@&${rol.id}> oldu. \nBiri sunucuya geldiğinde ona **${rol.name}** adlı rol verilecek.`)
      .setColor('GREEN')
      message.channel.send(embed)
    } else {
      rol = message.guild.roles.cache.find(role => role.name.includes(args.join(" ")))
      if (!rol) rol = message.guild.roles.cache.find(role => role.id === args.join(" "))
      if (!rol) return message.channel.send('Rolü bulamadım')
      db.yaz("otorol" + message.guild.id, rol.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla otorol ayarlandı.')
      .setDescription(`Otorol rolü: <@&${rol.id}> oldu. \nBiri sunucuya geldiğinde ona **${rol.name}** adlı rol verilecek.`)
      .setColor('GREEN')
      message.channel.send(embed)
    }
  }
}
