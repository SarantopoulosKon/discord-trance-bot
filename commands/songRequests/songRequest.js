const Discord = require('discord.js-commando');
const util = require('util');
const ytdl = require('ytdl-core');
const request = require('request');
const opusscript = require("opusscript");
const { getInfo } = require('ytdl-getinfo')

const requestPromisified = util.promisify(request);

class PlayTranceMusic extends Discord.Command {
    constructor(client) {
        super(client, {
            name: 'vara',
            group: 'song_requests',
            memberName: 'vara',
            description: 'Plays the trance version of a song'
        });
    }

    async run(message, args) {
        const { member: { voiceChannel }} = message;
        const connection = await voiceChannel.join();
        
        this.play(connection, args);
        
    }

    async play(connection, title) {
        const streamOptions = { seek: 0, volume: 1 };
        const { items } = await getInfo(title);
        const url = items[0].url;

        const response = await requestPromisified(`https://content.googleapis.com/youtube/v3/search?q=${title}&maxResults=25&part=snippet&key=AIzaSyAMkHWnLNAvpKte-XA9nh3RheX7lFn_dNM`);
        console.log(response);
        const stream = ytdl(url, { filter: 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);

        dispatcher.on('end', end => {
            voiceChannel.leave();
        });
    }
}

module.exports = PlayTranceMusic;