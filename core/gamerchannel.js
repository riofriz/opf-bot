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
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let name = '';
                let desc = '';
                let thumb = '';
                let works = true;
                let aliases = '';
                let siteurl;
                if (json_body['number_of_page_results'] > 0) {
                    for (let key in json_body['results']) {
                        if (json_body['results'].hasOwnProperty(key)) {
                            if (json_body['results'][key].name.toLowerCase().trim() === string.toLowerCase().trim()) {
                                name = json_body['results'][key].name;
                                desc = striptags(json_body['results'][key].deck);
                                if (typeof json_body['results'][key]['site_detail_url'] !== 'undefined') {
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
                            .setURL(siteurl);
                        message.channel.send({embed: embed});
                    } else {
                        message.channel.send('Mhhh.. maybe you could try this instead? \n ```'+aliases+'```');
                    }
                } else {
                    message.channel.send('mmmh.. are you actually sure you wanted to search ***'+string+'***? Check for typos.. maybe.. ')
                }
            }
        });
    },

    spoilerTag: function(commandPrefix, message, args) {
        let string = message.content.toLowerCase().replace(commandPrefix+'spoiler', '').split(':')
        let query = qs.stringify({
            api_option: 'paste',
            api_dev_key: process.env.PASTEBIN,
            api_paste_code: string[1],
            api_paste_name: string[0],
            api_paste_private: 0,
            api_paste_expire_date: '1D'
        });

        let req = https.request({
            host: 'pastebin.com',
            port: 80,
            path: '/api/api_post.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': query.length
            }
        }, function (res) {
            let data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                console.log(data);
            });
        });
        req.write(query);
        req.end();
    }
};