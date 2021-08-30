module.exports = {
  kod: "modül",
  async run (client, message, args) {
    message.channel.send('Kodlar belli.\nmodule.exports = {\n  kod: "KOD",\n  async run (client, message, args) {\n//Kodunuz\n  }\n}')
  }
}
