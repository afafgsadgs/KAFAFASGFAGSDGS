module.exports = {
  kod: "taşı",
  async run (client, message, args) {
    if (!message.member.hasPermission('MOVE_MEMBERS')) return message.reply('Yetkin yok.');
    const üye = message.mentions.members.first()
    if (!üye) return message.channel.send('Herhangi geçerli bir üye belirtmediniz.')
    if (!üye.voice.channel){
      message.channel.send('Başarıyla Kanala taşındı');
      üye.voice.setChannel(message.member.voice.channel.id)
    } else {
      if (!args[1]) return message.channel.send('KANAL ID giriniz.')
      if (isNaN(args[1])) return message.channel.send('Lütfen sadece kanal adını giriniz.')
      message.channel.send('Başarıyla kanala taşındı.');
      üye.voice.setChannel(args[1])
    }
  }
}
