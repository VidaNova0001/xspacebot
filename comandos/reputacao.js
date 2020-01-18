module.exports.run = async (client, message, args, database) => {

    let membro = message.guild.member(message.mentions.users.first()) || message.author

    let ref = await database.ref(`Aplicação/Reputacao/${membro.id}`)
    let snap = await ref.once('value')

    if(snap.val() == null){
        return message.channel.send(`<:erro:664956331643371532> Esse usuário, ou você, não contêm nenhum nível de reputação!`)
    } else {

    let rep = snap.val().reputacao
    message.channel.send(`<:reputacao:665674098696912906> O usuário, ${membro.user.tag}, contém **${rep} nível(eis)** de reputação.`)

    }


}