let corevars = require('./corevars');
const Discord = require('discord.js');
let Parser = require('rss-parser');
let parser = new Parser();
let fs = require('fs')


module.exports = {
    /**
     *
     * @param message
     * @param args
     */
    latestCommands: function(message, args) {
        let title;
        if (typeof args[0] !== 'undefined') {
            let pull;
            if (args[0] === 'manga') {
                pull = 'one-piece-manga';
            } else if (args[0] === 'anime') {
                pull = 'one-piece-anime'
            } else if (args[0] === 'nakama') {
                pull = 'konnichiwa'
            }
            if (pull === 'konnichiwa' || pull === 'one-piece-manga' || pull === 'nakama') {
                (async () => {
                    let feed = await parser.parseURL(corevars.buildRss(pull));
                    if (args[0] === 'manga') {
                        feed.items.forEach(item => {
                            "use strict";
                            title = item.title;
                            if (title.includes("Predictions") === false && title.includes("One Piece Chapter")) {
                                message.channel.send('***' + title + '*** is out!! Check it out' + ': \n' + item.link);
                            }
                        });
                    } else if (args[0] === 'anime') {
                        feed.items.forEach(item => {
                            "use strict";
                            title = item.title;
                            if (title.includes("Predictions") === false && title.includes("One Piece Episode")) {
                                message.channel.send('***' + title + '*** is out!! Check it out' + ': \n' + item.link);
                            }
                        });
                    } else if (args[0] === 'nakama') {
                        let counter = 0;
                        feed.items.forEach(item => {
                            "use strict";
                            if (counter === 0) {
                                "use strict";
                                title = item.creator;
                                message.channel.send('***' + title + '*** is the latest Nakama! Say welcome' + ':\n ' + item.link);
                            }
                            counter++;
                        });
                    }
                })();
            } else {
                message.channel.send('Latest what??? <:ping:432976718010122250>');
            }
        } else {
            message.channel.send('Latest what??? <:ping:432976718010122250>');
        }
        message.channel.fetchMessage(message.id)
            .then(m => {
                m.delete();
            });
    },

    /**
     * @param message
     * @param args
     */
    username: function(message, args) {
        // let logger = fs.createWriteStream('logs/log.txt', {
        //     flags: 'a' // 'a' means appending (old data will be preserved)
        // });
        // logger.write(message.author+' - '+args[0]+'\n');
        // message.channel.send('Ok, '+message.author+' i\'ll remember you are '+args[0]+' on the forum.');

        // let obj = {
        //     table: []
        // };
        // obj.table.push(message.author = [{'forumname':args0}]);
        // let json = JSON.stringify(obj);
        // fs.writeFile('myjsonfile.json', json, 'utf8', callback);
        let obj;
        fs.readFile(
            'logs/opfusers.json', 'utf8', function callback(err, data){
            if (err){
                console.log(err);
            } else {
                obj = JSON.parse(data); //now it an object
                obj.table.push({'id': message.author.id, 'forumname': args[0]}); //add some data
                let json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('logs/opfusers.json', json, callback); // write it back
                message.channel.send('Ok, '+message.author+' i\'ll remember you are '+args[0]+' on the forum.');
            }
        });
    },

    /**
     * BETA, NOT WORKING FOR NOW.
     * @param message
     * @param args
     */
    whois: function(message, args) {
        let nick = '';
        let fileLineArray = [];
        let lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('logs/log.txt')
        });
        let wordIs = '';
        lineReader.on('line', function (line) {
            fileLineArray.push(line);
        });
        lineReader.on('close', function(){
            for(let i = 0; i !== fileLineArray.length; i++){
                wordIs = fileLineArray[i];
                if(wordIs.includes(args[0]) === true){
                    let nickArray = wordIs.split(" ");
                    if (nickArray[0] === args[0]) {
                        nick = ':mag: I guess '+nickArray[2]+' is the person you are looking for :mag:';
                    } else if (nickArray[2] === args[0]) {
                        nick = ':mag: I guess '+nickArray[0]+' is the person you are looking for :mag:';
                    } else {
                        nick = '';
                    }
                }
            }
            if (nick !== '') {
                message.channel.send(nick);
            } else {
                message.channel.send('I honestly have no idea who '+args[0]+' is.. ¯\\_(ツ)_/¯');
            }
        });
    }
};