const Discord = require('discord.js');
const config = require('../config.json')

module.exports.run = async (bot, message, args, database) => {

    if(args[0] == null){
        return message.channel.send(`<:sintaxe:637303714620637186> Erro de Sintaxe!\nArgumento em falta: \`{reputacao/...brevemente}\``)
    }

            if(args[0] == `reputacao`){

                let ref = await database.ref(`Aplicação`);
                let retorno = await ref.once('value');
    
                let array = [];
                let arrayFinal = [];
    
                await retorno.forEach(element => {
                    array.push(element.key);
                });
    
                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    if (element == 'Reputacao') {
                        let refA = await database.ref(`Aplicação/${element}`);
                        let retornoA = await refA.orderByChild('reputacao').limitToLast(10).once('value');
    
                        await retornoA.forEach(elementA => {
                            arrayFinal.push({ usuario: elementA.key, reputacao: elementA.val().reputacao});
                        });
                    }
                }

                var position = await arrayFinal.map(function (doc) {
                    return {
                        usuario: doc.usuario,
                        reputacao: doc.reputacao
                    }
                })
    
                position = await position.sort(function (a, b) {
                    return b.reputacao - a.reputacao
                });
    
                position = await position.filter(function (a) {
                    try {
                        return bot.users.get(a.usuario).username
                    } catch (error) {
                    }
                })
    
                let top5 = await position.slice(0, 5).map((a, posicao) => {
                    try {
                        return `<:reputacao:665674098696912906> **${(posicao + 1)}º** **${bot.users.get(a.usuario).username}**\nNíveis de Reputação: **${a.reputacao}**`
                    } catch (error) {
    
                    }
                })
    
                let top10 = await position.slice(5, 10).map((a, posicao) => {
                    try {
                        return `<:reputacao:665674098696912906> **${(posicao + 6)}**º **__${bot.users.get(a.usuario).username}__**\nNíveis de Reputação: **${a.reputacao}**`
                    } catch (error) {
    
                    }
                })
    
                    let embed5 = new Discord.RichEmbed()
                    .setTitle(`**__Ranking Geral__** | **__Reputação__**\n\u200b`)
                    .setDescription(`${top5.join("\n\n")}\n\u200b`)
                    .setColor("#E79B5A")
                    .setFooter(`Reputação - Página 1`)
                    .setThumbnail(bot.user.avatarURL)
    
                    let embed10 = new Discord.RichEmbed()
                    .setTitle(`**__Ranking Geral__** | **__Reputação__**\n\u200b`)
                    .setDescription(`${top10.join("\n\n")}\n\u200b`)
                    .setColor("#E79B5A")
                    .setFooter(`Reputação - Página 2`)
                    .setThumbnail(bot.user.avatarURL)
    
                  let msg = await message.channel.send(embed5)
    
                  emojis = ['◀', '▶'];
    
                  for (const i in emojis) {
                      await msg.react(emojis[i]);
                  }
    
                  const filter = (r, u) => r.me && u.equals(message.author), 
                  collector = msg.createReactionCollector(filter, { max: 10, time: 5 * 60 * 1000 });
    
                  collector.on('collect', (r) => {
                    switch (r.emoji.name) {
                        case '◀': {
                            msg.edit(embed5)
                            msg.reactions.forEach(rc => rc.remove(message.author.id))
                            break;
                        }
                        case '▶': {
                            msg.edit(embed10)
                            msg.reactions.forEach(rc => rc.remove(message.author.id))
                            break;
                        }
                    }
                  });

            }

    }