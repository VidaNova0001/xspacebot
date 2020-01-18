const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client()
const config = require('./config.json');
const firebase = require('firebase');
const talkedRecently = new Set();
const moment = require('moment')
const { readdirSync } = require('fs');

var firebaseConfig = {
  apiKey: "AIzaSyCE3g43YBF3tosqNP8lqRRNM09pf60qbjA",
  authDomain: "minhaloja-com-br.firebaseapp.com",
  databaseURL: "https://minhaloja-com-br.firebaseio.com",
  projectId: "minhaloja-com-br",
  storageBucket: "minhaloja-com-br.appspot.com",
  messagingSenderId: "538334725674",
  appId: "1:538334725674:web:33d11f1ab26b50a3816553",
  measurementId: "G-BHDQDKW5P6"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

var token = config.token

client.on('ready', () => { 
    
  let s = [
    { name: `Dermot Kennedy - Young & Free`, type: 'LISTENING'},
    { name: `Fui criado/desenvolvido pelo VidaNova#0001`, type: 'WATCHING'} 
];

function st() {
    let rs = s[Math.floor(Math.random() * s.length)];
    client.user.setPresence({ game: rs });
}

st();
setInterval(() => st(), 30000);

  
    console.log(`------------- Public BOT -------------`)
    console.log(`Usuários totais: ${client.users.size}`)
    console.log(`Estou em ${client.guilds.size} comunidades!`)
    console.log(`------------- Public BOT -------------`)
    const cmds = readdirSync('./comandos');

    cmds.forEach(c => console.log(`--> ${c}`));

    console.log(`------------- Public BOT -------------`)

});

client.on("guildBanAdd", async (Guild, User) => {

  let ref = await database.ref(`Configuração/${Guild.id}/Banimentos`)
  let snap = await ref.once('value')

    if(snap.val() == null){
      return undefined;
    } else {

  let banimentos = Guild.channels.get(`${snap.val().banimentos}`)

  let embed = new Discord.RichEmbed()
  .setAuthor(`Usuário Banido`, `https://cdn.discordapp.com/emojis/666770669568262164.png?v=1`)
  .setDescription(`\n\u200b\n<:usuario:637303729380524063> Usuário: ${User.tag}\n🕐 Horário do banimento: ${moment().format('LL')}\n\u200b`)
  .setFooter(`${Guild.name}`, User.avatarURL)
  .setColor(`RED`)

  banimentos.send(embed)

    }

});

client.on("messageDelete", async (message) => {

  if (message.author.bot) return;

  let ref = await database.ref(`Configuração/${message.guild.id}/Deletadas`)
  let snap = await ref.once('value')

    if(snap.val() == null){
      return undefined;
    } else {

  let deletadas = client.channels.get(`${snap.val().deletadas}`)

  let embed = new Discord.RichEmbed()
  .setAuthor(`Mensagem Deletada`, `https://cdn.discordapp.com/emojis/598717822482251824.png?v=1`)
  .setDescription(`\n\u200b\nCanal onde foi enviada: ${message.channel}\n\nMensagem deletada:\n\`\`\`${message}\`\`\`\n\n<:usuario:637303729380524063> Autor da Mensagem: ${message.author.tag}\n🕐 Horário de envio: ${moment().format('LL')}\n\u200b`)
  .setFooter(`Registros - ${message.guild.name}`)
  .setTimestamp()
  .setColor(`#FF0000`)

  deletadas.send(embed)

    }

});

client.on("messageUpdate", async (OldMessage, newMessage) => {

  if (newMessage.author.bot) return;
  if (!OldMessage || newMessage === OldMessage) return;

  let ref = await database.ref(`Configuração/${newMessage.guild.id}/Editadas`)
  let snap = await ref.once('value')

    if(snap.val() == null){
      return undefined;
    } else {

  let editadas = client.channels.get(`${snap.val().editadas}`)

  let embed = new Discord.RichEmbed()
  .setAuthor(`Mensagem Editada`, `https://cdn.discordapp.com/emojis/598717822482251824.png?v=1`)
  .setDescription(`\n\u200b\nCanal onde foi enviada: ${newMessage.channel}\n\nMensagem original:\n\`\`\`${OldMessage}\`\`\`\nMensagem Editada:\n\`\`\`${newMessage}\`\`\`\n\n<:usuario:637303729380524063> Autor da mensagem: ${newMessage.author.tag}\n🕐 Horário de envio: ${moment().format('LL')}\n\u200b`)
  .setFooter(`Registros - ${newMessage.guild.name}`)
  .setTimestamp()
  .setColor(`#FFBB00`)

  editadas.send(embed)

}

});

client.on('guildMemberAdd', async member => {

  let ref = await database.ref(`Contador/${member.guild.id}/Canal`)
  let snap = await ref.once('value')

  let ref1 = await database.ref(`Contador/${member.guild.id}/Mensagem`)
  let snap1 = await ref1.once('value')

  let ref2 = await database.ref(`Contador/${member.guild.id}/Numero`)
  let snap2 = await ref2.once('value')

  try {

    if(snap2.val() == null){

      let guild = `${client.guilds.get(`${member.guild.id}`).members.size}`.split("");
      const numeronulo = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
      let count = '';
      for(let i = 0; i<guild.length; i++){count += ':'+numeronulo[guild[i]]+':';}

      let contador = member.guild.channels.get(`${snap.val().canal}`)
      
      let mensagem = snap1.val().mensagem
      let mensagemPronta = mensagem.replace(`{contador}`, `${count}`)
      
      contador.setTopic(`${mensagemPronta}`) 

    } else {

      let numero = snap2.val().numero

      if(numero == 0 ){

      let guild = `${client.guilds.get(`${member.guild.id}`).members.size}`.split("");
      const numero0 = ['0_:642862645036449793', '1_:642862710282911774', '2_:642862712531058719', '3_:642862715081326602', '4_:642862733326417926', '5_:642862735574564874', '6_:642862738292604938', '7_:642862741689729032', '8_:642862767443017778', '9_:642862769783177220'];
      let count = '';
      for(let i = 0; i<guild.length; i++){count += '<:'+numero0[guild[i]]+'>';}


      let ref = await database.ref(`Contador/${member.guild.id}/Canal`)
      let snap = await ref.once('value')

      let ref1 = await database.ref(`Contador/${member.guild.id}/Mensagem`)
      let snap1 = await ref1.once('value')

      let contador = member.guild.channels.get(`${snap.val().canal}`)

      let mensagem = snap1.val().mensagem
      let mensagemPronta = mensagem.replace('{contador}', `${count}`)
    
      contador.setTopic(`${mensagemPronta}`) 

      } else if(numero == 1){

        let guild = `${client.guilds.get(`${member.guild.id}`).members.size}`.split("");
        const numero1 = ['A0:658052591657156648', 'A1:658052598494003261', 'A2:658052652399067165', 'A3:658052653015629861', 'A4:658052669071556639', 'A5:658052672255033344', 'A6:658052671831539712', 'A7:658052672183730206', 'A8:658052689724309554', 'A9:658052692974895124'];
        let count = '';
        for(let i = 0; i<guild.length; i++){count += '<a:'+numero1[guild[i]]+'>';}
  
        let ref = await database.ref(`Contador/${member.guild.id}/Canal`)
        let snap = await ref.once('value')
  
        let ref1 = await database.ref(`Contador/${member.guild.id}/Mensagem`)
        let snap1 = await ref1.once('value')
  
        let contador = member.guild.channels.get(`${snap.val().canal}`)
  
        let mensagem = snap1.val().mensagem
        let mensagemPronta = mensagem.replace('{contador}', `${count}`)
      
        contador.setTopic(`${mensagemPronta}`) 

      }

    }

    

  } catch(err) {
    return undefined;
  }

});

client.on('guildMemberRemove', async member => {

try {
      
      let guild = `${client.guilds.get(`${member.guild.id}`).members.size}`.split("");
      const contador1 = ['0_:642862645036449793', '1_:642862710282911774', '2_:642862712531058719', '3_:642862715081326602', '4_:642862733326417926', '5_:642862735574564874', '6_:642862738292604938', '7_:642862741689729032', '8_:642862767443017778', '9_:642862769783177220'];
      let count = '';
      for(let i = 0; i<guild.length; i++){count += '<:'+contador1[guild[i]]+'>';}


      let ref = await database.ref(`Contador/${member.guild.id}`)
      let data = await ref.once('value')

  let referencia = await database.ref(`Contador/${member.guild.id}/Mensagem`)
  let data2 = await referencia.once('value')

  let contador = member.guild.channels.get(`${data.val().contador}`)

  let rep = data2.val().mensagem
  let mensagemPronta = rep.replace('{contador}', `${count}`)
 
  contador.setTopic(`${mensagemPronta}`) 
  } catch(err) {
    return undefined;
 }

});


client.on("message", async (message) => {

    if (message.channel.type == "dm") return;
    if (message.author.bot) return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }
 
    let prefix = prefixes[message.guild.id].prefixes;

    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    try {  

      if(talkedRecently.has(message.author.id)) {
        message.channel.send(`🕐 Aguarde **__10 segundos__** para voltar a executar este comando!`);
  } else {
    
        let commandFile = require(`./comandos/${command}.js`);
        commandFile.run(client, message, args, database);

        talkedRecently.add(message.author.id);
        setTimeout(() => {
    
          talkedRecently.delete(message.author.id);
        }, 10000);
  }
  
    } catch (err) {

        if (err.code == "MODULE_NOT_FOUND") return;
        console.error(err);


    }

  });


client.login(token)

