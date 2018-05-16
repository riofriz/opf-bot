require("dotenv").config();
let corevars = require('../core/corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Users']);

module.exports = {
    saveusers: function(message) {
        try {
            let commands;
            let rank;
            let user = message.author;
            db.Users.findOne({ "id" : message.author.id }, function(err, doc) {
                if(doc) {
                    commands = doc.triggeredCommands;
                    if (typeof commands !== 'undefined') {
                        rank = commands/25;
                        if (rank % 1 !== 0) {
                            console.log(rank);
                            // let embed = new Discord.RichEmbed()
                            //     .setThumbnail(url=user.avatarURL)
                            //     .addField('Your rank', Math.floor(rank))
                            //     .setColor(corevars.randomColor());
                            // message.channel.send({embed: embed});
                        }
                    } else {
                        commands = 0;
                    }
                    db.Users.update(
                        { "id" : message.author.id },
                        { $set: { "id":message.author.id, "triggeredCommands":commands } },
                        {upsert: true},
                        function(err) {}
                    );
                } else {
                    commands = 0;
                    db.Users.insert( { "id":message.author.id, "triggeredCommands":commands } );
                }
            });
        } catch (e){ console.log(e); }
    },

    increaseCommands: function(message) {
        try {
            let commands;
            db.Users.findOne({ "id" : message.author.id }, function(err, doc) {
                if(doc) {
                    commands = doc.triggeredCommands;
                    if (typeof commands === 'undefined') {
                        commands = 0;
                    }
                    db.Users.update(
                        { "id" : message.author.id },
                        { $set: { "id" : message.author.id, "triggeredCommands":commands+1 } },
                        {upsert: true},
                        function(err) {}
                    );
                }
            });
        } catch (e){ console.log(e); }
    },

    rank: function(message, args, Client) {
        try {
            let commands;
            let rank;
            let user;
            let pre;
            let firstStrip;
            let secondStrip;
            let thirdStrip;
            if (args[0]) {
                firstStrip = args[0].trim().replace('<@', '');
                secondStrip = firstStrip.replace('>', '');
                thirdStrip = secondStrip.replace('!', '');
                user = thirdStrip;
                pre = 'User\'s rank';
            } else {
                user = message.author.id;
                pre = 'Your rank';
            }
            db.Users.findOne({ "id" : user }, function(err, doc) {
                if(doc) {
                    commands = doc.triggeredCommands;
                    rank = commands/25;
                    if (typeof commands === 'undefined') {
                        commands = 0;
                        db.Users.update(
                            { "id" : message.author.id },
                            { $set: { "id" : message.author.id, "triggeredCommands":commands } },
                            {upsert: true},
                            function(err) {}
                        );
                    } else {
                        Client.fetchUser(user).then(myUser => {
                            let embed = new Discord.RichEmbed()
                                .setThumbnail(url=myUser.avatarURL)
                                .addField(pre, Math.floor(rank))
                                .setColor(corevars.randomColor());
                            message.channel.send({embed: embed});
                        });
                    }

                }
            });
        } catch (e){ console.log(e); }
    }
};