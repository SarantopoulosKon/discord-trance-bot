const Discord = require('discord.js-commando');
const util = require('util');
const ytdl = require('ytdl-core');
const request = require('request');
const opusscript = require("opusscript");
const { getInfo } = require('ytdl-getinfo');
const searchMusic = require('../../services/youtube');

const requestPromisified = util.promisify(request);

class PlayTranceMusic extends Discord.Command {
    constructor(client) {
        super(client, {
            name: 'vara',
            group: 'song_requests',
            memberName: 'vara',
            description: 'Plays the trance version of a song'
        });
        this.playing = false;
    }

    async run(message, args) {
        const { member: { voiceChannel }} = message;
        this.voiceChannel = voiceChannel;
        const connection = await this.voiceChannel.join();
        
        this.play(connection, args);
        
    }

    async play(connection, title) {
        const tranceTitle = title + ' trance remix';
        const streamOptions = { seek: 0, volume: 1 };
        const response = await searchMusic(tranceTitle);
        const data = JSON.parse(response);
        const url = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
        const stream = ytdl(url, { filter: 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
        this.playing = true;

        dispatcher.on('end', end => {
            this.playing = false;
            this.voiceChannel.leave();
        });
    }
}

module.exports = PlayTranceMusic;




