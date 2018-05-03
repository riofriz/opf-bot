let corevars = require('./corevars');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {

    globalCheck: function(client, commandPrefix, message) {
        if
        (
            !message.content.toLowerCase().startsWith(commandPrefix)
            && !message.isMentioned(client.user)
            && corevars.isException(message.content.toLowerCase()) === false
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
                // filter the message to only your own
                //msg_array = msg_array.filter(m => m.author.id === args[0]);
                // limit to the requested number + 1 for the command message
                msg_array = msg_array.filter(m =>  m.id === thisCommand[0]);

                message.channel.fetchMessage(thisCommand[0])
                    .then(m => {
                        // let embed1 = new Discord.RichEmbed()
                        //     .setFooter()
                        //     .setColor(colorArray[randomColor]);
                        //@USER... QUOTER said "(message)" to:

                        message.channel.send('<@'+m.author.id+'>, '+message.author.username+' said " '+thisCommand[1]+'" to: \n' + '```'+m.content+'```');
                        // Send the embed with message.channel.send()
                    });
                message.channel.fetchMessage(message.id)
                    .then(m => {
                        m.delete();
                    });

                //message.channel.send(fetchMessage(thisCommand[0]));
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

    credits: function(message) {
        message.channel.send('<@408255473821679617> made me, he\'s boss!');
    }
};