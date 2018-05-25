let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
const youtubeSearch = require('youtube-search');
let youtubeApiKey = process.env.YOUTUBE;

module.exports = {
    entervaluetest: function(message) {
        let id = message.author.id;
        const filter = m => id === m.author.id;

        message.channel.awaitMessages(filter, {
            max: 1,
            time: 5000,
            errors: ['time']
        })
            .then(collected => {
                message.channel.send('here\'s your collection');
                console.log(collected);
                console.log('AND THEN THIS \n\n\n\n');
                console.log(collected[id].content);
            })
            // .catch is called on error - time up is considered an error (says so in docs)
            .catch(collected => {
                console.log(collected.content);
                message.channel.send('collected: '+collected.size+' messages');
            });
    }
};