const db = require('../database.js')
module.exports = {
    kod: "db-yedekle",
  async run (client, message, args) {
    let { MessageEmbed } = require('discord.js')
    if (message.author.id !== "689434266870087721") return message.channel.send("Bu komutu sadece benim sahibim kullanabilir.")
    const yedek = args.join(" ")
    db.yedekle('yedek' + yedek)
    const embed = new MessageEmbed()
    .setTitle('Başarıyla database yedeklendi.')
    .setFooter('Database yedeklenme tarihi => ')
    .setTimestamp()
    message.channel.send(embed)
  }
}