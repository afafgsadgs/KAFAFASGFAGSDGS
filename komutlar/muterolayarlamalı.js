module.exports = {
    kod: "muterol",
  async run (client, message, args){
    const db = require('../database.js')
    const { MessageEmbed } = require('discord.js')
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Yetkin yok.')
    if (!args[0]) return message.channel.send("Doğru kullanım:\nAyarlamak için: muterol @Rol\nSıfırlamak için: muterol sıfırla")
    if (args[0].toLowerCase() === "sıfırla"){
      if (!db.kontrol("muterol" + message.guild.id)) return message.channel.sen('Bu sunucu için ayarlanmış bir **kayıt rolü** bulunamadı.')
      db.sil("muterol" + message.guild.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla mute rolü sıfırlandıdı.')
      .setDescription(`Artık üyeleri mute komuduyla üyeleri susturamayacaksın.`)
      .setColor('GREEN')
      return message.channel.send(embed)
    }
    var rol = message.mentions.roles.first()
    if (rol){
      db.yaz("muterol" + message.guild.id, rol.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla mute rolü ayarlandı.')
      .setDescription(`Mute rolü: <@&${rol.id}> oldu. \nMute komudunu kullanarak üyeleri geçici olarak susturabilirsin.`)
      .setColor('YELLOW')
      message.channel.send(embed)
    } else {
      rol = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.join(" ").toLowerCase()))
      if (!rol) rol = message.guild.roles.cache.get(args[0])
      if (!rol) return message.channel.send('Rolü bulamadım')
      db.yaz("muterol" + message.guild.id, rol.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla mute rolü ayarlandı.')
      .setDescription(`Mute rolü: <@&${rol.id}> oldu. \nMute komudunu kullanarak üyeleri geçici olarak susturabilirsin.`)
      .setColor('YELLOW')
      message.channel.send(embed)
    }
  }
}