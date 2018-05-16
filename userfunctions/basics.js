require("dotenv").config();
let corevars = require('../core/corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds117540.mlab.com:17540/opfbot', ['Movies']);

module.exports = {
    saveusers: function(message) {
        try {    db.Users.replaceOne(
            { "id" : message.author.id },
            { "id" : message.author.id, "nick" : message.author.username, "botrank" : 0 },
            { upsert: true }
        );
        }
        catch (e){ console.log(e); }
    }
};