const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Discord = require("discord.js");
require('moment-duration-format')
const os = require('os')
module.exports = {
    kod: ["istatistik", "is"],
  async run (bot, message, args) {
   const seksizaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new MessageEmbed()
  .setColor('RANDOM')
  .setFooter('GameMaster Bot  \'Buyur benim istatistiklerim', bot.avatarURL)
  .addField("» **Botun Sahibi**", "<@689434266870087721>")
  .addField("»  **Geliştirici** ","<@689434266870087721>")
  .addField("» **Bellek kullanımı**", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)  
  .addField("» **Çalışma süresi**", seksizaman)
  .addField('Kullanıcı Sayısı', bot.users.cache.size)
  .addField('Sunucu Sayısı', bot.guilds.cache.size)
  .addField('Kanal Sayısı', bot.channels.cache.size)
  .addField("» **Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("» **Node.JS sürüm**", `${process.version}`, true)
  .addField("» **Ping**", bot.ws.ping + " ms", true)
  .addField("» **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField("» **Bit**", `\`${os.arch()}\``, true)
  .addField("» **İşletim Sistemi**", `\`\`${os.platform()}\`\``) 
  .addField("**» Bot Davet**", " [Davet Et](https://discord.com/oauth2/authorize?client_id=857961097134080030&scope=bot&permissions=8589934591)", )
  .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/YXCBVfnM4B)", )
 return message.channel.send(istatistikler);
  }
}