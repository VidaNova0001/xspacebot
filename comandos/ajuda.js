const Discord = require('discord.js')
const fs = require('fs')
const config = require('../config.json')

module.exports.run = async (bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }
 
    let prefix = prefixes[message.guild.id].prefixes;

    var embedInicial = new Discord.RichEmbed()
    .setTitle('📖 xSpaceBot | Menu Principal')
    .setDescription(`\n\u200b\nPrefixo atual: \`${prefix}\`\n\n◀️ **| Início**\n\n🚓 | Comandos de Moderação: **(7)**\n<:dinheiro:654335597527171072> | Comandos de Economia: **(9)**\n🧑 | Comandos para Membros: **(4)**\n\n🆕 | Comandos adicionados recentemente: **(0)**\n\u200b`)
    .setColor('#36393e')
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    .setThumbnail(bot.user.avatarURL)

    var embedModeracao = new Discord.RichEmbed()
    .setTitle('🚓 | Comandos de Moderação')
    .setDescription(`\n\u200b\n◀️ - **Menu Principal** \n\nPrefixo atual: \`${prefix}\``)
    .addField('Comandos de Punições', `\`ban\`, \`kick\`, \`fastkick\` e \`fastban\`.`)
    .addField('Comandos Gerais', `\`limpar\`, \`say\`, \`fake\` e \`config\`.`)
    .addField('Permissões para utilização dos comandos:', `\`Banir Membros\`, \`Expulsar Membros\`, \`Gerênciar Mensagens\` e \`Gerênciar Servidor\`.\n\u200b`)
    .setColor('#36393e')
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    .setThumbnail(bot.user.avatarURL)

    var embedMembros = new Discord.RichEmbed()
    .setTitle('🧑 | Comandos para Membros')
    .setDescription(`\n\u200b\n◀️ - **Menu Principal** \n\nPrefixo atual: \`${prefix}\``)
    .addField('Comandos de entretenimento:', `\`avatar\`, \`servericon\`, \`serverinfo\`, \`mchead\`, \`mcskin\`, \`rep\`, \`reputacao\``)
    .addField('Comandos de ajuda:', `\`info\`.`)
    .addField('Permissão necessária:', `\`\`Nenhuma\`\`.\n\u200b`)
    .setColor('#36393e')
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    .setThumbnail(bot.user.avatarURL)

    var embedEconomia = new Discord.RichEmbed()
    .setTitle('<:dinheiro:654335597527171072> | Comandos de Economia')
    .setDescription(`\n\u200b\n◀️ - **Menu Principal** \n\nPrefixo atual: \`${prefix}\``)
    .addField('Comandos de entretenimento:', `\`banco\`, \`comprar\`, \`conquistas\`, \`depositar\`, \`dinheiro\`, \`lancarfoguetao\`, \`recompensa\`, \`registrar\`, \`retirar\`.`)
    .addField('Permissão necessária:', `\`\`Nenhuma\`\`.\n\u200b`)
    .setColor('#36393e')
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    .setThumbnail(bot.user.avatarURL)

    var embedNovos = new Discord.RichEmbed()
    .setTitle('🆕 | Comandos adicionados recentemente')
    .setDescription(`\n\u200b\n◀️ - **Menu Principal** \n\nPrefixo atual: \`${prefix}\`\n\u200b`)
    .setColor('#36393e')
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    .setThumbnail(bot.user.avatarURL)


    message.author.send(embedInicial).then(async msg => {
        
        message.react('653245341352591360')
        message.channel.send(`📨 | Opa ${message.author}, os meus módulos de ajuda estão no seu privado!`)

        await msg.react('◀️')
        await msg.react('🚓')
        await msg.react('654335597527171072')
        await msg.react('🧑')
        await msg.react('🆕')

        const inicio = msg.createReactionCollector((r, u) => r.emoji.name === "◀️" && u.id === message.author.id, { time: 120000 });
        const helpModeracao = msg.createReactionCollector((r, u) => r.emoji.name === "🚓" && u.id === message.author.id, { time: 120000 });
        const membros = msg.createReactionCollector((r, u) => r.emoji.name === "🧑" && u.id === message.author.id, { time: 120000 });
        const economia = msg.createReactionCollector((r, u) => r.emoji.id === "654335597527171072" && u.id === message.author.id, { time: 120000 });
        const novos = msg.createReactionCollector((r, u) => r.emoji.name === "🆕" && u.id === message.author.id, { time: 120000 });

        inicio.on('collect', async r => {
            msg.edit(embedInicial)
        })

        economia.on('collect', async r => {
            msg.edit(embedEconomia)
        })

        helpModeracao.on('collect', async r => {
            msg.edit(embedModeracao)
        })

        membros.on('collect', async r => {
            msg.edit(embedMembros)
        })

        novos.on('collect', async r => {
            msg.edit(embedNovos)
        })


    }).catch(err=> {
        message.delete();
        return message.channel.send(`<:erro:664956331643371532> | Vish... ${message.author}, só lhe posso enviar meus módulos se você abrir o DM.`, {author: message.author, emoji_error: ('❌')})
    });



}