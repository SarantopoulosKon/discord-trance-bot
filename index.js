const Discord = require('discord.js-commando');
const bot = new Discord.Client();
const TOKEN = 'NDYwNDUyODczODE0NDA5MjI2.DhE_fg.EAV6LhgInXbXVs8tGp4FHkm5V9Q';
const badWords = require('./flame-words');
const badWordsToArray = badWords.split(' ');

bot.login(TOKEN);

bot.on('message', (message) => {
    if (message.author.username === 'Sgus' && badWordsToArray.includes(message.content)) {
        message.reply('hi');
        message.channel.sendMessage
    }
});

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('song_requests', 'songRequests');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');