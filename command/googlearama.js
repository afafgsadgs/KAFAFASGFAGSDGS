const Discord = require('discord.js');
exports.run = async (client, message, args, path) => {
 var arama = args.slice(0).join(' ')
 if(!arama) return message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription('Google de arayacağınız şeyi yazın!'))
 const GoogleArama = new Discord.MessageEmbed()
 .setTitle(`🌍 Sonuçlar Arandı 🌍`)
 .setDescription(`Google`)
 .addField(`Sonucuna ulaşmak için linke tıkla 👉 **https://www.google.com/search?q=${arama}**`)
return message.channel.send(GoogleArama)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['google-ara'],
    permLevel: 0
}

exports.help = {
    name: 'google',
    description: 'Yazdığınız şeyi google da arayır.',
    usage: 'google <arayacağınız şey>'
}