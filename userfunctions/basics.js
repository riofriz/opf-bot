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
                    console.log(commands);
                    if (typeof commands !== 'undefined') {
                        console.log(commands);
                    } else {
                        commands = 0;
                    }
                    db.Users.update(
                        { "id" : message.author.id },
                        { "id" : message.author.id, "nick" : message.author.username, "triggeredCommands":commands },
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
                        db.Users.update(
                            { "id" : message.author.id },
                            { "id" : message.author.id, "nick" : message.author.username, "triggeredCommands":commands },
                            {upsert: true},
                            function(err) {}
                        );
                    } else {
                        db.Users.update(
                            { "id" : message.author.id },
                            { "id" : message.author.id, "nick" : message.author.username, "triggeredCommands":commands+1 },
                            {upsert: true},
                            function(err) {}
                        );
                    }

                }
            });
        } catch (e){ console.log(e); }
    },

    rank: function(message) {
        try {
            let commands;
            let rank;
            db.Users.findOne({ "id" : message.author.id }, function(err, doc) {
                if(doc) {
                    commands = doc.triggeredCommands;
                    rank = commands/25;
                    console.log(rank);
                    if (typeof commands === 'undefined') {
                        commands = 0;
                        db.Users.update(
                            { "id" : message.author.id },
                            { "id" : message.author.id, "nick" : message.author.username, "triggeredCommands":commands },
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