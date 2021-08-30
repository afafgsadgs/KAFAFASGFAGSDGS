module.exports = {
  kod: "kick",
  async run (client, message, args) {
    if (!message.guild) {
      return message.author.send("**Bu komudu dmden kullanamazsın sunucuda kullanmayı dene!!** :X:"); }
      let guild = message.guild
      let user = message.mentions.users.first();
      if (message.mentions.users.cache < 1) return message.reply('**Kimi kickleyeceğim?**').catch(console.error);
      if (!message.guild.member(user).kickable) return message.reply('**Bu kişiyi kickleyemiyorum** :(');
      message.guild.member(user).kick();
    
      
      return message.channel.send("**Başarıyla Kicklendi :white_check_mark:**")
    }
  }
