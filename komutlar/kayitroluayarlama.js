module.exports = {
    kod: "kayıtrol",
  async run (client, message, args){
    const db = require('../database.js')
    const { MessageEmbed } = require('discord.js')
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Yetkin yok.')
    if (!args[0]) return message.channel.send("Doğru kullanım:\nAyarlamak için: kayıtrol @Rol\nSıfırlamak için: kayıtrol sıfırla")
    if (args[0].toLowerCase() === "sıfırla"){
      if (!db.kontrol("kayıtrol" + message.guild.id)) return message.channel.sen('Bu sunucu için ayarlanmış bir **kayıt rolü** bulunamadı.')
      db.sil("kayıtrol" + message.guild.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla kayıt rolü sıfırlandıdı.')
      .setDescription(`Artık üyeleri kayıt komuduyla rol verilmicek.`)
      .setColor('GREEN')
      return message.channel.send(embed)
    }
    var rol = message.mentions.roles.first()
    if (rol){
      db.yaz("kayıtrol" + message.guild.id, rol.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla kayıt rolü ayarlandı.')
      .setDescription(`Kayıt rolü: <@&${rol.id}> oldu. \nKayıt komudunu kullanarak üyelere **${rol.name}** adlı rolü verebilirsin.`)
      .setColor('YELLOW')
      message.channel.send(embed)
    } else {
      rol = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.join(" ").toLowerCase()))
      if (!rol) rol = message.guild.roles.cache.get(args[0])
      if (!rol) return message.channel.send('Rolü bulamadım')
      db.yaz("kayıtrol" + message.guild.id, rol.id)
      const embed = new MessageEmbed()
      .setTitle('Başarıyla kayıt rolü ayarlandı.')
      .setDescription(`Kayıt rolü: <@&${rol.id}> oldu. \nKayıt komudunu kullanarak üyelere **${rol.name}** adlı rolü verebilirsin.`)
      .setColor('YELLOW')
      message.channel.send(embed)
    }
  }
}