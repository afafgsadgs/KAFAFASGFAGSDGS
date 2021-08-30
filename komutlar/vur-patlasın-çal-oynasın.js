const play = require('discordjs-ytdl')
const { MessageEmbed } = require('discord.js')
const ytdl = require('ytdl-core')
module.exports = {
  kod: "çal",
  async run (client, message, args){
    if (message.member.voice.channel){
      const embed = new MessageEmbed()
      .setTitle('Şarkı Bulundu')
      .setColor('RANDOM')
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      const connection = await message.member.voice.channel.join()
      let id = await play.id(args.join(" "), 'AIzaSyB4NKukUa5nGNv2qLpKr-nuAoC7JmMzEco')
      const şarkı = await connection.play(ytdl(id))
      let title = await play.title(args.join(" "), 'AIzaSyB4NKukUa5nGNv2qLpKr-nuAoC7JmMzEco')
      embed.addField('VIDEO BAŞLIĞI: ', title)
      let kanal = await play.channel(args.join(" "), 'AIzaSyB4NKukUa5nGNv2qLpKr-nuAoC7JmMzEco')
      embed.addField('KANAL ADI: ', kanal)
      embed.addField('VIDEO IDSI: ', id)
      embed.addField('VIDEO LİNKİ: ', 'https://www.youtube.com/watch?v=' + id)
      setTimeout(function () {
        message.channel.send(embed)
      }, 1000)
      şarkı.on('finish', () => {
        message.member.voice.channel.leave()
      })
    } else {
      message.reply('Bir sesli kanala katılman lazım')
    }
  }
}
