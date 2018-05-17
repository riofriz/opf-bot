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

        let berries;
        try {
            db.Users.findOne({"id": message.author.id}, function (err, doc) {
                if (doc) {
                    if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('claims')) {
                        berries = doc.claims.berries;

                        Jimp.read(__dirname+"/userimages/emptywanted.png").then(function (delimg) {
                            Jimp.read(message.author.avatarURL).then(function(dimg) {
                                Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(function (fonthuge) {
                                    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (fontbig) {
                                        dimg.resize(254, 247);
                                        delimg.composite(dimg, 78, 110);
                                        delimg.print(fonthuge, 55, 300, ""+message.author.username+"");
                                        delimg.print(fontbig, 78, 490, ""+berries+"");
                                        delimg.write(__dirname + '/userimages/'+message.author.id+'.jpg');
                                        message.channel.send({file: __dirname + '/userimages/'+message.author.id+'.jpg'});
                                    });
                                });
                            });
                        }).catch(err => {
                            message.channel.send("An error occured!~\n```js\n" + err + "```");
                            console.error(err);
                        })
                    } else {
                        message.channel.send('Your balance is still 0*B*, try claiming some *B* with o-claim');
                    }
                } else {
                    message.channel.send('Whops.. there might have been an error.');
                }
            });
        }
        catch (e){ console.log(e); }
    }

};