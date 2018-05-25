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
        const filter = message => {
            if (id !== message.author.id) {
                return false;
            }
        };
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 5000,
            errors: ['time']
        })
            .then(collected => {
                message.channel.send('here\'s your collection');
                console.log(collected);
            })
            // .catch is called on error - time up is considered an error (says so in docs)
            .catch(collected => {
                console.log(collected);
                message.channel.send('collected: '+collected.size+' messages');
            });
    }
};