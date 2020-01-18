const Discord = require('discord.js')
const moment = require('moment')

module.exports.run = async (client, message, args, database) => {

    let ref = await database.ref(`Foguetão/${message.author.id}/Combustível`)
    let snap = await ref.once('value')

    let ref1 = await database.ref(`Foguetão/${message.author.id}/Motor`)
    let snap1 = await ref1.once('value')

    let ref2 = await database.ref(`Foguetão/${message.author.id}/Lataria`)
    let snap2 = await ref2.once('value')

    let ref3 = await database.ref(`Conquistas/${message.author.id}/Lua`)
    let snap3 = await ref3.once('value')

    if(snap3.val() == null){

    if(!snap.val() && !snap1.val() && !snap2.val()){
        return message.channel.send(`<:erro:664956331643371532> Você ainda não contém todos os componentes do Foguetão! Digite: \`comprar\`, para acessar a loja.`)
    } else {

        database.ref(`Conquistas/${message.author.id}/Lua`)
        .update({
            lua: 'desbloqueada',
            horário: `${moment().format('L')}`
        });

        let decolagem = await message.channel.send(`🗼 | Torre de Controlo:\n\nCombustível: <a:analisando:666732234262183966>\nEngine/Motor: <a:analisando:666732234262183966>\nOxigénio: <a:analisando:666732234262183966>`)

        setTimeout(() => {
            
            decolagem.edit(`🗼 | Torre de Controlo:\n\n<:correto:664956325427544078> Combustível: 500/500 fuel\nEngine/Motor: <a:analisando:666732234262183966>\nOxigénio: <a:analisando:666732234262183966>`)

        }, 10000);

        setTimeout(() => {
            
            decolagem.edit(`🗼 | Torre de Controlo:\n\n<:correto:664956325427544078> Combustível: 500/500 fuel\n<:correto:664956325427544078> Engine/Motor: Funcionando corretamente\nOxigénio: <a:analisando:666732234262183966>`)

        }, 15000);

        setTimeout(() => {
            
            decolagem.edit(`🗼 | Torre de Controlo:\n\n<:correto:664956325427544078> Combustível: 500/500 fuel\n<:correto:664956325427544078> Engine/Motor: Funcionando corretamente\n<:correto:664956325427544078> Oxigénio: 100%`)

        }, 20000);

        setTimeout(async() => {
            
        decolagem.delete();
        await message.channel.send(`🌑 ${message.author} conseguiu chegar na \`Lua\` com o seu foguetão!\nUma nova conquista foi adicionada na sua conta!`, { files: ['./lua.gif']})    

        let ref = await database.ref(`Foguetão/${message.author.id}`)
        ref.remove();

        }, 23000);


    }

    } else {
        return message.channel.send(`🌑 Você já contém a conquista \`Lua\` salva em sua conta!`)
    }


}