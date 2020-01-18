const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(`<:permissao:665631314019483651> Você não contém permissão para executar este comando.\nPermissão necessária: \`Gerênciar Mensagens\`.`);

    message.delete();

    let argumento = args.join(' ')
    if(!argumento) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe!\nArgumento em falta: \`{texto}\``).then(msg => msg.delete(5000));

    message.channel.send(`${argumento}`)


}