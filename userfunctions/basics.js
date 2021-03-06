require("dotenv").config();
let corevars = require('../core/corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');

let rpgcore = require('../rpg/corefunctions');

let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Users']);

module.exports = {

    /**
     * @param message
     */
    saveusers: function(message) {
        try {
            let commands;
            let rank;
            let user = message.author;
            db.Users.findOne({ "id" : message.author.id }, function(err, doc) {
                if(doc) {
                    commands = doc.triggeredCommands;
                    if (typeof commands !== 'undefined') {

                    } else {
                        commands = 0;
                    }
                    db.Users.update(
                        { "id" : message.author.id },
                        { $set: { "id":message.author.id, "triggeredCommands":commands } },
                        {upsert: true},
                        function(err) {}
                    );
                } else {
                    commands = 0;
                    db.Users.insert( { "id":message.author.id, "triggeredCommands":commands, "opfusername":"" } );
                }
            });
        } catch (e){ console.log(e); }
    },

    /**
     * @param message
     * @param qty
     */
    increaseCommands: function(message, qty) {
        try {
            let commands;
            let rank;
            let user;
            db.Users.findOne({ "id" : message.author.id }, function(err, doc) {
                if(doc) {
                    commands = doc.triggeredCommands;
                    user = message.author;
                    if (typeof commands !== 'undefined') {
                        rank = commands/250;
                        if (rank % 1 === 0 && commands !== 1 && commands !== 0) {
                            let embed = new Discord.RichEmbed()
                                .setThumbnail(url=user.avatarURL)
                                .addField('You ranked up!', '**'+Math.floor(rank)+'**')
                                .setColor(corevars.randomColor());
                            message.channel.send({embed: embed});
                        }
                    } else {
                        commands = 0;
                    }
                    db.Users.update(
                        { "id" : message.author.id },
                        { $set: { "id" : message.author.id, "triggeredCommands":commands+qty } },
                        {upsert: true},
                        function(err) {}
                    );
                }
            });
        } catch (e){ console.log(e); }
    },

    /**
     * @param message
     * @param args
     * @param Client
     */
    rank: function(message, args, Client) {
        try {
            let commands;
            let rank;
            let user;
            let pre;
            let firstStrip;
            let secondStrip;
            let thirdStrip;
            let howMuchLeft;
            if (args[0]) {
                firstStrip = args[0].trim().replace('<@', '');
                secondStrip = firstStrip.replace('>', '');
                thirdStrip = secondStrip.replace('!', '');
                user = thirdStrip;
                pre = 'User\'s rank';
            } else {
                user = message.author.id;
                pre = 'Your rank';
            }
            db.Users.findOne({ "id" : user }, function(err, doc) {
                if(doc) {
                    commands = doc.triggeredCommands;
                    rank = commands/250;
                    if (commands > 250) {
                        howMuchLeft = 250 * Math.ceil(commands / 250);
                        howMuchLeft = howMuchLeft-commands;
                    } else {
                        howMuchLeft = 250-commands;
                    }
                    if (typeof commands === 'undefined') {
                        commands = 0;
                        db.Users.update(
                            { "id" : message.author.id },
                            { $set: { "id" : message.author.id, "triggeredCommands":commands } },
                            {upsert: true},
                            function(err) {}
                        );
                    } else {
                        Client.fetchUser(user).then(myUser => {
                            let embed = new Discord.RichEmbed()
                                .setThumbnail(url=myUser.avatarURL)
                                .addField(pre, Math.floor(rank))
                                .setFooter(howMuchLeft+' xp left until next rank')
                                .setColor(corevars.randomColor());
                            message.channel.send({embed: embed});
                        });
                    }

                }
            });
        } catch (e){ console.log(e); }
    },

    /**
     * @param message
     */
    claim: function(message) {
        try {
            let today = new Date();
            let latestClaim;
            let ownedBerries;
            let todayNoHours = today.setHours(0, 0, 0, 0);
            db.Users.findOne({"id": message.author.id}, function (err, doc) {
                if (doc) {
                    if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('claims')) {
                        latestClaim = doc.claims.latestClaim;
                        ownedBerries = doc.claims.berries;
                        if (todayNoHours !== latestClaim) {
                            let berries = 250;
                            berries = Math.floor(berries);
                            db.Users.update(
                                {"id": message.author.id},
                                {$set: {"id": message.author.id, "claims": {"latestClaim": todayNoHours, "berries" : ownedBerries+berries}}},
                                {upsert: true},
                                function (err) {}
                            );
                            message.channel.send('Congrats, you received '+berries+'*B*');
                        } else {
                            message.channel.send('Sorry, you already claimed for today.');
                        }
                    } else {
                        let berries = 250;
                        berries = Math.floor(berries);
                        db.Users.update(
                            {"id": message.author.id},
                            {$set: {"id": message.author.id, "claims": {"latestClaim": todayNoHours, "berries" : berries}}},
                            {upsert: true},
                            function (err) {}
                        );
                        message.channel.send('Congrats, you received '+berries+'*B*');
                    }
                }
            });
        } catch (e){ console.log(e); }
    },

    /**
     * @param message
     */
    balance: function(message) {
        let berries;
        try {
            db.Users.findOne({"id": message.author.id}, function (err, doc) {
                    if (doc) {
                        if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('claims')) {
                            berries = doc.claims.berries;
                            message.channel.send('Your current balance is: ' + berries+'*B*');
                        } else {
                            message.channel.send('Your balance is still 0*B*');
                        }
                    } else {
                        message.channel.send('Whops.. there might have been an error.');
                    }
            });
            }
         catch (e){ console.log(e); }
    }
};