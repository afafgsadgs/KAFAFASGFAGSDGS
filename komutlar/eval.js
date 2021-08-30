module.exports = {
  kod: "eval",
  async run (client, message, args) {
    let { MessageEmbed } = require('discord.js')
    if (!args[0]) return message.channel.send("Lütfen çalıştırılacak kodu girin.")
    if (message.author.id !== "689434266870087721") return message.channel.send("Bu komutu sadece benim sahibim kullanabilir.")
    try {
    let komut = eval(args.join(" "))
    let potansiyelÇıktılar = ["string", "bloolean", "number", "float"]
    if (potansiyelÇıktılar.includes(typeof komut)){
      let embed = new MessageEmbed()
      .setDescription("**Başarılı**")
      .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
      .addField("Çıktı", "```js\n" + komut + "\n```")
      .setColor("GREEN")
      message.channel.send(embed)
      message.channel.react("👍")
    } else {
      let embed = new MessageEmbed()
      .setDescription("**Başarılı**")
      .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
      .addField("Çıktı", "```\n" + "Eylem Gerçekleşdi" + "\n```")
      .setColor("GREEN")
      message.channel.send(embed)
      message.channel.react("👍")
    }
  } catch(err) {
    let embed = new MessageEmbed()
    .setDescription("**HATA**")
    .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
    .addField("HATA", "```\n" + err + "\n```")
    .setColor("RED")
    message.channel.send(embed)
    message.channel.react("👎")
  }
  }
}
