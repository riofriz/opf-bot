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
            Client.fetchUser(user).then(myUser => {
                db.Users.findOne({"id": user}, function (err, doc) {
                    if (doc) {
                        if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('claims')) {
                            berries = doc.claims.berries;
                            commands = doc.triggeredCommands;
                            rank = commands / 250;

                            let username = myUser.username;
                            Jimp.read(__dirname + "/userimages/emptywanted.png").then(function (delimg) {
                                Jimp.read(myUser.avatarURL).then(function (dimg) {
                                    Jimp.loadFont(__dirname + '/fonts/wanted-64.fnt').then(function (fonthuge) {
                                        Jimp.loadFont(__dirname + '/fonts/wanted.fnt').then(function (fontbig) {
                                            dimg.resize(254, 247);
                                            delimg.composite(dimg, 78, 130);
                                            delimg.print(fontbig, 43, 437, "" + username.toUpperCase() + "");
                                            delimg.print(fontbig, 78, 498, "" + berries + "");
                                            delimg.print(fonthuge, 285, 445, "" + Math.floor(rank) + "");
                                            delimg.write(__dirname + '/userimages/' + user + '.jpg');
                                            message.channel.send({file: __dirname + '/userimages/' + user + '.jpg'});
                                        });
                                    });
                                });
                            }).catch(err => {
                                message.channel.send("Whops.. that didn't work for some weird reason.");
                                console.error(err);
                            })

                        } else {
                            message.channel.send('Your balance is still 0*B*, try claiming some *B* with o-claim');
                        }
                    } else {
                        message.channel.send('Whops.. there might have been an error.');
                    }
                });
            });
        }
        catch (e){ console.log(e); }
    },

    loot: function(message, talkedRecently) {
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait a bit before using this again.");
        } else {
            // the user can type the command ... your command code goes here :)
            try {
                db.Users.findOne({"id": message.author.id}, function (err, doc) {
                    if (doc) {
                        let randomNumber = Math.random() * 7;
                        randomNumber = Math.floor(randomNumber);
                        let somesomething = [
                            'under *a bush*',
                            'in *a dumpster*',
                            'under *a very comfy sofa*',
                            'in *a forest*',
                            'in *a skip*',
                            'up *a tree*',
                            'in *an old boat*'
                        ];
                        let berries = Math.random() * 180;
                        let wood = Math.random() * 20;
                        let iron = Math.random() * 20;
                        berries = Math.floor(berries);
                        wood = Math.floor(berries);
                        iron = Math.floor(berries);
                        console.log(randomNumber);
                        if (randomNumber < 7) {
                            let wheretoloot = somesomething[randomNumber];
                            db.Users.update(
                                {"id": message.author.id},
                                {$set: {"id": message.author.id,
                                    "claims": {
                                        "berries": berries,
                                        "wood": wood,
                                        "iron": iron
                                    }
                                }
                                },
                                {upsert: true},
                                function (err) {}
                            );
                            message.channel.send('Searching ' + wheretoloot + ' received ' + berries + '*B*, ' + wood + '*Wood* and ' + iron + '*iron*');
                        } else {
                            message.channel.send('You were searching on an iced lake, you found 1000*B*, 54*wood* and 40*iron* but you slipped and lost it all. <:pfft:445023527888748544>')
                        }
                    }
                });
            } catch (e){ console.log(e); }
            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 15000);
        }
    }

};