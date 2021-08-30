const fetch = require('node-fetch')
exports.run = async (client, message, args) => {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["Yeni başarım kazandın!", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;
  message.delete();
  if(title.lengt> 22 || contents.length > 22) return message.edit("Maksimum 22 karakter kullanabilirsiniz.").then(message.delete.bind(message), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  const res = fetch(url)
   .then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["başarım"]
};
exports.help = {
  name: 'mcödül',
  description: 'Minecraft Achievement',
  usage: 'achievement'
};