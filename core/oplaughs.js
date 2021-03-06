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
            "gurararara",
            "shishishishi",
            "kishishishi",
            "dereshishi",
            "shurororo",
            "zeehahaha",
            "yohohoho",
            "bwahahaha",
            "gyahahaha",
            "fuffuffuffu",
            "horohorohoro",
            "supeeeeee"
        ];
        let result;
        let string;
        let zeroone = Math.floor(Math.random() * 1.99);
        for (let i = 0; i !== substrings.length; i++) {
            if (str.includes(substrings[i]) && str !== 'undefined') {
                result = substrings[i];
            }
        }
        if (str.includes(result)) {
            if (result === 'dereshishi') {
                result = result+zeroone;
            }
            message.channel.send({file: __dirname + '/oplaughters/' + result + '.gif'})
        }
    },

    jojofights: function (str, message) {
        let substrings = [
            "oraoraora",
            "mudamudamuda"
        ];
        let result;
        let string;
        for (let i = 0; i !== substrings.length; i++) {
            if (str.includes(substrings[i]) && str !== 'undefined') {
                result = substrings[i];
            }
        }
        if (str.includes(result)) {
            message.channel.send({file: __dirname + '/jojofight/' + result + '.gif'})
        }
    }
};