const Discord = require('discord.js');

module.exports = {

    popquiz: function(message, args) {
        if (args[0]) {
            let interval;
            if (args[0].trim() === 'on') {
                interval = setInterval(function () {
                    // use the message's channel (TextChannel) to send a new message
                    message.channel.send("popquiztest")
                        .catch(console.error); // add error handling here
                }, 5000);
            } else if (args[0].trim() === 'off') {
                return clearInterval(interval);
            }
        }
    }

};