const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    let usuario = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!usuario) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe!\nArgumento em falta: \`{@usuario}\``);

    let avatar = new Discord.RichEmbed()
    .setAuthor(`Avatar de ${usuario.user.username}`, `https://cdn.discordapp.com/emojis/662310558510350356.png?v=1`)
    .setDescription(`\n\u200bClique [aqui](${usuario.user.avatarURL}) para baixar o avatar.\n\u200b`)
    .setImage(usuario.user.avatarURL)
    .setColor(`#FFB800`)

    message.channel.send(avatar)

}