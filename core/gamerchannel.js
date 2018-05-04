require("dotenv").config();
let qs = require('qs');
let corevars = require('./corevars');
const Discord = require('discord.js');
//let Parser = require('rss-parser');
//let parser = new Parser();
let string = '';
let https = require('https');

module.exports = {
    gamesearch: function(message, args) {
        let title;
        let messageToSend;
        for (let i = 0; i !== args.length; i++) {
            string += args[i]+' ';
        }

        let url = 'https://www.giantbomb.com/api/search/'+qs.stringify('?api_key='+process.env.GIANTBOMB+'&format=json&query='+string);
        let path = '/';
        let call = url+path;
        let options = {
            host: url,
            path: path,
            headers: {'User-Agent': "https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com"},
            method: 'GET',
        };


        https.get(options, function (res) {
            let json = '';
            res.on('data', function (chunk) {
                json += chunk;
            });
            res.on('end', function () {
                if (res.statusCode >= 200) {
                    try {
                        var data = JSON.parse(json);
                        // data is available here:
                        console.log(data);
                    } catch (e) {
                        console.log('Error parsing JSON!');
                    }
                } else {
                    console.log('Status:', res.statusCode);
                }
            });
        }).on('error', function (err) {
            console.log('Error:', err);
        });
    }
};