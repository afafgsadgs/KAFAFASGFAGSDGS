const Discord = require('discord.js') // discord.js modülü tanımlıyoruz.
const client = new Discord.Client() // client tanımalamsı
const { readdirSync } = require('fs'); // tanımlamalar
const ayarlar = require('./ayarlar.json');
const { join } = require('path'); // tanımlamalar
const play = require('discordjs-ytdl');
const ms = require("ms");
const db = require('./database');
const fs = require('fs');
const moment = require('moment');

client.commands= new Discord.Collection(); // komutları alıyoruz
client.cooldown= new Discord.Collection();
client.sunucutanıt= new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); // Belli bir klasörden belli .js uzantılı dosyaları buluyor.

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    if (typeof command.kod === 'object'){
      command.kod.forEach(x => {
        client.commands.set(x, command)
      })
    } else {
      client.commands.set(command.kod, command)
    }
}

client.on("error", console.error);

client.on('ready', () => {
 client.user.setActivity(`${client.guilds.cache.size} Sunucu + ${client.users.cache.size} Kullanıcı!`);
    console.log('Botumuz Aktif')
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(!message.guild){
      var prefix = "!"
    } else if (db.kontrol("prefix" + message.guild.id)){
      var prefix = db.bul("prefix" + message.guild.id)
    } else {
      var prefix = "!"
    }
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;

        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.aliases = new Discord.Collection();
fs.readdir('./command/', (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        let props = require(`./command/${f}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./command/${command}`)];
            let cmd = require(`./command/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./command/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./command/${command}`)];
            let cmd = require(`./command/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply(' Aleyküm Selam , nasılsın.');
  }
});

client.on('message', message => {
  if(message.content.toLowerCase() === "slm" ) return message.channel.send('Sanada selam.');
  if(message.content.toLowerCase() === "selam" ) return message.channel.send('Sanada selam.');
  if(message.content.toLowerCase() === "nasılsın") return message.channel.send("İyidir senden");
  if(message.content.toLowerCase() === "merhaba") return message.channel.send("Sanada merhaba");
  if(message.content.toLowerCase() === "iyiyim sen nasılsın" ) return message.channel.send('Bende iyiyim nasıl olsun hayat gidiyor onun bunun isteğiyle.');
  if(message.content.toLowerCase() === "iyidir senden" ) return message.channel.send('Bende iyiyim nasıl olsun hayat gidiyor onun bunun isteğiyle.');
  if(message.content.toLowerCase() === "Ne yapıyorsunuz") return message.channel.send("işte onun bunun işine koşuyorum.");
  if(message.content.toLowerCase() === "ne oynayak") return message.channel.send("Benim için hava hoş.");
  if(message.content.toLowerCase() === "ne oynayalım") return message.channel.send("Benim için hava hoş.");
  if(message.content.toLowerCase() === "minecraft oyanyak") return message.channel.send("Nick at.");
  if(message.content.toLowerCase() === "minecraft oyanyalım") return message.channel.send("Nick at.");
  if(message.content.toLowerCase() === "çökertme") return message.channel.send("!çökertme");
})

client.on("message", async message => {
  if (!message.guild) return;
  if (message.content !== "<@!857961097134080030>") return;
  const prefix = db.kontrol("prefix" + message.guild.id) ? db.bul("prefix" + message.guild.id) : "!"
  message.reply(`bu sunucudaki prefix'im **${prefix}**`)
})

client.on("message", message => {
  if (!message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_CHANNELS") || message.member.hasPermission("MANAGE_MESSAGES")) return;
  if (!message.guild) return;
  const etiketler = [...message.mentions.members]
  if (etiketler < 1) return;
  if (!db.kontrol("yetkilietiket" + message.guild.id)) return;
  etiketler.forEach(user => {
    const member = message.guild.members.cache.get(user[0])
    if (member.hasPermission("ADMINISTRATOR")) {
      message.delete()
      const embed = new MessageEmbed()
      .setTitle('Yetkili etiketlemek yasak.')
      .setColor("RANDOM")
      return message.channel.send(embed)
    }
  })
})

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (!db.kontrol("logkanal" + message.guild.id)) return;
  const logid = db.bul("logkanal" + message.guild.id)
  const logkanalı = message.guild.channels.cache.get(logid)
  const { MessageEmbed } = require('discord.js')
  const embed = new MessageEmbed()
  .setTitle(`${message.author.tag} kişisinin mesajı silindi.`)
  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
  .setColor("YELLOW")
  .addField("Mesaj:", message.embeds[0] ? "Bu mesaj embed olduğundan görüntülenemiyor." : message.content)
  .addField("Kanal:", "<#" + message.channel.id + ">")
  .addField("Mesaj ID:", message.id)
  .addField("Mesaj Sahibinin ID'si:", message.author.id)
  logkanalı.send(embed)
})

client.on("messageUpdate", (eski, yeni) => {
  if (eski.author.bot) return;
  if (!db.kontrol("logkanal" + eski.guild.id)) return;
  const logid = db.bul("logkanal" + eski.guild.id)
  const logkanalı = eski.guild.channels.cache.get(logid)
  const { MessageEmbed } = require('discord.js')
  const embed = new MessageEmbed()
  .setTitle(`${eski.author.tag} kişisinin mesajı değiştirildi.`)
  .setThumbnail(eski.author.displayAvatarURL({dynamic: true}))
  .setColor("YELLOW")
  .addField("Eski Mesaj:", eski.embeds[0] ? "Bu mesaj embed olduğundan görüntülenemiyor." : eski.content)
  .addField("Yeni Mesaj:", yeni.embeds[0] ? "Bu mesaj embed olduğundan görüntülenemiyor." : yeni.content)
  .addField("Kanal:", "<#" + eski.channel.id + ">")
  .addField("Mesaj ID:", eski.id)
  .addField("Mesaj Sahibinin ID'si:", eski.author.id)
    logkanalı.send(embed)
})

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.kontrol("anti-capslock" + msg.guild.id)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`:x: ${msg.author}, bre susak capslock kapat.`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

client.on("roleCreate", role => {
  // if (!logA[role.guild.id]) return;

  if (!db.kontrol("logkanal" + role.guild.id)) return;

  const logid = db.bul("logkanal" + role.guild.id)
  const kanal = role.guild.channels.cache.get(logid)

  const { MessageEmbed } = require('discord.js')
  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
    .addField("Rolün", `\`${role.name}\``, true)
    .addField("Rolün Renk Kodu", `${role.hexColor}`, true)
  kanal.send(embed)
});

client.on("roleDelete", role => {
  // if (!logA[role.guild.id]) return;

   if (!db.kontrol("logkanal" + role.guild.id)) return;

  const logid = db.bul("logkanal" + role.guild.id)
  const kanal = role.guild.channels.cache.get(logid)

  const { MessageEmbed } = require('discord.js')
  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
    .addField("Rolün Adı", `\`${role.name}\``, true)
    .addField("Rolün Renk Kodu", `${role.hexColor}`, true)
  kanal.send(embed)
});

client.on("roleUpdate", role => {
  // if (!logA[role.guild.id]) return;

  if (!db.kontrol("logkanal" + role.guild.id)) return;

  const logid = db.bul("logkanal" + role.guild.id)
  const kanal = role.guild.channels.cache.get(logid)

  const { MessageEmbed } = require('discord.js')
  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
    .addField("Rolün Adı", `\`${role.name}\``, true)
    .addField("Rolün Renk Kodu", `${role.hexColor}`, true);
  kanal.send(embed)
});


client.on("messageUpdate", async newmsg => {
    if (newmsg.channel.type === "dm") return;
      if(newmsg.author.bot) return;  
        if (newmsg.content.length > 4) {
         if (db.kontrol("anti-capslock" + message.guild.id)) {
           let caps = newmsg.content.toUpperCase()
           if (newmsg.content == caps) {
             if (!newmsg.member.hasPermission("ADMINISTRATOR")) {
               if (!newmsg.mentions.users.first()) {
                 newmsg.delete()
                 return newmsg.channel.send(`:x: ${newmsg.author}, bre susak capslock kapat.`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

client.on("messageDeleteBulk", messages => {
  messages = messages.array()
  let örnek_mesaj = messages[0]
  if (!db.kontrol("logkanal" + örnek_mesaj.guild.id)) return;
  const logid = db.bul("logkanal" + örnek_mesaj.guild.id)
  const logkanalı = örnek_mesaj.guild.channels.cache.get(logid)
  const { MessageEmbed } = require('discord.js')
  const mesajlar = messages.map(message => `**${message.author.tag}** | **${message.content}** `)
  mesajlar.slice(0, 1500)
  const embed = new MessageEmbed()
  .setTitle(`${messages.length} mesaj #${örnek_mesaj.channel.name} kanalından silindi.`)
  .setDescription(mesajlar.join("\n"))
  .setColor("GREEN")
  logkanalı.send(embed)
})

client.on("message", message => {
  if (!message.guild) return;
  if (!message.content.toLowerCase().includes("http")) return;
  if (!db.kontrol("reklam" + message.guild.id)) return;
  if (!message.member.hasPermission("ADMINISTRATOR")){
    message.delete(message)
    message.reply("Lütfen reklam yapma.")
  }
})

client.on("guildMemberAdd", member => {
  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (!db.kontrol("gelengidenlogkanalı" + member.guild.id)) return;
  const kanalid = db.bul("gelengidenlogkanalı" + member.guild.id)
  const kanal = member.guild.channels.cache.get(kanalid)
  if (!kanal) return;

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("guildMemberRemove", member => {
  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (!db.kontrol("gelengidenlogkanalı" + member.guild.id)) return;
  const kanalid = db.bul("gelengidenlogkanalı" + member.guild.id)
  const kanal = member.guild.channels.cache.get(kanalid)
  if (!kanal) return;

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on('guildMemberAdd', member => {
  if (member.user.bot){
    if (!db.kontrol("bototorol" + member.guild.id)) return;
    const rol = db.bul("bototorol" + member.guild.id)
    const verilecekrol = member.guild.roles.cache.find(r => r.id === rol)
    member.roles.add(verilecekrol)
    if (!db.kontrol("Otorol-Bototorollogkanal" + member.guild.id)) return;
    const logid = db.bul("Otorol-Bototorollogkanal" + member.guild.id)
    const logkanalı = member.guild.channels.cache.get(logid)
    const embed = new Discord.MessageEmbed()
    .setTitle('Başarıyla bot-otorol verildi')
    .setDescription(`<@${member.id}> botuna başarıyla <@&${rol}> adlı rol verildi.`)
    .setColor('GREEN')
    logkanalı.send(embed)
  } else {
  if (!db.kontrol("otorol" + member.guild.id)) return;
  const rol = db.bul("otorol" + member.guild.id)
  const verilecekrol = member.guild.roles.cache.find(r => r.id === rol)
  member.roles.add(verilecekrol)
  if (!db.kontrol("Otorol-Bototorollogkanal" + member.guild.id)) return;
  const logid = db.bul("Otorol-Bototorollogkanal" + member.guild.id)
  const logkanalı = member.guild.channels.cache.get(logid)
  const embed = new Discord.MessageEmbed()
  .setTitle('Başarıyla otorol verildi')
  .setDescription(`<@${member.id}> kişisine başarıyla <@&${rol}> adlı rol verildi.`)
  .setColor('GREEN')
  logkanalı.send(embed)
}
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'mal') {
    msg.delete()
    msg.reply(' Bu kelimeyi kullanmak yasak lütfen bir daha kullanma.');
  }
})

client.on('message', message => {
  if (!message.guild) return;
  const args1 = message.content.split(' ').slice(2)
  const neden = args1.join(" ")
  const prefix = db.kontrol("prefix" + message.guild.id) ? db.bul("prefix" + message.guild.id) : "!"
  if (message.content.toLowerCase() === prefix + 'kick') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
            const logid = db.bul("logkanal" + eski.guild.id)
            const logkanalı = eski.guild.channels.cache.get(logid)
            if (!logkanalı) return;
            const embed = new MessageEmbed()
            .setDescription(`${member} Adlı üye Sunucudan Atıldı.`)
            .addField('Üye ID:', member.id)
            .addField('Atılma Nedeni:', neden)
            .addField('Üyeyi Atan Mod:', '<@' + message.author.id + '>')
            logkanalı.send(embed);
          })
      } else {
        message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
      }
    } else {
      message.reply("Atılacak kişiyi yazmadın");
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;
  const args1 = message.content.split(' ').slice(2)
  const neden = args1.join(" ")
  const prefix = db.kontrol("prefix" + message.guild.id) ? db.bul("prefix" + message.guild.id) : "!"
  if (message.content.toLowerCase() === prefix + 'ban') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
            const logid = db.bul("logkanal" + eski.guild.id)
            const logkanalı = eski.guild.channels.cache.get(logid)
            if (!logkanalı) return;
            const embed = new MessageEmbed()
            .setDescription(`${member} Adlı üye Sunucudan Banlandı.`)
            .addField('Üye ID:', member.id)
            .addField('Banlanma Nedeni:', neden)
            .addField('Üyeyi Banlayan Mod:', '<@' + message.author.id + '>')
            logkanalı.send(embed);
          })
      } else {
        message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
      }
    } else {
      message.reply("Banlanıcak kişiyi yazmadın.");
    }
  }
});

client.on("roleDelete", async role => {
  if (db.koruma(`synx_${role.guild.id}`)) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.guild.roles.create({
      data: {
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        permissions: role.permissions,
        mentionable: role.mentionable,
        position: role.position
      },
      reason: "Silinen Roller Tekrar Açıldı."
    });
  }
});

//

client.on("roleCreate", async role => {
  if (db.kontrol(`synx_${role.guild.id}`)) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.delete();
  }
});

//

client.on("channelDelete", async function(channel) {

  if (db.kontrol(`kanalk_${channel.guild.id}`)) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;

    channel.clone().then(z => {
      let kanal = z.guild.channels.find(c => c.name === z.name);
      kanal.setParent(
        kanal.guild.channels.find(channel => channel.id === channelp)
      );
    });
  }
});

//

client.on("emojiDelete", async (emoji, message, channels) => {
  if (db.kontrol(`emojik_${emoji.guild.id}`)) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == emoji.guild.owner.id) return;
    if (
      !emoji.guild.members.cache
        .get(entry.executor.id)
        .hasPermission("ADMINISTRATOR")
    ) {
      emoji.guild.emojis
        .create(`${emoji.url}`, `${emoji.name}`)
        .catch(console.error);
    }
  }
});

client.on("message", async msg => {
  if (db.kontrol(`${msg.guild.id}.kufur`)) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Heey! Küfür Yasak.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!db.kontrol(`${msg.guild.id}.kufur`)) return;
});

client.on("messageUpdate", async msg => {
  if (db.kontrol(`${msg.guild.id}.kufur`)) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Yakaladım Seni! Küfür Yasak.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!db.kontrol(`${msg.guild.id}.kufur`)) return;
});

client.login('ODU3OTYxMDk3MTM0MDgwMDMw.YNXMiQ.d7wmzyJnwQX9Z0pHJqdBAMluNH4')
