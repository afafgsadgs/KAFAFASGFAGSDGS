const db = require('../database.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "yardım",
  async run (client, message, args) {
    const prefix = db.kontrol("prefix" + message.guild.id) ? db.bul("prefix" + message.guild.id) : "!"
    const embed = new MessageEmbed()
    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setColor('GREEN')
    .setTitle(`${client.user.username} - Komutlar`)
    .addField('**' + ':yarn:' + 'Eğlence Komutları » ' + prefix + 'yardım eğlence**', 'Sunucunuzda Eğlenmek İçin Gerekli Olan Eğlence Komutları')
    .addField('**' + ':hammer:' +  ' Moderasyon Komutları » ' + prefix + 'yardım-moderasyon**', 'Sunucunuzu Geliştirecek Moderasyon Komutları')
    .addField('⚙️' + ' **Ayarlamalı Moderasyon Komutları » ' + prefix + 'yardım-ayarlamalımod**', 'Sunucunuzu Geliştirecek Ayarlamalı Moderasyon Komutları')
    .addField('**' + ':dizzy: Logo Komutları » ' + prefix + 'yardım-logo**', 'Sunucunuzda Havalı Logolar Oluşturan Logo Komutları')
    .addField('**' + ':bust_in_silhouette: Sahip Komutları » ' + prefix + 'yardım-sahip**', 'Sadece GameMaster Bot Sahibinin Kullanacağı Bot Komutları')
    .setThumbnail(client.user.avatarURL)
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/KJa3kJAT) **|** [Bota Oy Ver (Vote)](https://discordbots.org/bot/${client.user.id}/vote) **|** [Web Sitesi](http://ardakargyn.unaux.com/index.html)`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
    .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL({ dynamic: true}))
    message.channel.send(embed)
  }
}
