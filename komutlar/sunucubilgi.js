const { MessageEmbed } = require('discord.js')
module.exports = {
    kod: "sunucu-bilgi",
    async run (client, message, args){
        var guild = message.guild
        var kanallar = guild.channels.cache
        var üyeler = guild.members.cache
        var emojiler = guild.emojis.cache
        var roller = guild.roles.cache
        var embed = new MessageEmbed()
        .setTitle(`${guild.name} adlı sunucunun bilgileri`)
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addField('**TEMEL  BILGILER**', [
            `**Sunucu Adı:** ${guild.name}`,
            `**Sunucu AD'si:** ${guild.id}`,
            `**Sunucu Sahibi:** <@${guild.owner.id}>`,
            `**Sunucu Sahibi Tagı:** ${guild.owner.user.tag}`
        ])
        .addField('**İSTATİSTİKLER**', [
            `**üye Sayısı:** ${guild.memberCount}`,
            `**İnsan Sayısı:** ${üyeler.filter(üye => !üye.user.bot).size}`,
            `**Bot Sayısı:** ${üyeler.filter(üye => üye.user.bot).size}`,
            `**Emoji Sayısı:** ${emojiler.size}`,
            `**Rol Sayısı:** ${roller.filter(rol => rol.name !== '@everyone').size}`,
            `**Kanal Sayısı:** ${kanallar.size}`,
            `**Metin Kanalı Sayısı:** ${kanallar.filter(kanal => kanal.type === 'text').size}`,
            `**Ses Sayısı:** ${kanallar.filter(kanal => kanal.type === 'voice').size}`,
            `**Kategori Sayısı:** ${kanallar.filter(kanal => kanal.type === 'category').size}`
        ])
        .addField('**DURUMLAR**', [
            `**Çevrimiçi:** ${üyeler.filter(üye => üye.presence.status === 'online').size}`,
            `**Boşta:** ${üyeler.filter(üye => üye.presence.status === 'idle').size}`,
            `**Rahatsız Etmeyin:** ${üyeler.filter(üye => üye.presence.status === 'dnd').size}`,
            `**Çevrimdışı:** ${üyeler.filter(üye => üye.presence.status === 'offline').size}`
        ])
        message.channel.send(embed)
    }
}