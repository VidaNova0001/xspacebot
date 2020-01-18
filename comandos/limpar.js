const Discord = require('discord.js')

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) 
    return message.channel.send(`<:permissao:665631314019483651> Você não tem permissão para executar esse comando!\nPermissão necessária: \`Gerênciar Mensagens\``)


    let mensagemDeletar = args.slice(0).join(" ");
    if(mensagemDeletar < 2 || mensagemDeletar > 100) message.channel.send(`<:erro:664956331643371532> Você só pode deletar de **__2 a 100__** mensagens!`);
    if(args.lengt === 0) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nArgumento em falta: \`{número}\``);
    if(isNaN(mensagemDeletar)) return message.channel.send(`<:erro:664956331643371532> O número de mensagens deve ser entregue em números!`)

    try {
        message.channel.bulkDelete(mensagemDeletar)
        message.channel.send(`📌 O chat foi limpo por ${message.author.tag}, foram excluidas ${mensagemDeletar} mensagens!`).then(msg => msg.delete(5000));
    } catch (e) {
        console.log(e);
    }
}

