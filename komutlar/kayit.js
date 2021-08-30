const db = require('../database.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
    kod: "kayıt",
  async run (client, message, args){
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Yetkin yok.')
    if (!db.kontrol("kayıtrol" + message.guild.id)) return message.channel.send('Bu komutu kullamak için kayıt rolü ayarlaman gerek.')
    let role = db.bul("kayıtrol" + message.guild.id);
    let member = message.mentions.members.first();
    if (!member) return message.channel.send('Bir etiketlemen lazım')
    const embed = new MessageEmbed()
    .setTitle('Başarıyla üye kayıt edildi.')
    .setDescription(`<@${member.id}> adlı üye başarıyla kayıt edildi.`)
    message.channel.send(embed)
    member.roles.add(role)
  }
}