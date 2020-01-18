const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    let premium = args.join(" ")
    if(!premium) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe!\nArgumento em falta: \`{premium}\``)

    message.channel.send(`${message.author}`)
    message.channel.send({
        files: [`https://mc-heads.net/head/${premium}.png`]
    })

}