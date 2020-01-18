const Discord = require('discord.js')
const config = require('../config.json') 
const fs = require('fs')
const moment = require('moment')

module.exports.run = async (client, message, args, database) => {

    let erro = config.erro
    let imgerro = config.imgerro

    if(!message.member.hasPermission("MANAGE_SERVER")) 
    return message.channel.send(`<:permissao:665631314019483651> Você não contém permissão para executar este comando.\nPermissão necessária: \`Gerênciar Servidor\`.`);

    if(args[0] == null){

        let sintaxe = new Discord.RichEmbed()
        .setAuthor(`Erro de Sintaxe`, `${imgerro}`)
        .setDescription(`\n\u200b\n[] - Opcional\n{} - Obrigatório\n\nUse: \`config {valor}\`\n\n🔌 | Prefixo - Seta um novo prefixo na sua Guild: \`\`\`config prefixo [valor]\`\`\`\n\n📋 | Logs - Ativa o sistema de registros na Guild: \`\`\`config logs {valor}\`\`\`\n\n<:protecao:654335617349582856> | Punicoes - Define um canal para enviar os bans e kicks executados pelo bot: \`\`\`config punicoes {#canal/remover}\`\`\`\n\u200b`)
        .setFooter(`xSpace | Erro de Sintaxe - #1`, message.author.avatarURL)
        .setColor(erro)
    
        message.channel.send(sintaxe)
    
    }

    if(args[0] == `prefixo`){

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
        prefixes: config.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    let embed = new Discord.RichEmbed()
    .setAuthor(`Configuração | Prefixo`, `https://cdn.discordapp.com/emojis/654335590011240458.png?v=1`)
    .setDescription(`\n\u200b\nUse: \`${prefix}config prefixo {valor}\` para muda-lo.\nUse: \`${prefix}config prefixo default\` para voltar ao default.\n\nPrefixo Atual:\n\`${prefix}\`\n\u200b`)
    .setFooter(`xSpace - Configuração`, client.user.avatarURL)
    .setColor(`#36393e`)

    if(!args[1]) return message.channel.send(embed)  
    
    if(args[1] == `default`){

        prefixes[message.guild.id] = {
            prefixes: `p.`
        };
        
        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err)
        });
    
        let prefixembed = new Discord.RichEmbed()
        .setTItle(`🔌 Configuração | Prefixo`)
        .setDescription(`\n\u200b\nUse: \`${prefix}config prefixo [valor]\` para muda-lo.\nUse: \`${prefix}config prefixo default\` para voltar ao default.\n\nPrefixo Atual:\n\`p.\`\n\u200b`)
        .setFooter(`xSpace - Configuração`, client.user.avatarURL)
        .setColor(`#36393e`)
    
        message.channel.send(prefixembed)    

    } else {

    prefixes[message.guild.id] = {
        prefixes: args[1]
    };
    
    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });

    let prefixembed = new Discord.RichEmbed()
    .setTItle(`🔌 Configuração | Prefixo`)
    .setDescription(`\n\u200b\nUse: \`${args[0]}config prefix [valor]\` para muda-lo.\nUse: \`${args[0]}config prefix default\` para voltar ao default.\n\nPrefixo Atual:\n\`${args[1]}\`\n\u200b`)
    .setFooter(`xSpace - Configuração`, client.user.avatarURL)
    .setColor(`#36393e`)

    message.channel.send(prefixembed)
 
}
    }

    if(args[0] == `logs`){

        if(args[1] == null){

            let sintaxe = new Discord.RichEmbed()
            .setTitle(`📋 Configuração | Registros`)
            .setDescription(`\n\u200b\nUse: \`config logs deletadas {#canal}\`\nUse: \`config logs editadas {#canal}\`\nUse: \`config logs bans {#canal}\`\n\u200b`)
            .setFooter(`xSpace - Configuração`, client.user.avatarURL)
            .setColor(`#36393e`)

            return message.channel.send(sintaxe)

        }

        if(args[1] == `remover`){

            let ref = await database.ref(`Configuração/${message.guild.id}`)
            let snap = await ref.once('value')

            if(snap.val() == null){
                return message.channel.send(`<:erro:664956331643371532> O sistema de \`Registros\` não está ativo na sua Guild.`)
            } else {

            ref.remove();
            message.channel.send(`<:correto:664956325427544078> O sistema de \`Registros\` foi removido da sua Guild.`)

            }
        }

        if(args[1] == `bans`){
         
            var canal = message.mentions.channels.first()
            if(!canal) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nArgumento em falta: \`{#canal}\``)
            
            database.ref(`Configuração/${message.guild.id}/Banimentos`)
            .update({
                banimentos: canal.id
            });

            message.channel.send(`<:ativo:665306934030893075> O sistema de registros para \`Usuários Banidos\` foi ativado na sua Guild.`)

        }

        if(args[1] == `deletadas`){

            var canal = message.mentions.channels.first()
            if(!canal) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nArgumento em falta: \`{#canal}\``)
            
            database.ref(`Configuração/${message.guild.id}/Deletadas`)
            .update({
                deletadas: canal.id
            });

            message.channel.send(`<:ativo:665306934030893075> O sistema de registros para \`Mensagens Deletadas\` foi ativado na sua Guild.`)

        }

        if(args[1] == `editadas`){

            var canal = message.mentions.channels.first()
            if(!canal) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nArgumento em falta: \`{#canal}\``)
            
            database.ref(`Configuração/${message.guild.id}/Editadas`)
            .update({
                editadas: canal.id
            });

            message.channel.send(`<:ativo:665306934030893075> O sistema de registros para \`Mensagens Editadas\` foi ativado na sua Guild.`)

        }

    }

    if(args[0] == `punicoes`){

        if(args[1] == `remover`){
            
            let ref = await database.ref(`Configuração/${message.guild.id}/Canais/Punições`)
            let snap = await ref.once('value')

            if(snap.val() == null){
                return message.channel.send(`<:erro:664956331643371532> Você deve definir um canal para o sistema de \`Punições\` para o remover.`)
            } else {

                let ref1 = await database.ref(`Configuração/${message.guild.id}/Canais/Punições`)

                ref1.remove();
                message.channel.send(`<:desativado:665306934366175251> Você removeu os canais de \`Punições\` que foram definidos anteriormente.`)

            }
        } else {

            var canal = message.mentions.channels.first()
            if(!canal) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nArgumento em falta: \`{#canal}\``)
    
            database.ref(`Configuração/${message.guild.id}/Canais/Punições`)
            .update({
                canal: canal.id
            });
    
            message.channel.send(`<:ativo:665306934030893075> Agora os meus \`bans e kicks\` serão enviados para o canal = ${canal}`)

        }
    }



}