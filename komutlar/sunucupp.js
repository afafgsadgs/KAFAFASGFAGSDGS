const Discord = require('discord.js')


module.exports = {
    kod: ["sunucupp", "sunucu-avatar", "sunucuavatar"],
    async run (client, message, args) {
        let guild = message.guild

        const embed = new Discord.MessageEmbed()
        .setTitle("Sunucunun Avatarı")
        .setImage(guild.iconURL({dynamic: true}))
        .setFooter('Eğer Burası Boşluksa Avatar Yoktur.')
        message.channel.send(embed)
    }

}