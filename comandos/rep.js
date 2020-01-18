const Discord = require('discord.js')
const talkedRecently = new Set();
const firebase = require('firebase');

module.exports.run = async (client, message, args, database) => {

    let ValorRep = 1;

    if (talkedRecently.has(message.author.id)) {
        message.channel.send(`🕛 ${message.author} este comando contém **12 horas** de cooldown!`);
    } else {

    let membro = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!membro) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe!\nArgumento em falta: \`{@usuario}\``);

    if(membro.id == message.author.id){
        return message.channel.send(`<:erro:664956331643371532> Que malandro, quer atribuir reputação a você mesmo?`)
    }

    if(membro.id == client.user.id){
        return message.channel.send(`<:erro:664956331643371532> Ohn, que fofinho, quer me atribuir reputação?\nÉ... infelizmente ninguém me pode atribuir reputação.`)
    }

        database.ref(`Aplicação/Reputacao/${message.guild.id}/${membro.user.id}`)
        .once('value').then(async function(snap) {
            if(snap.val() == null){
                firebase.database().ref(`Aplicação/Reputacao/${membro.user.id}`)
                .set({
                    reputacao: 1,
                });

                message.channel.send(`<:reputacao:665674098696912906> O usuário(a) ${message.author}, atribuiu **1 nível** de reputação para ${membro}, que contém agora **1 nível** de reputação!`)

            } else {

    rep = parseInt(snap.val().reputacao + ValorRep);

    database.ref(`Aplicação/Reputacao/${membro.user.id}`)
    .update({
        reputacao: rep
    });

    message.channel.send(`<:reputacao:665674098696912906> O usuário(a) ${message.author}, atribuiu **+1 nível** de reputação para ${membro}, que contem agora **${rep} níveis** de reputação!`)

    }
        })

        talkedRecently.add(message.author.id);
        setTimeout(() => {
    
          talkedRecently.delete(message.author.id);
        }, 12 * 60 * 60 * 1000);
      }

}