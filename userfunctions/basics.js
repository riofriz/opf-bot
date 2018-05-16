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
            db.Users.update( { "id" : message.author.id }, { "id" : message.author.id },
                    { "id" : message.author.id, "nick" : message.author.username, "botrank" : 0 },
                    { upsert: true }, true
            );
        }
        catch (e){ console.log(e); }
    }
};