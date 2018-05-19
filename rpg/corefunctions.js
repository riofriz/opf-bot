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

    help: function(rpgPrefix, message) {
        let embed = new Discord.RichEmbed()
            .addField(rpgPrefix+"help", "Sends this help embed")
            .addField(rpgPrefix+"loot", "Loots bellies, wood and iron.")
            .addField(rpgPrefix+"mobfight <bellies_to_bet>", "Fights a random mob. BEWARE: you win/lose according to the bellies you bet and the dice result")
                .setTitle("Bot RPG commands:")
            .setFooter("Your lovable OPF MegaBot")
            .setColor(corevars.randomColor());
        message.author.send({embed: embed});
    },

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
        if (message.channel.name === 'discord-rpg' || message.channel.name === 'gamers-channel' || message.channel.name === 'bot-spam') {
            if (talkedRecently.has(message.author.id)) {
                message.channel.send("The higher your rank, the less you'll have to wait until the next loot. \nUntil you are rank 5, i'll send you a message when you can loot again.\nAfter that you are on your own!");
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
                            let ownedBerries = 0;
                            let ownedWood = 0;
                            let ownedIron = 0;
                            let commands = doc.triggeredCommands;
                            let rank = commands / 250;
                            let cooldown;
                            rank = Math.floor(rank);
                            let berries = Math.random() * 180;
                            let wood = Math.random() * 20;
                            let iron = Math.random() * 20;
                            berries = Math.floor(berries);
                            wood = Math.floor(wood);
                            iron = Math.floor(iron);
                            if (rank <= 5) {
                                cooldown = 300000;
                            } else if (rank > 5 && rank <= 8) {
                                cooldown = 200000;
                            } else if (rank > 8 && rank <= 10) {
                                cooldown = 60000;
                            } else {
                                cooldown = 30000;
                            }
                            if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('claims') && JSON.parse(JSON.stringify(doc)).hasOwnProperty('inventory')) {
                                ownedBerries = doc.claims.berries;
                                ownedWood = doc.inventory.wood;
                                ownedIron = doc.inventory.iron;
                            }
                            if (randomNumber <= 6) {
                                let wheretoloot = somesomething[randomNumber];
                                db.Users.update(
                                    {"id": message.author.id},
                                    {
                                        $set: {
                                            "id": message.author.id,
                                            "claims": {
                                                "berries": parseInt(ownedBerries) + parseInt(berries)
                                            },
                                            "inventory": {
                                                "wood": parseInt(ownedWood) + parseInt(wood),
                                                "iron": parseInt(ownedIron) + parseInt(iron)
                                            }
                                        }
                                    },
                                    {upsert: true},
                                    function (err) {
                                    }
                                );
                                message.channel.send('Searching ' + wheretoloot + ' received ' + berries + '*B*, ' + wood + '*Wood* and ' + iron + '*iron*');
                            } else {
                                message.channel.send('You were searching on an iced lake, you found 1000*B*, 54*wood* and 40*iron* but you slipped and lost it all. <:pfft:445023527888748544>')
                            }
                            // Adds the user to the set so that they can't talk for a bit
                            talkedRecently.add(message.author.id);
                            setTimeout(() => {
                                // Removes the user from the set after a minute
                                if (rank <= 5) {
                                    message.author.send('You can loot again!');
                                }
                                talkedRecently.delete(message.author.id);
                            }, cooldown);
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            message.channel.send('RPG commands are only available in this channels: <#391590887475642368> , <#439686510703411201> , <#391584272844324868>');
        }
    }

};