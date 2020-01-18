const Discord = require('discord.js')

module.exports.run = async (client, message, args, database) => {

    let usuario = message.guild.member(message.mentions.users.first()) || message.author;

    let ref = await database.ref(`Conquistas/${usuario.id}/Lua`)
    let snap = await ref.once('value')

    if(snap.val() == null){
        return message.channel.send(`<:erro:664956331643371532> Esse usuário, ou você, não contêm nenhuma conquista!`)
    } else {

        let horário = snap.val().horário
        
        let conquistas = new Discord.RichEmbed()
        .setAuthor(`Conquistas de ${usuario.username}`, `https://cdn.discordapp.com/emojis/666755459893428224.png?v=1`)
        .setDescription(`\n\u200b\n🌑 Lua: Conquistada\n🕐 Horário: ${horário}\n\nO horário indica quando você pisou a lua pela primeira vez! Achamos que você deve ter essa informação para se gloriar e falar para seus amigos.\n\u200b`)
        .setFooter(`CashMarket - Conquistas`, usuario.avatarURL)
        .setThumbnail('https://cdn.discordapp.com/emojis/666755459893428224.png?v=1')
        .setColor(`#FFB800`)
        .setTimestamp()

        message.channel.send(conquistas)

    }




}