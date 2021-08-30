module.exports = {
  kod: "sil",
    async run (client, message, args) {
      if (isNaN(args)) return message.reply('Lütfen Bir Sayı Girin.')
      if (args < 2 || args > 100) return message.reply('Lütfen 2 ile 100 arasında bir sayı giriniz.')
      message.channel.bulkDelete(Number(args))
      const { MessageEmbed } = require ('discord.js')
      const embed = new MessageEmbed()
      .setTitle('Başarıyla Mesajlar silindi.')
      .setDescription('Silinen Mesaj Sayısı:' + args)
      message.channel.send(embed).then(mesaj => {
        setTimeout(function () {
          mesaj.delete()
        }, 5000);
    })
  }
}
