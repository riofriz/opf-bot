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
            db.Users.findOne({ "id" : message.author.id }, function(err, doc) {
                if(doc) {
                    commands = doc.triggeredCommands;
                    if (typeof commands !== 'undefined') {
                    } else {
                        commands = 0;
                    }
                    db.Users.update(
                        { "id" : message.author.id },
                        { $set: { "id":message.author.id, "triggeredCommands":commands } },
                        {upsert: true},
                        function(err) {}
                    );
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

    rank: function(message, args) {
        try {
            let commands;
            let rank;
            let user;
            if (args[0]) {
                let firstStrip = args[0].trim().replace('<@', '');
                let secondStrip = firstStrip.replace('>', '');
                let thirdStrip = secondStrip.replace('!', '');
                user = thirdStrip;
            } else {
                user = message.author.id;
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
                        message.channel.send('Your rank is: '+Math.floor(rank));
                    }

                }
            });
        } catch (e){ console.log(e); }
    }
};