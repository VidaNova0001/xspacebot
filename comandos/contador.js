const Discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async (client, message, args, database) => {

    let erro = config.erro
    let imgerro = config.imgerro

    if(!message.member.hasPermission("MANAGE_SERVER")) 
    return message.channel.send(`<:permissao:665631314019483651> Você não contém permissão para executar este comando.\nPermissão necessária: \`Gerênciar Servidor\`.`);

    if(args[0] == null){

    let sintaxe = new Discord.RichEmbed()
    .setAuthor(`Erro de Sintaxe`, `${imgerro}`)
    .setDescription(`\n\u200b\n[] - Opcional\n{} - Obrigatório\n\nUso correto: \`contador {valor}\`\n\n💬 - Define o canal onde o contador será ativo:\n\`\`\`fix\ncontador canal {#canal}\`\`\`\n\n📝 - Define a mensagem do contador:\n\`\`\`fix\ncontador texto {mensagem}\`\`\`\n\n🔢 - Define o tipo do número do contador:\n\`\`\`fix\ncontador numero {numero}\`\`\`\n\nNúmero 0 | ⠀<:0_:642862645036449793>\nNúmero 1 | ⠀<a:A1:658052598494003261>\n\u200b`)
    .setFooter(`Contador | Erro de Sintaxe - #1`, message.author.avatarURL)
    .setColor(erro)

    message.channel.send(sintaxe)

    }

    if(args[0] == `canal`){

        var canal = message.mentions.channels.first()
        if(!canal) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\n\nArgumento em falta: \`{#canal}\``) 

        database.ref(`Contador/${message.guild.id}/Canal`)
        .update({
            canal: canal.id
        });

        let laranja = config.laranja

        let setcanal = new Discord.RichEmbed()
        .setAuthor(`Processo de Configuração`, `https://cdn.discordapp.com/emojis/654335590011240458.png?v=1`)
        .addField(`\n\u200b\n<:ativo:665306934030893075> Ativo | Canal Definido:`, `${canal}`)
        .addField(`\n<:desativado:665306934366175251> Desativado | Mensagem Definida:`, `Use: \`contador texto {mensagem}\`\nExemplo: \`\`\`fix\ncontador texto Estamos com {contador} membros.\`\`\``)
        .addField(`\n<:desativado:665306934366175251> Desativado | Número Definido:`, `Use: \`contador numero {numero}\`\nExemplo: \`\`\`fix\ncontador numero 2\`\`\``)
        .setFooter(`Contador | Informações 1/3`, message.author.avatarURL)
        .setColor(laranja)

        canal.setTopic(`<a:processando:654335735154999298>⠀⠀O seu contador de membros foi ativo. Porém a mensagem ainda não foi definida.`)
        message.channel.send(`<:armazenado:665599343247622144> Opa ${message.author}, os seus dados armazenados com sucesso!`)
        message.channel.send(setcanal)

    }

    if(args[0] == `texto`){

        let ref = await database.ref(`Contador/${message.guild.id}/Canal`)
        let snap = await ref.once('value')

        if(snap.val() == null){
            return message.channel.send(`<:erro:664956331643371532> Você deve definir o canal antes de criar uma mensagem.`)
        } else {

        let mensagem = args.slice(1).join(' ')
        if(!mensagem) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nArgumento em falta: \`{mensagem}\``)           

        database.ref(`Contador/${message.guild.id}/Mensagem`)
        .update({
            mensagem: mensagem
        });

        let laranja = config.laranja
        var canal = message.guild.channels.get(`${snap.val().canal}`)

        let settexto = new Discord.RichEmbed()
        .setAuthor(`Processo de Configuração`, `https://cdn.discordapp.com/emojis/654335590011240458.png?v=1`)
        .addField(`\n\u200b\n<:ativo:665306934030893075> Ativo | Canal Definido:`, `${canal}`)
        .addField(`\n<:ativo:665306934030893075> Ativo | Mensagem Definida:`, `\`${mensagem}\`\nExemplo: \`\`\`fix\ncontador texto Estamos com {contador} membros.\`\`\``)
        .addField(`\n<:desativado:665306934366175251> Desativado | Número Definido:`, `Use: \`contador numero {numero}\`\nExemplo: \`\`\`fix\ncontador numero 2\`\`\``)
        .setFooter(`Contador | Informações 2/3`, message.author.avatarURL)
        .setColor(laranja)

        canal.setTopic(`<:ativo:665306934030893075>⠀⠀Aguarde um membro entrar ou sair do servidor para o contador atualizar.`)
        message.channel.send(`<:armazenado:665599343247622144> Opa ${message.author}, os seus dados armazenados com sucesso!`)
        message.channel.send(settexto)

        }

    }

    if(args[0] == `numero`){

        let ref = await database.ref(`Contador/${message.guild.id}/Canal`)
        let snap = await ref.once('value')

        let ref1 = await database.ref(`Contador/${message.guild.id}/Mensagem`)
        let snap1 = await ref1.once('value')

        if(snap1.val() == null){
            return message.channel.send(`<:erro:664956331643371532> Para definir um número, você deve definir a mensagem primeiro.`)
        } else {

        let numero = args.slice(1).join(' ')
        if(!numero) return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe:\nArgumento em falta: \`{numero}\``) 
        if(isNaN(numero)) return message.channel.send(`<:erro:664956331643371532> O seu número deve ser um número e não uma letra!`)

        if(numero > 1){
            return message.channel.send(`<:erro:664956331643371532> Só contemos 2 tipos de contadores, então o seu número não pode ser maior que 1.`)
        }

        database.ref(`Contador/${message.guild.id}/Numero`)
        .update({
            numero: numero
        });

        let laranja = config.laranja
        let mensagem = snap1.val().mensagem
        var canal = message.guild.channels.get(`${snap.val().canal}`)

        let setnumero = new Discord.RichEmbed()
        .setAuthor(`Processo de Configuração`, `https://cdn.discordapp.com/emojis/654335590011240458.png?v=1`)
        .addField(`\n\u200b\n<:ativo:665306934030893075> Ativo | Canal Definido:`, `${canal}`)
        .addField(`\n<:ativo:665306934030893075> Ativo | Mensagem Definida:`, `\`${mensagem}\`\nExemplo: \`\`\`fix\ncontador texto Estamos com {contador} membros.\`\`\``)
        .addField(`\n<:ativo:665306934030893075> Ativo | Número Definido:`, `Tipo de contador - ${numero}\nExemplo: \`\`\`fix\ncontador numero 2\`\`\``)
        .setFooter(`Contador | Informações 3/3`, message.author.avatarURL)
        .setColor(laranja)


        message.channel.send(`<:armazenado:665599343247622144> Opa ${message.author}, os seus dados armazenados com sucesso!`)
        message.channel.send(setnumero)

    }
    }

    if(args[0] == `remover`){

        let ref = await database.ref(`Contador/${message.guild.id}`)
        let snap = await ref.once('value')

        if(snap.val() == null){
            return message.channel.send(`<:erro:664956331643371532> O contador ainda não está ativo na sua Guild.`)
        } else {

            ref.remove();
            message.channel.send(`<:correto:664956325427544078> O contador de membros foi removido da sua Guild.`)

        }

    }

}