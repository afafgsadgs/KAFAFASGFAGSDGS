const Discord = require('discord.js')
const db = require('../database.js');
 
exports.run = async(client, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın')
let prefix = db.kontrol("prefix" + message.guild.id) ? db.bul("prefix" + message.guild.id) : "!"

  if (!args[0]) {
 message.channel.send(`**Örnek Kullanım:** ${prefix}kanal-koruma aç/kapat`)
  }
  if (args[0] === 'aç') {
    db.yaz(`kanalk_${message.guild.id}`, "Aktif")
     message.channel.send(`Kanal Koruma Başarıyla Açıldı!`)
  }
   if (args[0] === 'kapat') {
    db.sil(`kanalk_${message.guild.id}`)
    message.channel.send(`Kanal Koruma Başarıyla Kapatıldı!`)
  }
};
exports.conf = {
  aliases: ['kanalkoruma'],
  permLevel: 0
};
exports.help = {
  name: 'kanal-koruma'
}; 
