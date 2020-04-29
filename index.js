const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
const SSAPI = require('./assets/js/module.api.js');
const emojiCharacters = require('./assets/js/module.emojis.js');
var GetSongData = require('./assets/js/module.search.js');
var GetUserData = require('./assets/js/module.searchuser.js');
let api = new SSAPI();

bot.login(token);

bot.on('ready', () =>{
    console.log("We're rolling baby");
    bot.user.setActivity('speeeeeeeeeeeeeeeeeeen', { type: 'STREAMING' }, { url: 'https://twitch.tv/spinshare' })
.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
.catch(console.error);
  const channel = bot.channels.cache.get('697732663045259334');
  channel.send("We're back up and speening!");
})

bot.on('message', (message)=>{
    const messageWords = message.content.split(' ');
    const rollFlavor = messageWords.slice(1).join(' ');
    if (messageWords[0] === '!roll'){
        if (messageWords.length >= 1){
            //!roll
            return message.reply(
                (Math.floor(Math.random() * 100) + 1) + ' ' + rollFlavor
            );
        }
    }
})

bot.on('message', message => {
    let lowerCaseMessageContent = message.content.toLowerCase();

    if (lowerCaseMessageContent.includes('map'||'mapping'||'mapped'||'mapper'||'mappers')) {
        message.react('🗺️');
    }

    if (lowerCaseMessageContent.includes('chart'||'charting'||'charted'||'charter'||'charters')) {
       	message.react('📈');
    }

  
    if (lowerCaseMessageContent.includes('speen')){
            message.react('695440682952687656');
            message.react('695440704809336942');
            message.react('695440945306533939');
        }

    if (lowerCaseMessageContent.includes('spleen')){
            message.react('695440682952687656');
            message.react(emojiCharacters.l);
            message.react('695440704809336942');
            message.react('695440945306533939');
        }

    if (lowerCaseMessageContent.includes('mapy')){
            message.react('699274566849265756');
        }

    if (lowerCaseMessageContent.includes('metalman' || 'metalman20' || 'guitarman' || 'metal' || 'guitar' || '@metalman20')){
            message.react('704090735707685067');
    }

    if (lowerCaseMessageContent.includes('trump')){
            message.react('704087779193258005');
    }

    if (lowerCaseMessageContent.includes('how do i download customs' || 'how do i import customs')){
        message.reply("Please read the <#642824638748950549> channel");
    }

    else if (lowerCaseMessageContent.startsWith('!search ')) {
        message.react('🔍');
        message.react('🎵');
        let searchterm = message.content.slice(8)
            api.search(searchterm).then(function(songArray) {
                let i = 0;
                GetSongData(songArray.songs, i, message);
            });
    }
    else if (lowerCaseMessageContent.startsWith('!usearch ')) {
        message.react('🔍');
        let searchterm = message.content.slice(9)
            api.search(searchterm).then(function(userArray) {
                let i = 0;
                GetUserData(userArray.users, i, message);
            });
    }
});

    
