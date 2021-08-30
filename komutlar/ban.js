const Discord = require("discord.js");
module.exports = {
  kod: "ban",
  async run (client, message, args) {
    if (!message.guild) {
      return message.author.send("**Bu komudu dmden kullanamazsın sunucuda kullanmayı dene!!** :X:"); }
      let guild = message.guild
      let user = message.mentions.users.first();
      if (message.mentions.users.cache < 1) return message.reply('**Kimi banliyacağım?**').catch(console.error);
      if (!message.guild.member(user).banable) return message.reply('**Bu kişiyi banlıyamıyorum** :(');
      message.guild.member(user).ban();
    
      
      return message.channel.send("**Başarıyla banlandı :white_check_mark:**")
    }
  }
