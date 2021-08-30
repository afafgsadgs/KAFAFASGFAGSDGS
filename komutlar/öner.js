module.exports = {
    kod: "botöneri",
    async run (client, message, args) {
        const önerimesajı = message.content.split(' ').slice(1)
        const öneri = önerimesajı.join(" ")
        const kanal = client.channels.cache.find(ch => ch.id === '848814738250137601')
        kanal.send(öneri + ' - ' + message.author.tag + ' - ' + message.guild.name + ' Sunucusundan önerdi.')
        message.channel.send('Öneririniz Aalınmıştır :D')
    }
}
