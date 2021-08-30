module.exports = {
  kod: "slowmod",
  async run (client, message, args) {
    const ms = require('rhino-ms')
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Yetkin yok.');
    const zaman = ms(args.join(" "), {birim: "saniye"})
    if (zaman > 21600 || zaman < 1) return message.channel.send('Lütfen 1 saniye ile 6 saat arası bir saat girin.')
    const slowmode = Math.floor(zaman)
    message.channel.setRateLimitPerUser(slowmode)
    message.reply(' Bu kanalı ' + args.join(" ") + ' süre slowmoda aldın.')
  }
}
