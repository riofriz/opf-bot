require("dotenv").config();
let qs = require('qs');
let corevars = require('./corevars');
const Discord = require('discord.js');
//let Parser = require('rss-parser');
//let parser = new Parser();
let https = require('https');
let request = require('request');
let striptags = require('striptags');

module.exports = {
    gamesearch: function(message, args) {
        let string = '';
        let title;
        let messageToSend;
        let alternatives = '';
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

        // request(options, function (error, response, body) {
        //     if (!error && response.statusCode === 200) {
        //         let json_body = JSON.parse(body);
        //         let apiName;
        //         if (json_body['number_of_page_results'] > 0) {
        //             if (json_body['results'][0]['aliases'] !== null) {
        //                 apiName = json_body['results'][0]['aliases'].replace(/\n/g, '').split(/\r/g);
        //                 let check = '';
        //                 let userCheck = string.toLowerCase();
        //                 let gameDescription = striptags(json_body['results'][0]['deck']);
        //                 if (apiName.findIndex(item => userCheck.toLowerCase().trim() === item.toLowerCase().trim())) {
        //                     for (let i = 0; i !== apiName.length; i++) {
        //                         if (apiName[i].trim().toLowerCase() === userCheck.trim().toLowerCase()) {
        //                             check = apiName[i].trim();
        //                         } else {
        //                             console.log(i+escape(apiName[i].trim().toLowerCase())+'api');
        //                             console.log(i+escape(userCheck.trim().toLowerCase())+'user');
        //                         }
        //                     }
        //                     if (check === '') {
        //                         check = apiName[0].trim();
        //                     }
        //                     message.channel.send(check);
        //                     message.channel.send(gameDescription);
        //                 } else {
        //                     message.channel.send('Please, be a bit more specific');
        //                 }
        //             } else {
        //                 message.channel.send('Couldn\'t find anything for you.. sorry.. :( ');
        //             }
        //
        //         } else {
        //             console.log(error);
        //         }
        //     }
        // });


        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let name = '';
                let desc = '';
                let thumb = '';
                let works = true;
                let aliases;
                let siteurl;
                if (json_body['number_of_page_results'] > 0) {
                    for (let key in json_body['results']) {
                        if (json_body['results'].hasOwnProperty(key)) {
                            if (json_body['results'][key].name.toLowerCase().trim() === string.toLowerCase().trim()) {
                                name = json_body['results'][key].name;
                                desc = striptags(json_body['results'][key].deck);
                                if (typeof json_body['results'][key]['site_detail_url'] !== 'undefined') {
                                    console.log(json_body['results'][key]['site_detail_url']);
                                    siteurl = json_body['results'][key]['site_detail_url'];
                                } else {
                                    siteurl = 'https://www.giantbomb.com/';
                                }
                                if (typeof json_body['results'][key]['image'] !== 'undefined') {
                                    thumb = json_body['results'][key]['image']['medium_url'];
                                } else {
                                    thumb = 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png';
                                }
                            } else {
                                if (typeof json_body['results'][key]['aliases'] !== 'undefined') {
                                    console.log(json_body['results'][key]['aliases']);
                                    aliases += json_body['results'][key].name+'\n';
                                }
                            }
                        }
                    }
                    if (name !== '') {
                        let embed = new Discord.RichEmbed()
                            .setThumbnail(url=thumb)
                            .addField(name, desc)
                            .setColor(corevars.randomColor())
                            .setFooter(siteurl);
                        message.channel.send({embed: embed});
                    } else {
                        message.channel.send('Mhhh.. maybe you could try this instead? \n ```'+aliases+'```');
                    }
                } else {
                    message.channel.send('mmmh.. are you actually sure you wanted to search ***'+string+'***? Check for typos.. maybe.. ')
                }
            }
        });




    }
};