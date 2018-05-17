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
        
        Jimp.read('http://104.131.78.209/bot/rpg/userimages/emptywanted.jpg').then(function (image) {
            image.quality(60)
                .write(message.author.id+'.jpg');
        }).catch(function (err) {
            console.error(err);
        });

        // console.log('this: '+thumb);
        // jimp.read('http://104.131.78.209/bot/rpg/userimages/emptywanted.jpg')
        //     .then(function (image) {
        //         image.composite(thumb, 25, 20)
        //             .crop( 0, 0, 0, 0 )
        //             .write(__dirname + '/userimages/'+message.author.id+'.jpg', function (err, success) {
        //                 err ? console.log('this error is clone: '+err) : message.channel.send(__dirname+'/userimages/'+message.author.id+'jpg');
        //             });
        //     }).then(function() {
        //         message.channel.send(__dirname+'/userimages/'+message.author.id+'jpg');
        //     }).catch(function (err){
        //         console.log('this error is final catch: '+err);
        //     });
    }

};