const fs = require('fs');
const request = require('request-promise-native');
const { youtubeApiKey: apiKey } = require('../credentials.json');

module.exports = function search(keyword) {
    const url = `https://content.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=1&part=snippet&key=${apiKey}`;

    return request(url);
}
