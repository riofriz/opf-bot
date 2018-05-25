let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
const youtubeSearch = require('youtube-search');
let youtubeApiKey = process.env.YOUTUBE;

module.exports = {
    corefunctionalityWorks: function(message) {
        let id = message.author.id;
        let filter = m => id === m.author.id;

        message.channel.awaitMessages(filter, {
            max: 1,
            time: 5000,
            errors: ['time']
        })
            .then(collected => {
                message.channel.send('here\'s your collection');
                console.log(collected);
                console.log('AND THEN THIS \n\n\n\n');

                collected.forEach(function(convertedArray, key) {
                    message.channel.send(convertedArray.content);
                });
            })
            // .catch is called on error - time up is considered an error (says so in docs)
            .catch(collected => {
                message.channel.send('Whops.. timed out.');
            });
    },

    poll: function(message, args) {
        let uidHolder = [];
        if (!args[0]) {
            message.channel.send('I can\'t create a poll without parameters!');
        }  else {
            try {
                let options;
                let query;

                for (let i = 0; i !== args.length; i++) {
                    query += args[i] + ' ';
                }
                query = query.replace('undefined', '').trim();
                let excludeQuestion = query.split('>');
                let argsArray = excludeQuestion[1].split(':');
                for (let i = 0; i !== argsArray.length; i++) {
                    options += 'Enter **'+i+'** for '+argsArray[i] + '\n';
                }
                options = options.replace('undefined', '');
                options = options.trim();
                message.channel.send('OK, **POLL STARTED** by '+message.author.username+'!\nQuestion: **'+excludeQuestion[0]+'**\n'+options);
                let filter = m => {
                    let id = m.author.id;
                    if (uidHolder.includes(id) || m.content.startsWith > argsArray.length || m.author.id === '441203112460681216') {
                        return false;
                    } else {
                        uidHolder.push(id);
                        return true;
                    }
                };
                message.channel.awaitMessages(filter, {
                    max: 200,
                    time: 50000,
                    errors: ['time']
                })
                    .then(collected => {
                    })
                    // .catch is called on error - time up is considered an error (says so in docs)
                    .catch(collected => {
                        console.log(collected);
                        if (collected.size > 0) {
                            let finalArray = [];
                            let result = '';
                            let counter = 0;
                            collected.forEach(function (convertedArray, key) {
                                finalArray.push(argsArray[parseInt(convertedArray.content)]);
                                function countInArray(array, what) {
                                    var count = 0;
                                    for (var i = 0; i < array.length; i++) {
                                        if (array[i] === what) {
                                            count++;
                                        }
                                    }
                                    return count;
                                }

                                for (let i = 0; i !== argsArray.length; i++) {
                                    result += '**'+argsArray[i] + '** received **' + countInArray(finalArray, argsArray[i]) + '** votes!\n';
                                }
                                if (counter !== collected.size) {
                                    message.channel.send('There were '+collected.size+' entries! \n\n'+result);
                                }
                                console.log(counter +' - '+collected.size);
                                counter++;
                            });
                        }
                    });
            } catch(err) {
                message.channel.send('I guess something went wrong.. uhm.. ');
            }
        }
    },

    entervaluetest: function(message) {
        let id = message.author.id;
        let filter = m => {
            if (m.content.startsWith('stop'))
                return false;
            else {
                uidHolder.push(id);
                return true;
            }
        };

        message.channel.send('K♥ always wins. 1♠ always loses. \n ');

        message.channel.awaitMessages(filter, {
            max: 1,
            time: 5000,
            errors: ['time']
        })
            .then(collected => {
                message.channel.send('here\'s your collection');
                console.log(collected);
                console.log('AND THEN THIS \n\n\n\n');

                collected.forEach(function(convertedArray, key) {
                    message.channel.send(convertedArray.content);
                });
            })
            // .catch is called on error - time up is considered an error (says so in docs)
            .catch(collected => {
                message.channel.send('Whops.. timed out.');
            });
    }
};