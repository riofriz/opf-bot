let corevars = require('./corevars');
require("dotenv").config();
let fun = require('./fun');
const Discord = require('discord.js');
const fs = require('fs');
let qs = require('qs');
let https = require('https');
const PasteeAPI = require('pastee-api');
let Pastee = new PasteeAPI(process.env.PASTEBIN);
let mongojs = require('mongojs');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Emojis']);


module.exports = {

    /**
     * @param client
     * @param commandPrefix
     * @param message
     * @returns {boolean}
     */
    globalCheck: function(client, commandPrefix, message, allowed) {
        if
        (
            !allowed === true
            && !message.isMentioned(client.user)
        ) { return false;
        } else { return true;
        }
    },

    /**
     * @param message
     */
    helloMessage: function(message) {
        message.channel.send(corevars.randomHello()+' '+message.author);
    },

    /**
     * @param message
     */
    help: function(commandPrefix, message) {
        let embed = new Discord.RichEmbed()
            .addField(commandPrefix+"help", "Sends this help embed")
            .addField(commandPrefix+"hello", "👋 Sends a friendly message! 👋")
            .addField(commandPrefix+"latest manga", "📰 Shows the latest OP issue 📰")
            .addField(commandPrefix+"latest anime", "Shows the latest OP episode")
            .addField(commandPrefix+"latest nakama", "Last user to join the forum")
            .addField(commandPrefix+"love <user>", "<:pfft:445023527888748544>")
            .addField(commandPrefix+"pokemon <name/id>", "❓ WHO'S THAT POKEMON ❓. only in #pokemon_channel")
            .addField(commandPrefix+"sgame", "Displays information about the game requested. only in #gamers-general")
            .addField(commandPrefix+"movie", "Displays information about the movie requested")
            .addField(commandPrefix+"series", "Displays information about the series requested")
            .addField(commandPrefix+"meme <get>/<make>:meme_id:message1:message2", "Gets a random meme or makes one given specific id. (meme id can be found at the bottom of the random meme get or here: https://api.imgflip.com/popular_meme_ids")
            .addField(commandPrefix+"spoiler <topic>:<spoilercontent>", "⚠️ Hides the content in a paste.ee url that contains the spoiler. usage example: opf-spoiler one piece : ACE NOOO! ⚠️")
            .addField(commandPrefix+"spoilalert <messageid>", "🚨 Converts the selected message into a spoiler. Right click on the message to copy the id. (To enable: UserSettings -> Appearance -> Enable Developer mode.) 🚨")
            //.addField(commandPrefix+"username <nickontheforum>", "connects your discord account to opf")
            //.addField(commandPrefix+"whois <user>", "If registered shows who the user is on opf")
            .addField(commandPrefix+"q <messageid> > reply to message", "(quote) Quotes message. Right click on the message to copy the id. (To enable: UserSettings -> Appearance -> Enable Developer mode.)")
            .addField(commandPrefix+"t <languagecode> > <text/messageid>", "(translation) 🇨🇳 🇺🇸 🇫🇷 🇪🇸 🇮🇹 🇷🇺 🇬🇧 Translates either plain text or someone's message. e.g. to translate something to English: opf-t en > bella ciao (or id of the message). Only on #multi-lingual-channel")
            .setTitle("Bot commands:")
            .setFooter("Your lovable OPF MegaBot")
            .setColor(corevars.randomColor());

        message.author.send({embed: embed});
    },

    /**
     * THIS IS A BETA. NEEDS MORE TESTING.
     * @param message
     * @param args
     */
    quoteMessage: function(commandPrefix, message, args) {
        let thisCommand = message.content.toLowerCase().replace(commandPrefix+'q', '').split(' > ');
        message.channel.fetchMessages({
            limit: 50
        })
            .then(messages => {
                let msg_array = messages;
                msg_array = msg_array.filter(m =>  m.id === thisCommand[0]);

                message.channel.fetchMessage(thisCommand[0])
                    .then(m => {
                        message.channel.send('<@'+m.author.id+'>, '+message.author.username+' said " '+thisCommand[1]+'" to: \n' + '```'+m.content+'```');
                    });
                message.channel.fetchMessage(message.id)
                    .then(m => {
                        m.delete();
                    });
            });
    },

    /**
     * @param message
     */
    deleteMessage: function(message) {
        let deletemessage = message.channel.fetchMessage(message.id)
            .then(m => {
                m.delete();
            });
        return deletemessage;
    },

    /**
     * @param message
     */
    credits: function(message) {
        message.channel.send('<@408255473821679617> made me, he\'s boss!');
    },

    /**
     * @param commandPrefix
     * @param message
     * @param args
     */
    spoilerTag: function(commandPrefix, message, args) {
        let string = message.content.toLowerCase().replace(commandPrefix+'spoiler', '').split(':');
        if (string.length >= 2) {
            // Submit a normal paste
            Pastee.paste({"contents" : string[1], "name": string[0], "expire": 2}).then(res => {
                message.channel.send('```diff\n- ⚠️ SPOILER ⚠️```' + string[0] + ': ' + res.link);
            }).catch(err => {
                console.log(err);
            });
        } else {
            message.channel.send('Sorry, wrong syntax.. try again opf-<spoilerargument>:<spoilercontent>');
        }
    },

    editMessageToSpoiler: function(message, args) {
        message.channel.fetchMessage(args[0])
            .then(m => {
                Pastee.paste({"contents" : m.content, "name": m.author.username, "expire": 100}).then(res => {
                    m.delete();
                    message.channel.send('```diff\n- ⚠️ SPOILER ⚠️``` <@'+m.author.id+'>, your message has been converted into spoiler. \n' + res.link);
                }).catch(err => {
                    console.log(err);
                });
            });
    },

    ping: function(message, client) {
        message.channel.send('Pong! '+client.ping + ' ms');
    },

    hasEmojiPermission: function(message) {
        try {
            db.Emojis.findOne({"doc": "permissions"}, function (err, doc) {
                if (doc) {
                    if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('allowed')) {
                        let users = doc.allowed;
                        let isAllowed = false;
                        for (let i=0; i !== users.length; i++) {
                            if (users[i].user === message.author.id) {
                                isAllowed = true;
                            }
                        }
                        return isAllowed;
                    }
                }
            });
        } catch (e){ console.log(e); }
    }

    // tooManyTags: function(message) {
    //     let counter = 0;
    //     let firstChar = '';
    //     if (message.content.includes("<@")) {
    //         firstChar = '<@';
    //     } else if (message.content.includes("<!@")) {
    //         firstChar = '<!@';
    //     }
    //
    //     message.channel.fetchMessages({limit: 10})
    //         .then(messages => {
    //             for (let key in messages) {
    //                 if (messages.hasOwnProperty(key)) {
    //                     if (key <= 10) {
    //                         console.log(messages[key].content);
    //                         let subStr = messages[key].content.match(firstChar + "(.*)>");
    //                         if (messages[key].isMentioned(subStr)) {
    //                             counter++;
    //                         }
    //                     }
    //                 }
    //             }
    //             if(counter < 10) {
    //                 console.log(counter);
    //             }
    //             return counter;
    //         });
    // }
};