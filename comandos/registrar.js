const Discord = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let ref = await database.ref(`Economia/${message.author.id}`)
    let snap = await ref.once('value') 

    if(snap.val() == null){

        database.ref(`Economia/${message.author.id}`)
        .update({
            coins: 0,
            banco: 0
        });

        message.channel.send(`<:correto:664956325427544078> Você tem agora acesso ao meu sistema de economia!`)

    } else {
        return message.channel.send(`<:erro:664956331643371532> Você já se registrou anteriormente!`)
    }
 

}