const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "sunucutanıt",
  async run (client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanmak için **YETKİLİ** olmalısın.')
    if (client.sunucutanıt.has(message.guild.id)) return message.channel.send("Sunucunuzu günde 1 defa tanıtabilirsin.")
    const channel = client.channels.cache.find(ch => ch.id === "847471398573178920")
    const davet = await message.channel.createInvite({ maxAge: 86400 })
    let serverIcon = message.guild.iconURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/824343929054560309/847466749430726711/19_discord-profil-resmi-kopya.webp"
    const embed = new MessageEmbed()
    .setTitle("SUNUCU TANITILDI")
    .setURL(davet.url)
    .setThumbnail(serverIcon)
    .setFooter(`${message.guild.name} adlı sunucuya davet edildiniz. Davet eden: ${message.author.tag}`)
    channel.send(embed)
    client.sunucutanıt.set(message.guild.id, true)
    message.reply("Sunucu başarıyla tanıtıldı.")
    setTimeout(function () {
      client.sunucutanıt.delete(message.guild.id)
    }, 86400 * 1000 );
  }
}
