const { MessageEmbed } = require('discord.js')
module.exports = {
    kod: "rolbilgi",
    async run (client, message, args){
        const rol = message.mentions.roles.first()
        if (!rol){
        const embed = new MessageEmbed()
        .setDescription(`${rol.name} rolü hakkındaki bigiler`)
        .addField('Rolün İsmi', rol.name, true)
        .addField('Rolün IDsi', rol.id, true)
        .addField('Rolün Rengi', rol.hexColor, true)
        .addField('Rol Entegrasyon mu?', rol.managed ? "evet" : "hayır", true)
        .addField('Rolden Bahsedilebilir mi?', rol.mmentionable ? "evet" : "hayır", true)
        .addField('Rolün Sırası', rol.position, true)
        .addField('Bu Rol Kaç Kişide Var?', rol.members.size, true)
        .setFooter('Bu Rol Şu Tarihte Oluşturulddu => ')
        .setTimestamp(rol.createdTimestamp)
        message.channel.send(embed)
        } else {
            var role = nessage.guild.roles.cache.find(r => r.name === args.join(" "))
            if (!role) role = message.guild.roles.cache.find(r => r.id === args.join(" "))
            if (!role) return message.channel.send('Bu yazdığınız rolü bulamadım.')
            const embed = new MessageEmbed()
            .setDescription(`${role.name} rolü hakkındaki bigiler`)
            .addField('Rolün İsmi', role.name, true)
            .addField('Rolün IDsi', role.id, true)
            .addField('Rolün Rengi', role.hexColor, true)
            .addField('Rol Entegrasyon mu?', role.managed ? "evet" : "hayır", true)
            .addField('Rolden Bahsedilebilir mi?', role.mentionable ? "evet" : "hayır", true)
            .addField('Rolün Sırası', role.position, true)
            .addField('Bu Rol Kaç Kişide Var?', role.members.size, true)
            .setFooter('Bu Rol Şu Tarihte Oluşturulddu => ')
            .setTimestamp(role.createdTimestamp)
            message.channel.send(embed)
        }
    }
}