const Discord = require('discord.js-commando');
const bot = new Discord.Client();
const { getRandomItem } = require('./utils/utils');
const TOKEN = 'NDYwNDUyODczODE0NDA5MjI2.DhE_fg.EAV6LhgInXbXVs8tGp4FHkm5V9Q';
const { flameWords, userNames, flameReplies } = require('./constants');
const badWordsToArray = flameWords.split(' ');

bot.login(TOKEN);

bot.on('message', (message) => {
    if (userNames.includes(message.author.username) && badWordsToArray.includes(message.content)) {
        const randomReply = getRandomItem(flameReplies);
        message.reply(randomReply);
        message.channel.sendMessage
    }
});

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('song_requests', 'songRequests');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');