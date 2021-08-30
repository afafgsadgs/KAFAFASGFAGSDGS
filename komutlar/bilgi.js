const moment = require('moment')
const { MessageEmbed } = require('discord.js')
module.exports = {
  kod: "bilgi",
  async run (client, message, args) {
    let üye = message.mentions.users.first()
    if (üye){
      let durum = üye.presence.status
      .replace('online', 'Çevrimiçi')
      .replace('idle', 'Boşta')
      .replace('dnd', 'Rahatsız Etmeyin')
      .replace('ofline', 'Çevrimdışı')
      const embed = new MessageEmbed()
      .setThumbnail(üye.displayAvatarURL({dynamic: true}))
      .setColor('YELLOW')
      .setTitle(üye.username)
      .setDescription(üye.tag + ` kişisinin bilgileri:\n\nKullanıcı Adı: ${üye.username} \nEtiket: ${üye.discriminator} \nID: ${üye.id} \nSon Mesaj: ${üye.lastMessage} \nSon Mesaj ID: ${üye.lastMessageID} \nKullanıcı Bot Mu? ${üye.bot ? 'Evet' : 'Hayır'} \nKullanıcı Aktivitesi: ${üye.presence.activities[0] ? üye.presence.activities[0].state : 'YOK'} \nÜye Durumu: ${durum} \nKuruluş Tarihi: ${moment(üye.createdAt).format('DD')}/${moment(üye.createdAt).format('MM')}/${moment(üye.createdAt).format('YY HH:mm:ss')} \nRoller: ${message.guild.members.cache.get(üye.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' | ')}`)
      message.channel.send(embed)
    } else {
      üye = message.author
      let durum = üye.presence.status
      .replace('online', 'Çevrimiçi')
      .replace('idle', 'Boşta')
      .replace('dnd', 'Rahatsız Etmeyin')
      .replace('ofline', 'Çevrimdışı')
      const embed = new MessageEmbed()
      .setThumbnail(üye.displayAvatarURL({dynamic: true}))
      .setColor('YELLOW')
      .setTitle(üye.username)
      .setDescription(üye.tag + ` kişisinin bilgileri:\n\nKullanıcı Adı: ${üye.username} \nEtiket: ${üye.discriminator} \nID: ${üye.id} \nSon Mesaj: ${üye.lastMessage} \nSon Mesaj ID: ${üye.lastMessageID} \nKullanıcı Bot Mu? ${üye.bot ? 'Evet' : 'Hayır'} \nKullanıcı Aktivitesi: ${üye.presence.activities[0] ? üye.presence.activities[0].state : 'YOK'} \nÜye Durumu: ${durum} \nKuruluş Tarihi: ${moment(üye.createdAt).format('DD')}/${moment(üye.createdAt).format('MM')}/${moment(üye.createdAt).format('YY HH:mm:ss')} \nRoller: ${message.guild.members.cache.get(üye.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' | ')}`)
      message.channel.send(embed)
    }
  }
}
