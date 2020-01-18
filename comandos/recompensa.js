const Discord = require('discord.js')
const firebase = require('firebase')
const moment = require("moment");
const fs = require('fs')

module.exports.run = async (client, message, args, database) => {

    let daily = 200;

    let ref = await database.ref(`Economia/${message.author.id}`)
    let snap = await ref.once('value') 

    if(snap.val() == null){
        return message.channel.send(`<:erro:664956331643371532> O nosso sistema de economia é protegido com um registro. Para se registrar, você deve digitar: \`registrar\``)
    } else {

    if(snap.val().lastDaily == moment().format('L')){
        return message.channel.send(`🕐 Este comando contém um cooldown de **__1 dia__**, então aguarde para executa-lo novamente.`);
    } else {
        
    let coins = snap.val().coins

    var dailytotal = parseInt(coins + daily)
    database.ref(`Economia/${message.author.id}`)
    .update({
        coins: dailytotal,
        lastDaily: `${moment().format('L')}`
    });

    message.channel.send(`<:dinheiro:654335597527171072> Você pegou **__200 coins__** de recompensa diária.`)

    } 
}

}
