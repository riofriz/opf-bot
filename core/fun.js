let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');

module.exports = {

    /**
     * @param message
     */
    messageOnQuote: function(message) {
        let textArray = [
            "Nami has the third highest IQ of everyone introduced to us before chapter 64.",
            "Robin's least favourite food is gum, because she can't swallow it. I've always loved this piece of information. It reflects how practical Robin is.",
            "Doflamingo's least favourite food is barbecue. The why is fun to deduce on your own.",
            "Sanji's nosebleeds appeared to become rather amusing to Nami post timeskip. She even laughed at one of them as the crew descended to Fishman Island. I'll find the link later. Edit: Found the link. It seems that Nami has really come to appreciate Sanji as a friend rather than a tool over the years, hence her concern for him in Zou and WCI.",
            "Sanji began smoking to prove himself to Zeff as an adult.",
            "Doflamingo got glasses under his glasses.",
            "Jango's beard is actually the trunk of a mushroom.",
            "Doffy and Viola had a most likely sexual relationship while she was in his crew.",
            "After Corazon's death Law met Shachi and Penguin in a nearby town who were bullying Bepo who set out to see to find his brother, after beating them up they all became friends and founded the Heart Pirates.",
            "The symbols on Kuro's jackets are poop.",
            "The Worst Generation has hilarious hobbys like bathing and interior design (Hawkins), cooking (Killer) and lovemaking and hiking (Urouge).",
            "If a human ate Chopper's devil fruit he would become an \"enlightened human\".",
            "Not about One Piece itself but pretty funny imo: Oda forces his editor to sleep with his phone in his hands so Oda can call him 24 a day.",
            "You should really read some SBS, the question and answer corner of the volumes.",
            "Jinbe was the first warlord to be mention in the series."
        ];

        let randomNumber = Math.floor(Math.random()*textArray.length);

        let embed = new Discord.RichEmbed()
            .setThumbnail(url='http://i.imgur.com/0m6gCqy.jpg')
            .addField("Fun Fact Moment!", textArray[randomNumber])
            .setColor(corevars.randomColor())
            .setFooter("Your lovable opfbot.");
        message.channel.send({embed: embed});
    },

    /**
     * @param message
     * @param args
     */
    love: function(message, args) {
        if (args[0]) {
            message.channel.send(':wedding: '+message.author+" loves "+args[0]+" :wedding:");
        } else {
            message.channel.send(':wedding: '+message.author+" i guess you love everybody.. :wedding:");
            message.channel.fetchMessage(message.id)
                .then(m => {
                    m.delete();
                });
        }
    },

    /**
     * @param message
     */
    nsfw: function(message) {
        if (message.channel.name === 'nsfw') {
            message.channel.send(':drum: And the latest pervert is.. '+message.author);
            message.channel.fetchMessage(message.id)
                .then(m => {
                    m.delete();
                });
        } else {
            message.channel.send('na na.. not allowed <:pfft:393455142239862795>');
        }
    },

    /**
     * @param message
     */
    evilLaugh: function(message) {
        message.channel.send('Evil Laugh!!!!111!!!!');
        message.channel.fetchMessage(message.id)
            .then(m => {
                m.delete();
            });
    },

    /**
     * @param message
     */
    garchu: function(client, message, args) {
        if (message.author.id === '307390107411939329') {
            message.channel.send('whops.. you can\'t.. <:pfft:393455142239862795>');
        } else if (message.author.id === '273453235287883776') {
            message.channel.send('I\'m sorry Grin.. Can\'t let you use this command.. P..p..please understand..');
        } else {
            if (args[0]) {
                let firstStrip = args[0].replace('<@', '');
                let secondStrip = firstStrip.replace('>', '');
                let thirdStrip = secondStrip.replace('!', '');
                client.fetchUser(thirdStrip).then(myUser => {
                    let userAvatar = myUser.avatarURL;
                    let userName = myUser.username;
                    let embed = new Discord.RichEmbed()
                        .setColor(corevars.randomColor())
                        .setTitle('GARCHUUUUUUUUU '+userName)
                        .setThumbnail(userAvatar)
                        .setImage('https://78.media.tumblr.com/7278a764d558c352b4afbf38dfc69b33/tumblr_om24udgwBU1vbwog6o1_1280.gif');
                    message.channel.send({embed: embed});
                });
            } else {
                let embed = new Discord.RichEmbed()
                    .setColor(corevars.randomColor())
                    .setTitle('GARCHUUUUUUUUU')
                    .setImage('https://78.media.tumblr.com/7278a764d558c352b4afbf38dfc69b33/tumblr_om24udgwBU1vbwog6o1_1280.gif');
                message.channel.send({embed: embed});
            }
        }
    },

    /**
     * @param str
     * @returns {*}
     */
    commandsWithNoCommands: function(str) {
        let substrings = [
            "symphogear",
            "y'all"
        ];
        let result;
        for (let i = 0; i !== substrings.length; i++) {
            let string = str.split(' ');
            for (let j = 0; j !== string.length; j++) {
                if (string[j] === substrings[i]) {
                    result = string[j];
                }
            }
        }
        return result;
    },

    getMeme: function(message, args) {
        let memeArray = [];
        if (args[0] === 'get') {

            let headers = {
                'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
            };

            let options = {
                url: 'https://api.imgflip.com/get_memes',
                method: 'GET',
                headers: headers
            };

            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let json_body = JSON.parse(body);
                    for (let key in json_body['data']['memes']) {
                        if (json_body['data']['memes'].hasOwnProperty(key)) {
                            console.log(json_body['data']['memes'][key]);
                            memeArray.push({
                                url: json_body['data']['memes'][key]['url'],
                                id: json_body['data']['memes'][key]['id'],
                                name: json_body['data']['memes'][key]['name']
                            });
                        }
                    }
                    let randomNumber = Math.floor(Math.random() * memeArray.length);
                    let embed = new Discord.RichEmbed()
                        .setColor(corevars.randomColor())
                        .setImage(memeArray[randomNumber]['url'])
                        .setFooter(memeArray[randomNumber]['id']+' - '+memeArray[randomNumber]['name']);
                    message.channel.send({embed: embed});
                }
            });

        } else if (args[0] === 'make') {
            let string = '';
            let headers = {
                'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
            };
            for (let i = 0; i !== args.length; i++) {
                if (args[i] !== 'make') {
                    string += args[i] + ' ';
                }
            }
            string = string.split(':');

            let options = {
                url: 'https://api.imgflip.com/caption_image',
                method: 'POST',
                headers: headers,
                qs: {'username': process.env.BOT_USER, 'password': process.env.BOT_PASSWORD, 'template_id': string[0], 'text0': string[1], 'text1': string[2]}
            };

            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let json_body = JSON.parse(body);
                    let customMeme = json_body['data']['url'];
                    let embed = new Discord.RichEmbed()
                        .setColor(corevars.randomColor())
                        .setImage(customMeme)
                        .setFooter(message.author.username);
                    message.channel.send({embed: embed});
                } else {
                    console.log(error.message);
                }
            });
        } else {
            message.channel.send('Please use get or make, this command makes no sense to me.')
        }

    }
};
