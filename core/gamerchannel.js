require("dotenv").config();
let qs = require('qs');
let corevars = require('./corevars');
const Discord = require('discord.js');
//let Parser = require('rss-parser');
//let parser = new Parser();
let string = '';
let https = require('https');
let request = require('request');
let striptags = require('striptags');

module.exports = {
    gamesearch: function(message, args) {
        let title;
        let messageToSend;
        for (let i = 0; i !== args.length; i++) {
            string += args[i]+' ';
        }
        let headers = {
            'User-Agent':       'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let options = {
            url: 'https://www.giantbomb.com/api/search',
            method: 'GET',
            headers: headers,
            qs: {'api_key': process.env.GIANTBOMB, 'format': 'json', 'query' : string}
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);

                let apiName = json_body['results'][0]['aliases'].split('\\r\\n');
                if (json_body['results'][0]) {
                    if (apiName.toLowercase() === string.toLowerCase()) {
                        message.channel.send(json_body['results'][0]['aliases']);
                        message.channel.send(striptags(json_body['results'][0]['deck']));
                    } else {
                        message.channel.send('Please, be a bit more specific');
                    }
                } else {
                    message.channel.send('Couldn\'t find anything for you.. sorry.. :( ');
                }
            } else {
                console.log(error.message);
                console.log(error);
                console.log(body);
            }
        })
    }
};