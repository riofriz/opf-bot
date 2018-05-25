let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
const youtubeSearch = require('youtube-search');
let youtubeApiKey = process.env.YOUTUBE;

module.exports = {
    entervaluetest: function(message) {
        const filter = m => m.content <= 100;
        message.channel.awaitMessages(filter, {
            max: 3,
            time: 5000,
            errors: ['time']
        })
            .then(collected => {
                console.log(collected);
            })
            // .catch is called on error - time up is considered an error (says so in docs)
            .catch(collected => {
                console.log(JSON.parse(collected));
                message.channel.send('collected: '+collected.size+' messages');
            });
    }
};