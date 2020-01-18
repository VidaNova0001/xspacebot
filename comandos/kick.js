const Discord = require('discord.js')

module.exports.run = async (client, message, args, database) => {

    let ref = await database.ref(`Configuração/${message.guild.id}/Canais/Punições`)
    let snap = await ref.once('value')

    if(message.member.hasPermission("KICK_MEMBERS")){

    if(snap.val() == null){

        let usuário = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!usuário) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nUse: \`kick {@usuario/id} {motivo}\``)

        if(usuário.id == message.author.id){
            return message.channel.send(`<:erro:664956331643371532> Você não pode se expulsar a você mesmo!`)
        }

        let motivo = args.slice(1).join(' ')
        if(!motivo) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nUse: \`kick {@usuario/id} {motivo}\``)

        if(!message.guild.member(usuário).bannable) return message.channel.send(`<:erro:664956331643371532> Eu não tenho permissões para expulsar esse usuário!`); 

        message.channel.send(`Você está prestes a expulsar o(a) usuário(a) \`${usuário.user.tag}\` (ID: \`${usuário.id}\`), para confirmar sua ação clique na reação abaixo.\nCaso você queira expulsar o usuário de uma forma rápida... sem confirmação, use o comando \`fastkick {@usuario}\`, não é necessário um motivo.`).then(async msg => {
        await msg.react('664956325427544078')

            const confirmacao = msg.createReactionCollector((r, u) => r.emoji.id === "664956325427544078" && u.id === message.author.id, { time: 50000 });

            confirmacao.on('collect', async r => {
                msg.delete();
                usuário.kick();
                message.channel.send(`<:ban:666770669568262164> O usuário(a) \`${usuário.user.tag}\` (ID: \`${usuário.id}\`) foi expulso por \`${message.author.tag}\`!\n📋 O motivo apresentado pelo autor foi: \`${motivo}\``)
            });
        });
            } else {

        let punicoes = message.guild.channels.get(`${snap.val().canal}`)
                
        let usuário = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!usuário) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nUse: \`kick {@usuario/id} {motivo}\``)

        let motivo = args.slice(1).join(' ')
        if(!motivo) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nUse: \`kick {@usuario/id} {motivo}\``)

        if(usuário.id == message.author.id){
            return message.channel.send(`<:erro:664956331643371532> Você não pode se banir a você mesmo!`)
        }

        if(!message.guild.member(usuário).bannable) return message.channel.send(`<:erro:664956331643371532> Eu não tenho permissões para expulsar esse usuário!`); 

        message.channel.send(`Você está prestes a expulsar o(a) usuário(a) \`${usuário.user.tag}\` (ID: \`${usuário.id}\`), para confirmar sua ação clique na reação abaixo.\nCaso você queira expulsar o usuário de uma forma rápida... sem confirmação, use o comando \`fastkick {@usuario}\`, não é necessário um motivo.`).then(async msg => {
        await msg.react('664956325427544078')
    
        const confirmacao = msg.createReactionCollector((r, u) => r.emoji.id === "664956325427544078" && u.id === message.author.id, { time: 50000 });

            confirmacao.on('collect', async r => {
                msg.delete();
                usuário.kick();
                punicoes.send(`<:ban:666770669568262164> O usuário(a) \`${usuário.user.tag}\` (ID: \`${usuário.id}\`) foi expulso por \`${message.author.tag}\`!\n📋 O motivo apresentado pelo autor foi: \`${motivo}\``)
            });
        });

            }
        } else {
            return message.channel.send(`<:permissao:665631314019483651> Você não tem permissão para executar esse comando!\nPermissão necessária: \`Expulsar Membros\``)
        }
}