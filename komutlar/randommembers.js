const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "hediye",
  async run (client, message, args) {
    var uye = message.guild.members.cache.random()
    const ödülmesaji = args.join(" ")
    if (!ödülmesaji) return message.reply('Ne hediyesi vericeğini yazmadın.');
    message.delete()
    const embed = new MessageEmbed()
    .setTitle('Hediye verildi')
    .setDescription(`<@${message.author.id}> rasgele birine hediye verdi.\nHediye: ${ödülmesaji}\nKazanan: <@${uye.id}>`)
    .setFooter('Hediye verdiği tarih => ')
    .setTimestamp()
    message.channel.send(embed)
  }
}
