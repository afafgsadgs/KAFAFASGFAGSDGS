const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "avatar",
  async run (client, message, args) {
    const embed = new MessageEmbed()
    .setTitle('Avatar')
    .setImage(message.author.displayAvatarURL({ dynamic: true, size: 4096 }))
    message.channel.send(embed)
  }
}
