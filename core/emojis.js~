let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Emojis']);
const download = require('image-downloader');

module.exports = {
    customEmojis: function (str, message) {
        try {
            if (/:([\w]+):/g.test(str)) {
                let search;
                search = str.trim().replace(/\:/g, '');
                db.Emojis.findOne({"name": search}, function (err, doc) {
                    if (doc) {
                        let emojiName = doc.name;
                        let emojiFile = doc.file;
                        if (typeof emojiName.trim() !== 'undefined' && emojiName.trim() !== '') {
                            //message.channel.send({file: __dirname + '/customemoji/' + emojiFile});
                            let embed = new Discord.RichEmbed()
                                .setColor('#36393e')
                                .setFooter(':'+emojiName.trim()+': - '+message.author.username)
                                .setImage('http://104.131.78.209/bot/core/customemoji/'+emojiFile);
                            message.channel.send({embed: embed});
                            if (message.author.id !== '441203112460681216') {
                                message.channel.fetchMessage(message.id)
                                    .then(m => {
                                        m.delete();
                                    });
                            }
                        }
                    }
                });
            }
        } catch (e){ console.log(e); }
    },

    addEmoji: function (message, args) {
        if (!args[0]) {
            message.channel.send('I can\'t create an empty emoji..');
        } else {
            try {
                db.Emojis.findOne({"doc": "permissions"}, function (error, perms) {
                    if (perms) {
                        if (JSON.parse(JSON.stringify(perms)).hasOwnProperty('allowed')) {
                            let users = perms.allowed;
                            let isAllowed = false;
                            for (let i=0; i !== users.length; i++) {
                                console.log(users[i].user+' - '+message.author.id);
                                if (users[i].user === message.author.id) {
                                    let id = message.author.id;
                                    let filter = m => id === m.author.id;

                                    let options;
                                    let query;

                                    for (let i = 0; i !== args.length; i++) {
                                        query += args[i] + ' ';
                                    }
                                    //o-emojiadd code > link

                                    query = query.replace('undefined', '').trim();
                                    let argsArray = query.split('>');

                                    message.channel.send('Are you sure you want to add ``:'+argsArray[0].trim()+':`` with image: ``'+argsArray[1]+'`` ?');

                                    message.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 10000,
                                        errors: ['time']
                                    })
                                        .then(collected => {
                                            collected.forEach(function(convertedArray, key) {
                                                if (convertedArray.content.toLowerCase() === 'yes' || convertedArray.content.toLowerCase() === 'y') {
                                                    function ext(url) {
                                                        return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).split('#')[0].substr(url.lastIndexOf("."))
                                                    }

                                                    const downloadOptions = {
                                                        url: argsArray[1],
                                                        dest: __dirname + '/customemoji/' + argsArray[0].trim() + ext(argsArray[1])
                                                    };

                                                    async function downloadIMG() {
                                                        try {
                                                            const {filename, image} = await download.image(downloadOptions);
                                                        } catch (e) {
                                                            throw e
                                                        }
                                                    }

                                                    downloadIMG();

                                                    db.Emojis.findOne({"name": argsArray[0].trim()}, function (err, doc) {
                                                        if (doc) {
                                                            message.channel.send('Emoji ' + argsArray[0] + ' already exists');
                                                        } else {
                                                            db.Emojis.insert({
                                                                "name": argsArray[0].trim(),
                                                                "file": argsArray[0].trim() + ext(argsArray[1]),
                                                                "uploadedBy": message.author.id
                                                            });
                                                            message.channel.send('Emoji ' + argsArray[0] + ' added!');
                                                        }
                                                    });
                                                } else {
                                                    message.channel.send('No emoji has been added.');
                                                }
                                            });
                                        })
                                        // .catch is called on error - time up is considered an error (says so in docs)
                                        .catch(collected => {
                                            message.channel.send('No emoji has been added.');
                                        });
                                }
                            }
                        }
                    }
                });
            } catch (e) {
                console.log('error: ' + e);
            }
        }
    },

    removeEmoji: function (message, args) {
        if (!args[0]) {
            message.channel.send('For as powerful as i am, i need at least to know which emoji you want to remove.')
        } else {
            try {
                db.Emojis.findOne({"doc": "permissions"}, function (error, perms) {
                    if (perms) {
                        if (JSON.parse(JSON.stringify(perms)).hasOwnProperty('allowed')) {
                            let users = perms.allowed;
                            let isAllowed = false;
                            for (let i=0; i !== users.length; i++) {
                                console.log(users[i].user+' - '+message.author.id);
                                if (users[i].user === message.author.id) {
                                    let search;
                                    search = args[0].trim().replace(/\:/g, '');
                                    db.Emojis.findOne({"name": search}, function (err, doc) {
                                        if (doc) {
                                            let emojiName = doc.name;
                                            if (typeof emojiName.trim() !== 'undefined' && emojiName.trim() !== '') {
                                                db.Emojis.remove({"name": search});
                                                message.channel.send('Emoji ``:' + args[0].trim() + ':`` has been fully removed!');
                                            }
                                        } else {
                                            message.channel.send('Emoji ``:' + args[0].trim() + ':`` not found..');
                                        }
                                    });
                                }
                            }
                        }
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    },

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

    emojiHelp: function(message) {
        let string;
        let counter = 0;
        let coll = db.Emojis;
        coll.find({}, {_id : 0}, function(err, docs){
            if (err) {
                console.log(err);
                return;
            }
            docs.forEach(function(doc, index) {
                string += '``:'+doc.name+':`` - ';
                if (counter+1 === docs.length) {
                    string = string.replace('undefined', '');
                    message.channel.send(string);
                }
                counter++;
            });
        });
    },

    emojiPermission: function(message, args) {
        if (!args[0]) {
            message.channel.send('Erhm..')
        } else {
            try {

                db.Emojis.findOne({"doc": "permissions"}, function (err, doc) {
                    if (doc) {
                        if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('allowed')) {
                            let users = doc.allowed;
                            let isAllowed = false;
                            for (let i=0; i !== users.length; i++) {
                                if (users[i].user === message.author.id) {
                                    if (args[0] === 'add') {
                                        if (args[1]) {
                                            let firstStrip;
                                            let secondStrip;
                                            let user;
                                            firstStrip = args[1].replace('<@', '');
                                            secondStrip = firstStrip.replace('>', '');
                                            user = secondStrip.replace('!', '').trim();
                                            db.Emojis.update(
                                                { "doc" : "permissions" },
                                                {$push: { "allowed" : {user}}},
                                                function(err) {console.log(err)}
                                            );
                                            message.channel.send(args[1].trim()+' has now full emoji permissions.');
                                        } else {
                                            message.channel.send('You did\'t specify who to add..')
                                        }
                                    } else if (args[0] === 'remove') {
                                        let firstStrip;
                                        let secondStrip;
                                        let user;
                                        firstStrip = args[1].replace('<@', '');
                                        secondStrip = firstStrip.replace('>', '');
                                        user = secondStrip.replace('!', '');
                                        db.Emojis.update(
                                            { "doc" : "permissions" },
                                            { $pull: { "allowed": { user } } },
                                            function(err) {console.log(err)}
                                        );
                                        message.channel.send(args[1].trim()+' has been removed from the permission list.');
                                    } else if (args[0] === 'list') {
                                        if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('allowed')) {
                                            let users = doc.allowed;
                                            let allowedUsers = '';
                                            for (let i=0; i !== users.length; i++) {
                                                allowedUsers += '<@'+users[i].user+'> - ';
                                            }
                                            allowedUsers = allowedUsers.replace('undefined', '');
                                            message.channel.send(allowedUsers);
                                        } else {
                                            message.channel.send('there are no allowed users.');
                                        }
                                    } else {
                                        message.channel.send('Invalid argument!!');
                                    }
                                }
                            }
                        }
                    }
                });
            } catch(err) {
                console.log(err);
            }
        }
    }

};