const db = require('../database.js')
module.exports = {
    kod: "db-sıfırla",
  async run (client, message, args) {
    let { MessageEmbed } = require('discord.js')
    if (message.author.id !== "689434266870087721") return message.channel.send("Bu komutu sadece benim sahibim kullanabilir.")
    db.sıfırla()
    const embed = new MessageEmbed()
    .setTitle('Başarıyla database sıfırlandı.')
    .setFooter('Database sıfırlanma tarihi => ')
    .setTimestamp()
    message.channel.send(embed)
  }
}