module.exports = {
    kod: "tdk",
  async run (client, message, args){
    const tdk = require('trsozluk')
    const { MessageEmbed } = require('discord.js')
    if (!args[0]) return message.reply("Lütfen aratmak istediğiniz kelimeyi yazın.")
    try {
    const kelime = await tdk(args[0])
    const embed = new MessageEmbed()
    .setDescription('**' + args[0] + '** adlı kelimenin bilgileri.')
    .addField('Anlam', kelime.anlam)
    .addField('İkinci Anlam', kelime.anlam2)
    .addField('Ücüncü Anlam', kelime.anlam3)
    .addField('Dördüncü Anlam', kelime.anlam4)
    .addField('Beşinci Anlam', kelime.anlam5)
    .addField('Kelimenin Kullanım Örneği', kelime.ornek, true)
    .addField('Kelime Çoğul mu?', kelime.cogul, true)
    .addField('Kelime Özel mi?', kelime.ozel, true)
    .addField('Kelimenin Telaffuzu', kelime.telaffuz, true)
    message.channel.send(embed)
    } catch {
      message.channel.send('Yazdığın kelimeyi sözlükte bulamadım.')
    }
  } 
}