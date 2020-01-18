const Discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async (client, message, args, database) => {

    let loja = new Discord.RichEmbed()
    .setAuthor(`Escolha uma Loja`, `https://img.icons8.com/cotton/2x/online-shop--v1.png`)
    .setDescription(`\n\u200b\nEscolha uma das minhas lojas para comprar os seus produtos! Brevemente terei maior variedade de lojas onde você poderá investir o seu dinheiro. Boas compras!\n\u200b`)
    .addField(`🚀 Foguetões`, `Loja de foguetões`, true)
    .addField(`📚 Brevemente`, `Loja de ...`, true)
    .addField(`📚 Brevemente`, `Loja de ...\n\u200b`, true)
    .setFooter(`CashMarket - Lojas`, client.user.avatarURL)
    .setThumbnail('https://image.flaticon.com/icons/png/512/265/265754.png')
    .setTimestamp()
    .setColor(`#FFB800`)

    let msg1 = await message.channel.send(loja)

    let emojis = ['🚀'];
    for (const i in emojis) await msg1.react(emojis[i]);

    const filter = (r, u) => r.me && u.equals(message.author), 
    collector = msg1.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 });

collector.on('collect', async (r) => {
    switch (r.emoji.name) {
        case '🚀': {
            
            let ref = await database.ref(`Foguetão/${message.author.id}/Combustível`)
            let snap = await ref.once('value')
        
            let ref1 = await database.ref(`Foguetão/${message.author.id}/Motor`)
            let snap1 = await ref1.once('value')
        
            let ref2 = await database.ref(`Foguetão/${message.author.id}/Lataria`)
            let snap2 = await ref2.once('value')
        
            if(snap.val() && snap1.val() && snap2.val()){
                message.channel.send(`🚀 O seu Foguetão está pronto para voar! Digite \`lancarfoguetao\` e envie seu foguetão para o espaço!`)
                return msg1.delete();
            } else {

            msg1.delete();

            let foguetao = new Discord.RichEmbed()
            .setAuthor(`Loja de Foguetões`, `https://img.icons8.com/cotton/2x/online-shop--v1.png`)
            .setDescription(`\n\u200b\nOpa! Você quer viajar pelo espaço cideral e descubrir novos planetas, ou está aqui apenas vendo? Compre os componentes do seu foguetão e viaje para novas conquistas!\n\u200b`)
            .addField(`🔋 Combustível`, `Preço: 1.500 coins`, true)
            .addField(`🔌 Motor/Engine`, `Preço: 2.500 coins`, true)
            .addField(`🚀 Lataria Externa`, `Preço: 2.500 coins\n\u200b`, true)
            .setFooter(`CashMarket - Foguetões`)
            .setTimestamp()
            .setThumbnail(`https://images.emojiterra.com/mozilla/512px/1f680.png`)
            .setColor(`#FFBB00`)

            let msg2 = await message.channel.send(foguetao)

    let emojis = ['🔋', '🔌', '🚀'];
    for (const i in emojis) await msg2.react(emojis[i]);

    const filter = (r, u) => r.me && u.equals(message.author), 
    collector = msg2.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 });

collector.on('collect', async (r) => {
    switch (r.emoji.name) {
        case '🔋': {

            let ref1 = await database.ref(`Economia/${message.author.id}`)
            let snap1 = await ref1.once('value')

            let ref = await database.ref(`Foguetão/${message.author.id}/Combustível`)
            let snap = await ref.once('value')
            
            if(snap.val() == null){

            if(snap1.val() == null){
                return message.channel.send(`<:erro:664956331643371532> O nosso sistema de economia é protegido com um registro. Para se registrar, você deve digitar: \`registrar\``)
            } else {

                let coins = snap1.val().coins

                if(coins < 1500){
                    return message.channel.send(`<:dinheiro:654335597527171072> Você não contém **__1.500 coins__** para comprar este produto.`)
                } else {

                    let coinstotal = parseInt(coins - 1500)

                    database.ref(`Economia/${message.author.id}`)
                    .update({
                        coins: coinstotal
                    });

                    database.ref(`Foguetão/${message.author.id}/Combustível`)
                    .update({
                        combustivel: `comprado`
                    });

                    msg2.delete();
                    message.channel.send(`🔋 Você comprou o \`Combustível\` do foguetão!`)

                }

            }

        } else {
            return message.channel.send(`<:erro:664956331643371532> Você já contém o \`Combustível\` do foguetão!`)
        }

            break;
        }
        case '🔌': {

            let ref1 = await database.ref(`Economia/${message.author.id}`)
            let snap1 = await ref1.once('value')

            let ref = await database.ref(`Foguetão/${message.author.id}/Motor`)
            let snap = await ref.once('value')
            
            if(snap.val() == null){

            if(snap1.val() == null){
                return message.channel.send(`<:erro:664956331643371532> O nosso sistema de economia é protegido com um registro. Para se registrar, você deve digitar: \`registrar\``)
            } else {

                let coins = snap1.val().coins

                if(coins < 2500){
                    return message.channel.send(`<:dinheiro:654335597527171072> Você não contém **__2.500 coins__** para comprar este produto.`)
                } else {

                    let coinstotal = parseInt(coins - 2500)

                    database.ref(`Economia/${message.author.id}`)
                    .update({
                        coins: coinstotal
                    });

                    database.ref(`Foguetão/${message.author.id}/Motor`)
                    .update({
                        motor: `comprado`
                    });

                    msg2.delete();
                    message.channel.send(`🔌 Você comprou o \`Motor\` do foguetão!`)

                }

            }

        } else {
            return message.channel.send(`<:erro:664956331643371532> Você já contém o \`Motor\` do foguetão!`)
        }

            break;
        }
        case '🚀': {

            let ref1 = await database.ref(`Economia/${message.author.id}`)
            let snap1 = await ref1.once('value')

            let ref = await database.ref(`Foguetão/${message.author.id}/Lataria`)
            let snap = await ref.once('value')
            
            if(snap.val() == null){

            if(snap1.val() == null){
                return message.channel.send(`<:erro:664956331643371532> O nosso sistema de economia é protegido com um registro. Para se registrar, você deve digitar: \`registrar\``)
            } else {

                let coins = snap1.val().coins

                if(coins < 2500){
                    return message.channel.send(`<:dinheiro:654335597527171072> Você não contém **__2.500 coins__** para comprar este produto.`)
                } else {

                    let coinstotal = parseInt(coins - 2500)

                    database.ref(`Economia/${message.author.id}`)
                    .update({
                        coins: coinstotal
                    });

                    database.ref(`Foguetão/${message.author.id}/Lataria`)
                    .update({
                        lataria: `comprado`
                    });

                    msg2.delete();
                    message.channel.send(`🚀 Você comprou a \`Lataria\` do foguetão!`)

                }

            }

        } else {
            return message.channel.send(`<:erro:664956331643371532> Você já contém a \`Lataria\` do foguetão!`)
        }

            break;
        }
    }
    })
}
            break;
        }

    }
        })

}   