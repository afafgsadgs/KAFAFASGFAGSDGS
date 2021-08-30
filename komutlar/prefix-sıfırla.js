const db = require('../database.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "prefix-sıfırla",
  async run (client, message, args){
    if (!message.guild) return;
    if (!db.kontrol("prefix" + message.guild.id)) return message.channel.send("Prefix ayarlanmamış.");
    db.sil("prefix" + message.guild.id)
    const embed = new MessageEmbed()
    .setTitle('Başarıyla Prefix Sıfırlandı.')
    .setColor('RANDOM')
  }
}
