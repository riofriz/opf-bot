require("dotenv").config();
let corevars = require('../core/corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');
let Jimp = require('jimp');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Users']);

module.exports = {

    wantedme: function(message) {
        // let thumb = new jimp(message.author.avatarURL, function (err, img) {
        //     err ? console.log('logo err' + err) : console.log('logo created');
        //     return img;
        // });
        // let font = jimp.FONT_SANS_16_BLACK;
        //
        // jimp.read('http://104.131.78.209/bot/rpg/userimages/emptywanted.jpg').then(function (lenna) {
        //     lenna
        //         .print(font, 20, 100, message.author.nickname)
        //         .write(__dirname + '/userimages/'+message.author.id+'.jpg'); // save
        //     message.channel.send('http://104.131.78.209/bot/rpg/userimages/'+message.author.id+'.jpg')
        // }).catch(function (err) {
        //     console.error(err);
        // });


        Jimp.read(__dirname+"/userimages/emptywanted.jpg").then(function (delimg) {
            Jimp.read(message.author.avatarURL).then(function(dimg) {
                Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
                    dimg.resize(114, 107);
                    delimg.composite(dimg, 62, 86);
                    delimg.print(font, 20, 100, "test string"+message.author.nickname+"");
                    delimg.write(__dirname + '/userimages/'+message.author.id+'.jpg');
                    message.channel.send({file: __dirname + '/userimages/'+message.author.id+'.jpg'});
                });
            });
        }).catch(err => {
            message.channel.send("An error occured!~\n```js\n" + err + "```");
            console.error(err);
        })


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