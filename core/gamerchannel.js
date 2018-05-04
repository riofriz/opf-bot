require("dotenv").config();

let corevars = require('./corevars');
const Discord = require('discord.js');
let request = require("request");
let string;

module.exports = {
    gamesearch: function(message, args) {
        for (let i = 0; i <= args.length; i++) {
            string += args[i]+' ';
        }

        let request = require('request');
        let options = {
            url: 'https://api-endpoint.igdb.com/games/search?q='+string,
            headers: {
                'User-Agent': 'request',
                "user-key": process.env.IGDB_TOKEN
            }
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                let info = JSON.parse(body);
                console.log(info);
                //console.log(info.forks_count + " Forks");
            } else {
                console.log(info);
                message.channel.send('Ehm.. this is embarassing.. There was a little issue.'+error);
            }
        }
        request(options, callback);
    }
};