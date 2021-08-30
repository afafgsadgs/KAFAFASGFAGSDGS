module.exports = {
  kod: "sahip",
  async run (client, message, args) {
    if (message.author.id !== "689434266870087721") {
      message.channel.send("Sen benim sahibim değilsin.")
    } else {
      message.channel.send("Sen benim sahibimsin.")
    }
  }
}
