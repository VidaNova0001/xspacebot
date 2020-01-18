const Discord = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()

module.exports.run = async (client, message, args) => {


    let ref = await database.ref(`Economia/${message.author.id}`)
    let snap = await ref.once('value')

    if(snap.val() == null){
      return message.channel.send(`<:erro:664956331643371532> O nosso sistema de economia é protegido com um registro. Para se registrar, você deve digitar: \`registrar\``)
    } else {

        let coins = snap.val().coins
        let banco = snap.val().banco

        let coinsembed = new Discord.RichEmbed()
        .setAuthor(`Dinheiro de ${message.author.username}`, `https://cdn.discordapp.com/emojis/654335597527171072.png?v=1`)
        .setDescription(`\n\u200b\n💸 Dinheiro: ${coins}⠀⠀⠀⠀⠀⠀🏦 Banco: ${banco}⠀⠀⠀⠀⠀⠀💰 Total: ${parseInt(coins + banco)}⠀⠀⠀⠀⠀⠀\n\u200b`)
        .setFooter(`CashMarket - Economia`, message.author.avatarURL)
        .setTimestamp()
        .setColor(`#87A814`)
        .setThumbnail(`https://pngimage.net/wp-content/uploads/2018/05/banco-png.png`)

        message.channel.send(coinsembed)

    }
    
  }