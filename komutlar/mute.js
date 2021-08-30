const db = require('../database.js');
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
    kod: "mute",
  async run (client, message, args){
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Yetkin yok.')
    if (!db.kontrol('muterol' + message.guild.id)) return message.reply(' Bu komutu kullanabilmek için mute rolü ayarlaman gerek.')
    let member = message.mentions.members.first();
    if(!member) return message.reply(`:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
    let muterol = db.bul("muterol" + message.guild.id);
    
    let mutezaman = args[1]
    .replace(`sn`, `s`)
    .replace(`dk`, `m`)
    .replace(`sa`, `h`)
    .replace(`g`, `d`)
  
    if(!mutezaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
  
    await(member.roles.add(muterol));
    message.channel.send(`<@${member.id}> kullanıcısı ${args[1]} süresi boyunca mutelendi!`);
  
    setTimeout(function(){
        member.roles.remove(muterol);
      message.channel.send(`<@${member.id}> kullanıcısının mutesi sona erdi.`);
    }, ms(mutezaman));
  }
}