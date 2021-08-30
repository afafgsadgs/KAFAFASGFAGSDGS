const { MessageEmbed } = require('discord.js')
module.exports = {
    kod: "rolver",
    async run (client, message, args){
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsin')
    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    const embed = new MessageEmbed()
    .setTitle('Başarıyla rol verildi.')
    message.channel.send(embed)
    member.roles.add(role)
    }
}