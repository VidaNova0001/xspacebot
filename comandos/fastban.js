const Discord = require('discord.js')

module.exports.run = async (client, message, args, database) => {

    let ref = await database.ref(`Configuração/${message.guild.id}/Canais/Punições`)
    let snap = await ref.once('value')

    if(message.member.hasPermission("BAN_MEMBERS")){

    if(snap.val() == null){

        let usuário = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!usuário) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nUse: \`ban {@usuario/id}\``)

        if(usuário.id == message.author.id){
            return message.channel.send(`<:erro:664956331643371532> Você não pode se banir a você mesmo!`)
        }

        if(!message.guild.member(usuário).bannable) return message.channel.send(`<:erro:664956331643371532> Eu não tenho permissões para banir esse usuário!`); 
        usuário.ban();
        message.channel.send(`<:ban:666770669568262164> O usuário \`${usuário.user.tag}\` (ID: \`${usuário.id}\`) foi banido por \`${message.author.tag}\`!`)
        
        } else {

        let punicoes = message.guild.channels.get(`${snap.val().canal}`)
                
        let usuário = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!usuário) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nUse: \`ban {@usuario/id}\``)

        if(usuário.id == message.author.id){
            return message.channel.send(`<:erro:664956331643371532> Você não pode se banir a você mesmo!`)
        }

            if(!message.guild.member(usuário).bannable) return message.channel.send(`<:erro:664956331643371532> Eu não tenho permissões para banir esse usuário!`); 
            usuário.ban();
            punicoes.send(`<:ban:666770669568262164> O usuário \`${usuário.user.tag}\` (ID: \`${usuário.id}\`) foi banido por \`${message.author.tag}\`!`)

            }
        } else {
            return message.channel.send(`<:permissao:665631314019483651> Você não tem permissão para executar esse comando!\nPermissão necessária: \`Banir Membros\``)
        }
}