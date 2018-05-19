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
    battle: function (message, args, Client) {
        if (args[1]) {
            if (typeof args[1] === 'number') {
                let attacker = message.author.id;
                let firstStrip = args[0].trim().replace('<@', '');
                let secondStrip = firstStrip.replace('>', '');
                let attacked = secondStrip.replace('!', '');

                db.Users.findOne({"id": attacker}, function (err, attacker) {
                    if (attacker) {
                        db.Users.findOne({"id": attacker}, function (err, attacked) {
                            if (attacked) {
                                let attackedOwnedBerries = attacked.claims.berries;
                                let attackerOwnedBerries = attacker.claims.berries;
                                if (attackedOwnedBerries < args[1]) {
                                    message.channel.send('The person you are attacking can\'t afford that amount of *B*, be a nice sport!');
                                } else if (attackerOwnedBerries < args[1]) {
                                    message.channel.send('You can\'t afford that much.. Unless you are cheating <:pfft:445023527888748544>');
                                } else {
                                    //BATTLE COMMAND IN HERE.
                                }
                            } else {
                                message.channel.send('Who are you attacking? Can\'t find that user anywhere.');
                            }
                        });
                    }
                });
            } else {
                message.channel.send('Uhm.. even in a fairy world that wouldn\'t be a valid number..');
            }
        } else {
            message.channel.send('You didn\'t specify a price.');
        }
    },

    mobfight: function (message, args, talkedRecently) {
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Need to recharge stamina. Estimated total cooldown: 10s.");
        } else {
            if (args[0]) {
                let pattern = /^[0-9]*$/g;
                if (args[0].match(pattern)) {
                    let attacker = message.author.id;
                    let bet = parseInt(args[0].trim());
                    db.Users.findOne({"id": attacker}, function (err, attacker) {
                        if (attacker) {
                            let attackerOwnedBerries = attacker.claims.berries;
                            console.log(attackerOwnedBerries);
                            console.log(bet);
                            if (attackerOwnedBerries < bet) {
                                message.channel.send('You can\'t afford that much.. Unless you are cheating <:pfft:445023527888748544>');
                            } else {
                                //BATTLE COMMAND IN HERE.
                                let diceroll = Math.random() * 8;
                                diceroll = Math.floor(diceroll);
                                let embed;
                                if (diceroll !== 7 || diceroll !== 8) {
                                    embed = new Discord.RichEmbed()
                                        .setThumbnail(url='http://104.131.78.209/bot/rpg/dices/' + diceroll + '.png')
                                        .setColor(corevars.randomColor());
                                } else {
                                    embed = new Discord.RichEmbed()
                                        .setThumbnail(url=__dirname + '/dices/' + diceroll + '.png')
                                        .setColor(corevars.randomColor());
                                }
                                message.channel.send({embed: embed});
                            }
                            talkedRecently.add(message.author.id);
                            setTimeout(() => {
                                // Removes the user from the set after a minute
                                talkedRecently.delete(message.author.id);
                            }, 10000);
                        }
                    });
                } else {
                    message.channel.send('Uhm.. even in a fairy world that wouldn\'t be a valid number..');
                }
            } else {
                message.channel.send('You didn\'t specify a price.');
            }
        }
    }
};