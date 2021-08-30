module.exports = {
  kod: "sahte-mesaj",
  async run (client, message, args) {
    const user = message.mentions.users.first()
    if (!user) return message.channel.send("Bir kullanıcı etiketle.")
    if (user.bot) return message.channel.send("Bot yerine kullanıcıyı etiketle.")
    if (!args[1]) return message.channel.send("Bir mesaj belirtiniz.")
    const messaj = args.slice(1).join(" ")
    message.delete()
    const webhook = await message.channel.createWebhook(user.username, {
      reason: "Eğelence",
      avatar: user.displayAvatarURL()
    })
    webhook.send(mesaj)
    setTimeout(() => {
    webhook.delete()
  }, 2000)
  }
}
