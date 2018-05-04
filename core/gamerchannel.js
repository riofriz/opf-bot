require("dotenv").config();
let qs = require('qs');
let corevars = require('./corevars');
const Discord = require('discord.js');
//let Parser = require('rss-parser');
//let parser = new Parser();
let string = '';
let https = require('https');
let request = require('request');

module.exports = {
    gamesearch: function(message, args) {
        let title;
        let messageToSend;
        for (let i = 0; i !== args.length; i++) {
            string += args[i]+' ';
        }

        // let url = 'https://www.giantbomb.com/api/search/?api_key='+process.env.GIANTBOMB+'&format=json&query='+string;
        // let path = '/';
        // let call = url+path;
        // let options = {
        //     host: url,
        //     path: path,
        //     headers: {'User-Agent': "https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com"},
        //     method: 'GET',
        // };

        // Set the headers
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
                console.log(json_body);
            } else {
                console.log(error.message);
                console.log(error);
                console.log(body);
            }
        })
    }
};