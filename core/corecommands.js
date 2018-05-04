let corevars = require('./corevars');
require("dotenv").config();
let fun = require('./fun');
const Discord = require('discord.js');
const fs = require('fs');
let qs = require('qs');
let https = require('https');

module.exports = {

    /**
     * @param client
     * @param commandPrefix
     * @param message
     * @returns {boolean}
     */
    globalCheck: function(client, commandPrefix, message) {
        if
        (
            !message.content.toLowerCase().startsWith(commandPrefix)
            && !message.isMentioned(client.user)
            && corevars.isException(fun.commandsWithNoCommands(message.content.toLowerCase())) === false
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
            .addField(commandPrefix+"hello", "Sends a friendly message!")
            .addField(commandPrefix+"help", "Sends this help embed")
            .addField(commandPrefix+"latest manga", "Shows the latest OP issue")
            .addField(commandPrefix+"latest anime", "Shows the latest OP episode")
            .addField(commandPrefix+"latest nakama", "Last user to join the forum")
            .addField(commandPrefix+"love <user>", "<:pfft:393455142239862795>")
            .addField(commandPrefix+"sgame", "Displays information about the game requested.")
            .addField(commandPrefix+"sgame", "Displays information about the game requested.")
            .addField(commandPrefix+"spoiler <topic>:<spoilercontent>", "Hides the content in a pastebin url that contains the spoiler. usage example: opf-spoiler one piece : ACE NOOO!")
            .addField(commandPrefix+"spoilalert <messageid>", "Converts the selected message into a spoiler. Right click on the message to copy the id. (To enable: UserSettings -> Appearance -> Enable Developer mode.)")
            //.addField(commandPrefix+"username <nickontheforum>", "connects your discord account to opf")
            //.addField(commandPrefix+"whois <user>", "If registered shows who the user is on opf")
            .addField(commandPrefix+"q <messageid> > reply to message", "Quotes message. Right click on the message to copy the id. (To enable: UserSettings -> Appearance -> Enable Developer mode.)")
            .setTitle("Bot commands:")
            .setFooter("Here you have all bot commands you can use!")
            .setColor(corevars.randomColor());

        message.channel.send({embed: embed});
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
        if (string.length === 2) {
            let query = qs.stringify({
                api_option: 'paste',
                api_dev_key: process.env.PASTEBIN,
                api_paste_code: string[1],
                api_paste_name: string[0],
                api_paste_private: 0,
                api_paste_expire_date: '1D'
            });

            let req = https.request({
                host: 'pastebin.com',
                path: '/api/api_post.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': query.length
                }
            }, function (res) {
                let data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    message.channel.send('```diff\n- ⚠️ SPOILER ⚠️```\n' + string[0] + ': ' + data);
                });
            });
            req.write(query);
            req.end();
        } else {
            message.channel.send('Sorry, wrong syntax.. try again opf-<spoilerargument>:<spoilercontent>');
        }
    },

    editMessageToSpoiler: function(message, args) {
        message.channel.fetchMessage(args[0])
            .then(m => {
                let query = qs.stringify({
                    api_option: 'paste',
                    api_dev_key: process.env.PASTEBIN,
                    api_paste_code: m.content,
                    api_paste_name: m.author.username,
                    api_paste_private: 0,
                    api_paste_expire_date: '1D'
                });

                let req = https.request({
                    host: 'pastebin.com',
                    path: '/api/api_post.php',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': query.length
                    }
                }, function (res) {
                    let data = '';
                    res.on('data', function (chunk) {
                        data += chunk;
                    });
                    res.on('end', function () {
                        m.delete();
                        message.channel.send('***SPOILER*** <@'+m.author.id+'> your message has been converted into spoiler. \n' + data);
                    });
                });
                req.write(query);
                req.end();
            });
    }
};