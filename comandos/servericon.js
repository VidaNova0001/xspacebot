const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    let embed = new Discord.RichEmbed()
    .setAuthor(`Icon de ${message.guild.name}`, `https://cdn.discordapp.com/emojis/488756986641645569.gif?v=1`)
    .setImage(message.guild.iconURL)
    .setColor(`RED`)

    message.channel.send(embed)

}