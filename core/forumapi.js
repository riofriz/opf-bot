let corevars = require('./corevars');
const Discord = require('discord.js');
let Parser = require('rss-parser');
let parser = new Parser();
let fs = require('fs');
let mongojs = require('mongojs');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Users']);

module.exports = {
    /**
     *
     * @param message
     * @param args
     */
    latestCommands: function(message, args) {
        let title;
        if (typeof args[0] !== 'undefined') {
            let pull;
            if (args[0] === 'manga') {
                pull = 'one-piece-manga';
            } else if (args[0] === 'anime') {
                pull = 'one-piece-anime'
            } else if (args[0] === 'nakama') {
                pull = 'konnichiwa'
            }
            if (pull === 'konnichiwa' || pull === 'one-piece-manga' || pull === 'nakama') {
                (async () => {
                    let feed = await parser.parseURL(corevars.buildRss(pull));
                    if (args[0] === 'manga') {
                        feed.items.forEach(item => {
                            "use strict";
                            title = item.title;
                            if (title.includes("Predictions") === false && title.includes("One Piece Chapter")) {
                                message.channel.send('***' + title + '*** is out!! Check it out' + ': \n' + item.link);
                            }
                        });
                    } else if (args[0] === 'anime') {
                        feed.items.forEach(item => {
                            "use strict";
                            title = item.title;
                            if (title.includes("Predictions") === false && title.includes("One Piece Episode")) {
                                message.channel.send('***' + title + '*** is out!! Check it out' + ': \n' + item.link);
                            }
                        });
                    } else if (args[0] === 'nakama') {
                        let counter = 0;
                        feed.items.forEach(item => {
                            "use strict";
                            if (counter === 0) {
                                "use strict";
                                title = item.creator;
                                message.channel.send('***' + title + '*** is the latest Nakama! Say welcome' + ':\n ' + item.link);
                            }
                            counter++;
                        });
                    }
                })();
            } else {
                message.channel.send('Latest what??? <:ping:432976718010122250>');
            }
        } else {
            message.channel.send('Latest what??? <:ping:432976718010122250>');
        }
        message.channel.fetchMessage(message.id)
            .then(m => {
                m.delete();
            });
    },

    /**
     * @param message
     * @param args
     */
    username: function(message, args) {
        try {
            if (args[0]) {
                let string;
                for (let i = 0; i !== args.length; i++) {
                    string += args[i] + ' ';
                }
                db.Users.findOne({"id": message.author.id}, function (err, doc) {
                    if (doc) {
                        db.Users.update(
                            {"id": message.author.id},
                            {$set: {"id": message.author.id, "opfusername": string}},
                            {upsert: true},
                            function (err) {}
                        );
                        message.channel.send('Thanks, i will remember that you are '+string+' on the forum.');
                    }
                });
            } else {
                message.channel.send('Sorry, you didn\'t specify any username.');
            }
        } catch (e){ console.log(e); }
    },

    /**
     * BETA, NOT WORKING FOR NOW.
     * @param message
     * @param args
     */
    whois: function(message, args) {
        let firstStrip;
        let secondStrip;
        let thirdStrip;
        let user;
        let opfusername;
        try {
            if (args[0]) {
                firstStrip = args[0].trim().replace('<@', '');
                secondStrip = firstStrip.replace('>', '');
                thirdStrip = secondStrip.replace('!', '');
                user = thirdStrip;
                db.Users.findOne({"id": user}, function (err, doc) {
                    if (doc) {
                        opfusername = doc.opfusername;
                        if (typeof opfusername !== 'undefined' && opfusername !== '') {
                            message.channel.send('This user is '+opfusername+' on the forum.');
                        }
                    }
                });
            } else {
                message.channel.send('Sorry, you didn\'t specify any valid user.');
            }
        } catch (e){ console.log(e); }
    }
};