require("dotenv").config();
let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let striptags = require('striptags');

module.exports = {
    mediaSearch: function (message, args, media) {
        let string = '';
        let title;
        let messageToSend;
        let alternatives = '';
        for (let i = 0; i !== args.length; i++) {
            string += args[i] + ' ';
        }
        string = string.replace('undefined', '');
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let options = {
            url: 'https://api.themoviedb.org/3/search/'+media,
            method: 'GET',
            headers: headers,
            qs: {'api_key': process.env.TMDB, 'query': string, 'include_adult': 'true'}
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let name = '';
                let desc = '';
                let thumb = '';
                let aliases = '';
                let id = '';
                let siteurl;
                if (json_body['total_results'] > 0) {
                    for (let key in json_body['results']) {
                        if (json_body['results'].hasOwnProperty(key)) {
                            if (json_body['results'][key].name.toLowerCase().trim() === string.toLowerCase().trim()) {
                                name = json_body['results'][key].name;
                                desc = striptags(json_body['results'][key].overview);
                                id = json_body['results'][key].id;
                                siteurl = 'https://www.themoviedb.org/tv/'+id+'-'+name.replace(' ', '-').toLowerCase();

                                if (typeof json_body['results'][key]['poster_path'] !== 'undefined' && json_body['results'][key]['poster_path'] !== null) {
                                    thumb = 'https://image.tmdb.org/t/p/w500' . json_body['results'][key]['poster_path'];
                                } else {
                                    thumb = 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png';
                                }
                            } else {
                                if (typeof json_body['results'][key]['name'] !== 'undefined') {
                                    aliases += json_body['results'][key].name + '\n';
                                }
                            }
                        }
                    }
                    if (desc === '') {
                        desc = 'Sorry, short description is not available.'
                    }
                    if (name !== '') {
                        let embed = new Discord.RichEmbed()
                            .setThumbnail(url = 'https://cdn2.iconfinder.com/data/icons/app-types-in-grey/128/info_512pxGREY.png')
                            .setImage(url = thumb)
                            .addField(name, desc)
                            .setColor(corevars.randomColor())
                            .setURL(siteurl);
                        message.channel.send({embed: embed});
                    } else {
                        message.channel.send('Mhhh.. maybe you could try this instead? \n ```' + aliases + '```');
                    }
                } else {
                    message.channel.send('mmmh.. are you actually sure you wanted to search ***' + string + '***? Check for typos.. maybe.. ')
                }
            }
        });
    }
};