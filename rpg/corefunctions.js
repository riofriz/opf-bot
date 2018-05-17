require("dotenv").config();
let corevars = require('../core/corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');
let jimp = require('jimp');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Users']);

module.exports = {

    wantedme: function(message) {
        let thumb = new jimp(message.author.avatarURL, function (err, img) {
            err ? console.log('logo err' + err) : console.log('logo created');
            return img;
        });
        jimp.read('/userimages/emptywanted.jpg')
            .then(function (image) {
                image.clone()
                    .resize(805,jimp.AUTO)
                    .crop(0,0,805,450)
                    .composite(logo, 25, 20)
                    .write(__dirname + '/public/tmp/slider-01.jpg', function (err, success) { err ? console.log(err) : console.log('image resized and saved successfully\n'+success)});
            })
            .then(function() { res.redirect('/'); })
            .catch(function (err){
                console.log(err);
            });
    }

};