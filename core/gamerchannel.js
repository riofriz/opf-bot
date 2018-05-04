require("dotenv").config();

let corevars = require('./corevars');
const Discord = require('discord.js');
//let Parser = require('rss-parser');
//let parser = new Parser();
let string = '';

let eyes = require('eyes');
let https = require('https');
let fs = require('fs');
let xml2js = require('xml2js');
let parser = new xml2js.Parser();

module.exports = {
    gamesearch: function(message, args) {
        let title;
        let messageToSend;
        for (let i = 0; i !== args.length; i++) {
            string += args[i]+' ';
        }
        let url = 'https://www.giantbomb.com/api/search/?api_key='+process.env.GIANTBOMB+'&query='+string;


        parser.on('error', function(err) { message.channel.send('Whops.. something must have gone wrong', err); });
        let data = '';
        https.get(url, function(res) {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                res.on('data', function(data_) { data += data_.toString(); });
                res.on('end', function() {
                    console.log('data', data);
                    let rawName = data.game.name.replace('<![CDATA[ ', '');
                    let name = rawName.replace(' ]]>', '');
                    if (name === string) {
                        messageToSend = name +' - '+ data.game.name;
                    } else {
                        messageToSend = 'Please be more specific';
                    }
                    parser.parseString(data, function(err, result) {
                        console.log('FINISHED', err, result);
                    });
                });
            }
        });

    }
};