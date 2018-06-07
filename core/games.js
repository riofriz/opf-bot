const Discord = require('discord.js');
const Trivia = require('trivia-api');
const trivia = new Trivia({ encoding: 'url3986' });

module.exports = {

    popquiz: function(message, args) {
        if (args[0]) {
            let interval;
            if (args[0].trim() === 'on') {
                interval = setInterval(function () {
                    // use the message's channel (TextChannel) to send a new message
                    let options = {
                        amount: 1,
                        difficulty: 'medium'
                    };
                    trivia.getQuestions(options)
                        .then(questions => {
                            console.log(questions);
                        })
                        .catch(console.error);

                    message.channel.send("popquiztest")
                        .catch(console.error); // add error handling here
                }, 5000);
            } else if (args[0].trim() === 'off') {
                return clearInterval(interval);
            }
        }
    }

};