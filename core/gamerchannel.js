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
            string += args[i] + ' ';
        }
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let options = {
            url: 'https://www.giantbomb.com/api/search',
            method: 'GET',
            headers: headers,
            qs: {'api_key': process.env.GIANTBOMB, 'format': 'json', 'query': string}
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let apiName;
                if (json_body['number_of_page_results'] > 0) {
                    if (json_body['results'][0]['aliases'] !== null) {
                        apiName = json_body['results'][0]['aliases'].replace(/\n/g, '').split(/\r/g);
                        let check = apiName[0].toLowerCase();
                        let userCheck = string.toLowerCase();
                        let gameDescription = striptags(json_body['results'][0]['deck']);
                        console.log(apiName);
                        console.log(check);
                        console.log(userCheck);
                        if (check.trim() === userCheck.trim()) {
                            message.channel.send(check);
                            message.channel.send(gameDescription);
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
            }
        });
    }
};