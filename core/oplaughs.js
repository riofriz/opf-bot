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
    oplaughters: function (str) {
        let substrings = [
            "kishishishi",
            "gurararara",
            "shishishishi",
            "shurororo",
            "zehahaha"
        ];
        let result;
        let string;
        for (let i = 0; i !== substrings.length; i++) {
            if (str.includes(substrings[i])) {
                result = substrings[i];
            }
        }
        if (str.includes(result)) {
            str.channel.send({file: __dirname + '/oplaughters/' + result + '.gif'})
        }
    }
};