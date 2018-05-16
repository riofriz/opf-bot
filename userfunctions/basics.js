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
            let user = db.Users.findOne({ "id" : message.author.id }, function(err, doc) {});

            let commands;
            console.log(user);
            if (typeof user.triggeredCommands !== 'undefined') {
                console.log(user.triggeredCommands);
                commands = user.triggeredCommands;
            } else {
                commands = 0;
            }
            db.Users.update(
                { "id" : message.author.id },
                { "id" : message.author.id, "nick" : message.author.username, "triggeredCommands":commands },
                {upsert: true},
                function(err) {}
            );
        } catch (e){ console.log(e); }
    }
};