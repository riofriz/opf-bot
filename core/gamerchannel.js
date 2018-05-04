require("dotenv").config();

let corevars = require('./corevars');
const Discord = require('discord.js');
let Parser = require('rss-parser');
let parser = new Parser();
let string = '';

module.exports = {
    gamesearch: function(message, args) {
        let title;
        let messageToSend;
        for (let i = 0; i !== args.length; i++) {
            string += args[i]+' ';
        }
        let url = 'https://www.giantbomb.com/api/search/?api_key='+process.env.IGDB_TOKEN+'&query='+string;
        (async () => {
            let feed = await parser.parseURL(url);

            feed.items.forEach(item => {
                "use strict";
                let rawName = item.game.name.replace('<![CDATA[ ', '');
                let name = rawName.replace(' ]]>', '');
                if (name === string) {
                    messageToSend = name +' - '+ item.game.name;
                } else {
                    messageToSend = 'Please be more specific';
                }
            });
            message.channel.send(messageToSend);

        })();
    }
};