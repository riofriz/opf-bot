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

    oprank: function(message, args, Client) {
        let berries;
        let commands;
        let rank;
        let firstStrip;
        let secondStrip;
        let thirdStrip;
        let howMuchLeft;
        let user;
        try {
            if (args[0]) {
                firstStrip = args[0].trim().replace('<@', '');
                secondStrip = firstStrip.replace('>', '');
                thirdStrip = secondStrip.replace('!', '');
                user = thirdStrip;
            } else {
                user = message.author.id;
            }
            db.Users.findOne({"id": message.author.id}, function (err, doc) {
                if (doc) {
                    if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('claims')) {
                        berries = doc.claims.berries;
                        commands = doc.triggeredCommands;
                        rank = commands/250;

                        Client.fetchUser(user).then(myUser => {
                            let username = myUser.username;
                            Jimp.read(__dirname+"/userimages/emptywanted.png").then(function (delimg) {
                                Jimp.read(myUser.avatarURL).then(function(dimg) {
                                    Jimp.loadFont(__dirname + '/fonts/wanted-64.fnt').then(function (fonthuge) {
                                        Jimp.loadFont(__dirname + '/fonts/wanted.fnt').then(function (fontbig) {
                                            dimg.resize(254, 247);
                                            delimg.composite(dimg, 78, 130);
                                            delimg.print(fontbig, 43, 440, ""+username.toUpperCase()+"");
                                            delimg.print(fontbig, 78, 500, ""+berries+"");
                                            delimg.print(fonthuge, 285, 440, ""+Math.floor(rank)+"");
                                            delimg.write(__dirname + '/userimages/'+user+'.jpg');
                                            message.channel.send({file: __dirname + '/userimages/'+user+'.jpg'});
                                        });
                                    });
                                });
                            }).catch(err => {
                                message.channel.send("Whops.. that didn't work for some weird reason.");
                                console.error(err);
                            })
                        });

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