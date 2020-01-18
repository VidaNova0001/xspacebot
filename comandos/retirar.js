const Discord = require('discord.js')
const firebase = require('firebase')

module.exports.run = async (bot, message, args, database) => {

    let ref = await database.ref(`Economia/${message.author.id}`)
    let snap = await ref.once('value') 

    if(snap.val() == null){
        return message.channel.send(`<:erro:664956331643371532> O nosso sistema de economia é protegido com um registro. Para se registrar, você deve digitar: \`registrar\``)
      } else {
  
    var quantidade = parseInt(args.join(' '))
    if(!quantidade) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe!\nArgumento em falta: \`{quantidade}\``)
    if(isNaN(quantidade)) return message.channel.send(`<:erro:664956331643371532> A quantidade deve ser entregue como um número.`)

    let coins = snap.val().coins
    let banco = snap.val().banco

    if(quantidade > banco){
        return message.channel.send(`<:erro:664956331643371532> Você não contém esse número de coins no banco para retirar.`)
    } else {

let bancototal = parseInt(banco - quantidade);
database.ref(`Economia/${message.author.id}`)
.update({
banco: bancototal
});
 
let coinstotal = parseInt(coins + quantidade)

database.ref(`Economia/${message.author.id}`)
.update({
coins: coinstotal
});

message.channel.send(`🏦 Você retirou **__${quantidade} coins__** do seu banco!`)

}
      }
}
