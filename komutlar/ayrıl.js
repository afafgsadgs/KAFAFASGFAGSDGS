module.exports = {
  kod: "ayrıl",
  async run (client, message, args) {
    if (!message.member.voice.channel) return message.channel.send('**Sesli kanalda değilsin**.')
    if (!message.guild.me.voice.channel) return message.channel.send('**Bot bir sesli kanalda değil**.')
    if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send('**Botu kanaldan ayrıltmak için botla aynı sesli kanalda olmalısın**.')
    message.member.voice.channel.leave()
    message.channel.send('**Başarı ile ayrıldım**.') 
  }
}
