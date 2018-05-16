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
            message.channel.send('na na.. not allowed <:pfft:445023527888748544>');
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
            message.channel.send('whops.. you can\'t.. <:pfft:445023527888748544>');
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
            "y'all",
            "chuck norris",
            "<@!415230548248887296>",
            "<@415230548248887296>",
            "darling",
            "oh my god",
            "luv u",
            "zak"
        ];
        let result;
        let string;
        for (let i = 0; i !== substrings.length; i++) {
            // string = str.split(' ');
            // for (let j = 0; j !== string.length; j++) {
            //     if (string[j] === substrings[i]) {
            //         result = string[j];
            //     }
            // }
            if (str.includes(substrings[i])) {
                result = substrings[i];
            }
        }
        return result;
    },

    /**
     * @param message
     * @param args
     */
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
                } else {
                    console.log(error.message);
                }
            });

        } else if (args[0] === 'make' && typeof args[1] !== 'undefined') {
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
            message.channel.send('Please use **get** or give **make** some parameters. This command makes no sense to me.')
        }
    },

    /**
     * @param message
     */
    chuckNorris: function(message) {
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let options = {
            url: 'https://api.chucknorris.io/jokes/random',
            method: 'GET',
            headers: headers
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let customMeme = json_body['value'];
                let embed = new Discord.RichEmbed()
                    .setColor(corevars.randomColor())
                    .setTitle(customMeme)
                    .setThumbnail('https://media1.tenor.com/images/a3e63648c2db760af344e99aaa813154/tenor.gif')
                    .setFooter(message.author.username);
                message.channel.send({embed: embed});
            } else {
                console.log(error.message);
            }
        });
    },

    /**
     * @param message
     * @param args
     */
    howlong: function(message, args) {
        let bodystr = '';
        let randomNumber = Math.floor(Math.random()*30);
        let ptff = '';
        let mention = '';
        let dick;
        if (randomNumber <= 5) {
            ptff = '<:pfft:445023527888748544>';
        }
        for (i = 0; i<= randomNumber; i++) {
            bodystr += '=';
        }
        if (typeof args[0] !== 'undefined') {
            mention = args[0];
            if (mention.trim() === '<@408255473821679617>' && message.author.id !== '408255473821679617') {
                dick = mention+' = 8=======================================================D ';
            } else if (mention.trim() === '<@273453235287883776>' || mention.trim() === '<@!273453235287883776>') {
                dick = mention+' = {(\')}';
            } else {
                dick = mention+' = 8'+bodystr+'D '+ptff;
            }
        } else {
            dick = '8'+bodystr+'D '+ptff;
        }
        message.channel.send(dick);
    },

    whops: function(message) {
        let whops = [
        "I didn't want to be a toy",
        "I didn't do it for the joy",
        "I just wanted you to enjoy",
        "My darling"
        ];
        let randomOne = Math.floor(Math.random() * whops.length);
        message.channel.send(whops[randomOne]);
    },

    dontTagMe: function(message) {
        if (message.author.id !== '441203112460681216') {
            let intro = 'If you tag her again ';
            let threats = [
                "I will get my first period teacher to go and bore the crap out of you until your ears bleed and make you listen to every horrible song ever made until finally your head pops if you don't shut up. If that doesn't work (or does but then doesn't kill you, yet) then I will get every single fan of every famous pop artist and tell them you made a threat and an actual plan to assassinate their idol and make them chase you until you break your legs and then they will finally take your dead body and throw it off the tower of which one of the records were made in. After, I will get Burnie to play the dubstep hipster cat on replay for hours, have Miles do the Bane voice, and Kara's annoying turkey playing on and on at the same time until you take the gun in front of you, and put your self out of annoying misery",
                "I will dress you as a lettuce and feed you to the snails, it will be a very slow death..",
                "Ill shove my shoe straight down your throat then rip out your intestines and strangle you with it until you pass out , when you wake up you'll be strapped in a metal bed with saws on each limb , slowly , each limb gets cut , and i come up with a chain saw and slowly cut your throat so i can get my shoe again cause im going out with some friends",
                "I'll slit your throat and smoke weed with your windpipe",
                "I will delete your hard drive.",
                "I'll beat you to death with a spoon.",
                "I will donkey punch you so hard that your eyeballs will pop out of their sockets and then I'll shove them down your throat and choke you with them!",
                "I'm going to count to 5...If I get to three and you're still here I will crush your skull. If I get to four... I'll rip out all of your limbs, slowly. And then I'll cautrerize the stumps. If I get to five...I'm going to throw your torso threw that wall down 20 stories and then...then I'll jump down myself to see if you're alive. And if you are...I'll finish the job. Slowly.",
                "I'll skin you alive with a cheese grater and draw pictures on what's left with a sharpie",
                "I'll rip out your tongue, cut your arm off with it, and beat you to death with the arm.",
                "I will smear your insides with tuna, hang a fishing hook down your throat, and hook out your organs one by one..",
                "I'm going to grill your piles, and serve them up as jumbo hot dogs to your mum and dad.",
                "I'm gonna rip your small intestine out your mouth, and rip your large intestine out your butt, and use you as a skipping rope."
            ];
            let randomOne = Math.floor(Math.random() * threats.length);
            message.channel.send(intro + threats[randomOne]);
        }
    },

    onlyForGrin: function(message) {
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': 'anime-kawaii'}
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let randomNumber = Math.floor(Math.random()*json_body['results'].length);
                let embed = new Discord.RichEmbed()
                    .setTitle('Enjoy this cute gif.. for now.. <:tsun:432123531443175425>')
                    .setColor(corevars.randomColor())
                    .setImage(json_body['results'][randomNumber]['media'][0]['gif']['url']);
                message.channel.send({embed: embed});
            } else {
                console.log(error.message);
            }
        });
    },

    darling: function(message) {
        let embed = new Discord.RichEmbed()
            .setTitle('Tell me darliiiiing')
            .setColor(corevars.randomColor())
            .setImage('https://data.whicdn.com/images/306191217/original.gif');
        message.channel.send({embed: embed});
    },

    ezekiel: function(message) {
        let title = "**Ezekiel 25:17.** - The path of the righteous man.";
        let passage = "\"The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of the darkness. For he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know I am the Lord when I lay my vengeance upon you.\""

        let embed = new Discord.RichEmbed()
            .addField(title, passage)
            .setColor(corevars.randomColor())
            .setThumbnail('http://photo.cultjer.com/img/cache/width/1000/ug_photo/2014_04/pulp_fiction120140422171446.jpg');
        message.channel.send({embed: embed});
    },

    luvU: function(message) {
        let riofriz = '408255473821679617';
        let grin = '273453235287883776';
        console.log(message.content);
        if (message.author.id === grin) {
            if (message.content.toLowerCase().includes('<@408255473821679617>') || message.content.toLowerCase().includes('<@!408255473821679617>')) {
                message.channel.send('He totally luv u back <3');
            } else {
                message.channel.send('I\'ll allow it only if is for riofriz.');
            }
        } else if (message.author.id === riofriz) {
            if (message.content.toLowerCase().includes('<@273453235287883776>') || message.content.toLowerCase().includes('<@!273453235287883776>')) {
                message.channel.send('awwwwwww so damn sweet.');
            }
        } else {
            message.channel.send('Only riofriz is worthy of such lovely abbreviations. Please, don\'t use it');
        }
    },

    zak: function(message) {
        let timeout = [
            1000, 5000, 9000, 15000, 55000, 946000, 7000, 234232, 5343, 10, 5324254, 53444254
        ];
        let randomOne = Math.floor(Math.random() * timeout.length);
        let randomNumber = timeout[randomOne];
        console.log(randomNumber);
        setTimeout(function() {
            message.channel.send('Nik')
        }, randomNumber);
    }
};
