let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');

module.exports = {
    /**
     * @param str
     * @returns {*}
     */
    oplaughters: function (str, message) {
        let substrings = [
            "kishishishi",
            "gurararara",
            "shishishishi",
            "shurororo",
            "zezhahaha",
            "yohohoho"
        ];
        let result;
        let string;
        for (let i = 0; i !== substrings.length; i++) {
            if (str.includes(substrings[i])) {
                result = substrings[i];
            }
        }
        if (str.includes(result)) {
            message.channel.send({file: __dirname + '/oplaughters/' + result + '.gif'})
        }
    }
};