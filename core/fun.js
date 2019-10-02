let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
const youtubeSearch = require('youtube-search');
let youtubeApiKey = process.env.YOUTUBE;
const cheerio = require('cheerio');

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
            message.channel.send('na na.. not allowed <:pfft:448636903915257866>');
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

    yt: function(message) {
        let query;
        query = message.content.replace('alexa play', '');
        if(query !== '') {
            query = query.trim();
        } else {
            query = 'teh_pwnerer - teh noob song (PurePwnage.com)';
        }

        let options = {
            maxResults: 10,
            key: youtubeApiKey
        };

        youtubeSearch(query, options, function(err, results) {
            if(err) return console.log(err);
            try {
                let json_body = JSON.parse(JSON.stringify(results));
                let randomNumber = Math.floor(Math.random() * json_body.length);
                message.channel.send(results[randomNumber]['link']);
            } catch (e) {
                message.channel.send('Whops.. Not found..');
            }
        });
    },

    phrasing: function(message) {
        let gif = 'https://i.imgur.com/i2yYun3.gif';
        let embed = new Discord.RichEmbed()
            .setColor(corevars.randomColor())
            .setImage('https://i.imgur.com/i2yYun3.gif');
        message.channel.send({embed: embed});
    },

    /**
     * @param message
     */
    garchu: function(client, message, args) {
        if (message.author.id === '307390107411939329') {
            message.channel.send('whops.. you can\'t.. <:pfft:448636903915257866>');
        } else if (message.author.id !== '415230548248887296' && message.isMentioned('273453235287883776')) {
            let threat = [
                'Listen, Super Girl: G is gonna break you down into so many little pieces that my grandmother, who can do a thousand-piece puzzle of clear-blue sky in less than an hour, will never be able to finish putting you back together again. Even if she does go back in time to when her vision was perfect.',
                'G will throw him out of the window. And I won\'t open it first.',
                'G will not feed your motives, just feed the bears.',
                'G wishes she was an octopus. That way she could shove 8 legs up your ass!',
                'Careful.. G will make your tongue and your rectum swap places.',
                'You won\'t see G in the parking lot.',
                'G will steal your pillow, making sleeping a slightly less pleasurable experience.'
            ];
            let randomNumber = Math.floor(Math.random() * threat.length);
            message.channel.send(threat[randomNumber]);

        } else if (message.author.id === '273453235287883776' && !message.isMentioned('415230548248887296')) {
            message.channel.send('I\'m sorry Grin.. Can\'t let you use this command with this user.. P..p..please understand..');
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

    wednesday: function(message) {
        if(message.author.id === '122093067921522690' || message.author.id === '146822995908755456') { //tony or sprazi
            message.channel.send('He 👉 <:wednesday:443773378277408768> is <:thot:446252685642170369> . He 👉 <:wednesday:443773378277408768> is <:gay:446211332816109579> . And he only cum on 🇼 🇪 🇩 🇳 🇪 🇸 🇩 🅰 🇾');
        } else {
            message.author.send('Stop trying to use the wednesday command!!');
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
            "zak",
            "marco",
            "oh noooooo",
            "oh, hi mark",
            "congratulations",
            "dun dun duuun!",
            "akuuuuu",
            "no pizza",
            "heretic",
            "start up",
            "startup",
            "unlimited",
            "despacito",
            "phoenix",
	    "damn waifu"
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

    trap: function(message) {
        let embed = new Discord.RichEmbed()
            .setColor(corevars.randomColor())
            .setImage('https://media.giphy.com/media/8McNH1aXZnVyE/giphy.gif')
            .setFooter(message.author.username);
        message.channel.send({embed: embed});
    },

    say : function(message) {
        message.channel.send(message.content.replace('o-say', ''));
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
            ptff = '<:pfft:448636903915257866>';
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
            } else if (message.isMentioned('307390107411939329')){
                dick = '<:pfft:448636903915257866>';
            } else {
                dick = mention+' = 8'+bodystr+'D '+ptff;
            }
        } else {
            dick = '8'+bodystr+'D '+ptff;
        }
        message.channel.send(dick);
    },

    boii: function(message, args) {
        if (!args[0]) {
            message.channel.send('You should give me for how long you want me to go bbbbbooooiiiiiii');
        } else {
            try {
                if (args[1]) {
                    message.channel.send('Uhm.. what?');
                } else {
                    if (parseInt(args[0].trim()) < 1900) {
                        let boi = 'i';
                        for (let i = 0; i <= parseInt(args[0].trim()); i++) {
                            boi += 'i';
                        }
                        message.channel.send('Hey bbbbbbbooo' + boi + '!');
                    } else {
                        message.channel.send('Can\'t hold my breath for that long bbbbbooiiiiii');
                    }
                }
            } catch(err) {
                message.channel.send('That\'s not a number, bbbboiiiiii');
            }
        }
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
        let query;
        query = 'anime-blush';

        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let user = message.author.id;
        let string;

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': query}
        };

        if (user === '273453235287883776' || user === '!273453235287883776') {
            string = 'ONIII-CHAAAN! ^_^';
        } else {
            string = 'Enjoy this cute gif.. <:tsun:432123531443175425>'
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                try {
                    let json_body = JSON.parse(body);
                    let randomNumber = Math.floor(Math.random() * json_body['results'].length);
                    let embed = new Discord.RichEmbed()
                        .setTitle(string)
                        .setColor(corevars.randomColor())
                        .setImage(json_body['results'][randomNumber]['media'][0]['gif']['url']);
                    message.channel.send({embed: embed});
                } catch (e) {
                    if (user === '273453235287883776' || user === '!273453235287883776') {
                        message.channel.send('Sorry oniichan, i couldn\'t find what you were looking for.. <:tsun:432123531443175425>');
                    } else {
                        message.channel.send('Whops.. Not found..')
                    }
                }
            } else {
                console.log(error.message);
            }
        });
    },

    gif: function(message, args) {
        let query;
        if (!args[0]) {
            query = 'random';
        } else {
            for (let i = 0; i !== args.length; i++) {
                query += args[i] + ' ';
            }
            query = query.replace('undefined', '');
            query = query.trim();
        }
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let user = message.author.id;
        let string;

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': query}
        };

        let tosend;

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                try {
                    let json_body = JSON.parse(body);
                    let randomNumber = Math.floor(Math.random() * json_body['results'].length);
                    if (query === 'random') {
                        tosend = 'https://media.giphy.com/media/WCwFvyeb6WJna/giphy.gif';
                    } else {
                        tosend = json_body['results'][randomNumber]['media'][0]['gif']['url'];
                    }
                    let embed = new Discord.RichEmbed()
                        .setColor(corevars.randomColor())
                        .setImage(tosend);
                    message.channel.send({embed: embed});
                } catch (e) {
                    message.channel.send('Whops.. Not found..')
                }
            } else {
                console.log(error.message);
            }
        });
    },

    jacky: function(message, args) {
        let query;
        if (!args[0]) {
            query = 'black-butler';
        } else {
            for (let i = 0; i !== args.length; i++) {
                query += args[i] + ' ';
            }
            query = query.replace('undefined', '');
            query = query.trim();
        }
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let user = message.author.id;
        let string;

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': query}
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                try {
                    let json_body = JSON.parse(body);
                    let randomNumber = Math.floor(Math.random() * json_body['results'].length);
                    let embed = new Discord.RichEmbed()
                        .setColor(corevars.randomColor())
                        .setImage(json_body['results'][randomNumber]['media'][0]['gif']['url']);
                    message.channel.send({embed: embed});
                } catch (e) {
                    if (user === '171344312234278913' || user === '!171344312234278913') {
                        message.channel.send('Sorry neechan, i couldn\'t find what you were looking for.. <:tsun:432123531443175425>');
                    } else {
                        message.channel.send('Whops.. Not found..')
                    }
                }
            } else {
                console.log(error.message);
            }
        });
    },

    anja: function(message) {
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let user = message.author.id;
        let string;

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': 'racoon'}
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let randomNumber = Math.floor(Math.random()*json_body['results'].length);
                let embed = new Discord.RichEmbed()
                    .setColor(corevars.randomColor())
                    .setImage(json_body['results'][randomNumber]['media'][0]['gif']['url']);
                message.channel.send({embed: embed});
            } else {
                console.log(error.message);
            }
        });
    },

    chaud: function(message, args) {
        //https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&tags[]=hentai&thumbsize=all
        if (message.channel.name === 'nsfw') {
            let query;
            if (!args[0]) {
                query = 'hentai';
            } else {
                for (let i = 0; i !== args.length; i++) {
                    query += args[i] + ' ';
                }
                query = query.replace('undefined', '');
                query = query.trim();
            }
            let user = message.author.id;
            let string;
            let headers = {
                'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
            };

            let options = {
                url: 'https://api.redtube.com/',
                method: 'GET',
                headers: headers,
                qs: {
                    'data': 'redtube.Videos.searchVideos',
                    'output': 'json',
                    'search': query,
                    'thumbsize': 'medium'
                }
            };

            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let json_body = JSON.parse(body);
                    if (json_body['count'] > 0) {
                        let randomNumber = Math.floor(Math.random() * json_body['videos'].length);
                        if (json_body['videos'][randomNumber].hasOwnProperty('video')) {
                            message.channel.send(json_body['videos'][randomNumber]['video']['url'] + ' <:eggplanthand:446252709910413312> <:eggplanthand:446252709910413312>');
                        }
                    } else {
                        message.channel.send('Whops.. sorry little pervert, couldn\'t find what you were looking for.. <:eggplanthand:446252709910413312> <:eggplanthand:446252709910413312>');
                    }
                } else {
                    console.log(error.message);
                }
            });
        } else {
            message.channel.send('You wish.. This can only work in <#391591250492391435> <:eggplanthand:446252709910413312> <:eggplanthand:446252709910413312>');
        }
    },

    riofriz: function(message) {
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let user = message.author.id;
        let string;

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': 'urusei-lum'}
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let randomNumber = Math.floor(Math.random()*json_body['results'].length);
                let embed = new Discord.RichEmbed()
                    .setColor(corevars.randomColor())
                    .setTitle("DAAAAARLIIIIING!")
                    .setImage(json_body['results'][randomNumber]['media'][0]['gif']['url']);
                message.channel.send({embed: embed});
            } else {
                console.log(error.message);
            }
        });
    },

    nosebleed: function(message) {
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let user = message.author.id;
        let string;

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': 'nosebleed-anime'}
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let randomNumber = Math.floor(Math.random()*json_body['results'].length);
                let embed = new Discord.RichEmbed()
                    .setColor(corevars.randomColor())
                    .setImage(json_body['results'][randomNumber]['media'][0]['gif']['url']);
                message.channel.send({embed: embed});
            } else {
                console.log(error.message);
            }
        });
    },

    rickroll: function(message) {
        let embed = new Discord.RichEmbed()
            .setColor(corevars.randomColor())
            .setImage('https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif');
        message.channel.send({embed: embed});
    },

    mama: function(message) {
        let embed = new Discord.RichEmbed()
            .setColor(corevars.randomColor())
            .setImage('http://24.media.tumblr.com/8bcfa67fd56db0085af62e4fb2e08a92/tumblr_msifvprvL61ss73zlo1_500.gif');
        message.channel.send({embed: embed});
    },

    vpn: function(message) {
        message.channel.send('Users currently using VPN: (1) - <@307390107411939329>');
    },

    tama: function(message) {
        let embed = new Discord.RichEmbed()
            .setColor(corevars.randomColor())
            .setImage('https://s2.imagebanana.com/file/180918/J8HLsw4x.png');
        message.channel.send({embed: embed});
    },
    
    customEmojis: function(str, message) {
        let customEmojis = [
            'pAngel', 'pAww', 'pBlank', 'pBlind', 'pNoMore', 'pKewl', 'pDuck', 'pDSip', 'pPresent', 'pHappy',
            'pCash', 'pMurican', 'pEvil', 'pDerp', 'pDab', 'pNuu', 'pCrayon', 'pAhh', 'pAhhh', 'pWhine',
            'pWhut', 'pWoah', 'pSci', 'pDawg', 'pScared', 'pSip', 'pCookie', 'pSleepy', 'pHmm', 'pVampire', 'pepeRope',
            'pepeKMS', 'pepeCry', 'pepeAnimu', 'pepeTriggered', 'bikki', 'pWdiepie', 'megarot', 'gtfo', 'gtfo1',
            'asd', 'pBooli', 'bunbun', 'dead', 'thinkk', 'benice', 'pCop', 'doffy', 'pepeOh', 'pepeSad', 'pepeWhy',
            'pepeSmirk', 'tearsofjoy', 'fingerheart', 'blob'
        ];
        let result;
        let extension;
        for (let i = 0; i !== customEmojis.length; i++) {
            if (str.includes(':'+customEmojis[i]+':')) {
                result = customEmojis[i];
            }
        }
        if (result === 'pWdiepie' || result === 'megarot' || result === 'asd' || result === 'blob') {
            extension = '.gif';
        } else {
            extension = '.png';
        }
        if (str.includes(':'+result+':') && str.includes('``:'+result+':``') === false) {
            message.channel.send({file: __dirname + '/customemoji/' + result + extension});
            if (message.author.id !== '441203112460681216') {
                message.channel.fetchMessage(message.id)
                    .then(m => {
                        m.delete();
                    });
            }
        }
    },

    neko: function(message) {
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let user = message.author.id;
        let string;

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': 'neko'}
        };

        if (user === '171344312234278913' || user === '!171344312234278913') {
            string = 'ONEEE-CHAAAN! ^_^';
        } else {
            string = 'Enjoy this cute gif.. <:yay2:446663893511569428>'
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let randomNumber = Math.floor(Math.random()*json_body['results'].length);
                let embed = new Discord.RichEmbed()
                    .setTitle(string)
                    .setColor(corevars.randomColor())
                    .setImage(json_body['results'][randomNumber]['media'][0]['gif']['url']);
                message.channel.send({embed: embed});
            } else {
                console.log(error.message);
            }
        });
    },

    pumpkin: function(message) {
        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let user = message.author.id;
        let string;

        let options = {
            url: 'https://api.tenor.com/v1/random',
            method: 'GET',
            headers: headers,
            qs: {'key': process.env.TENOR, 'q': 'hacker'}
        };

        if (user === '156476072777482240' || user === '!156476072777482240') {
            string = '01110100 01110010 01110101 01110100 01101000 00100000 01101001 01110011 00101100 00100000 01101001 00100000 01100100 01101111 01101110 00100111 01110100 00100000 01110010 01101111 01111000';
        } else {
            string = '01110000 01110101 01101101 01110000 01101011 01101001 01101110 00100000 01110010 01101111 01111000 00101110';
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let json_body = JSON.parse(body);
                let randomNumber = Math.floor(Math.random()*json_body['results'].length);
                let embed = new Discord.RichEmbed()
                    .setTitle(string)
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
        // let title = "**Ezekiel 25:17.** - The path of the righteous man.";
        // let passage = "\"The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of the darkness. For he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know I am the Lord when I lay my vengeance upon you.\""
        //
        // let embed = new Discord.RichEmbed()
        //     .addField(title, passage)
        //     .setColor(corevars.randomColor())
        //     .setThumbnail('http://photo.cultjer.com/img/cache/width/1000/ug_photo/2014_04/pulp_fiction120140422171446.jpg');
        // message.channel.send({embed: embed});

        let embed = new Discord.RichEmbed()
            .setImage('http://i0.kym-cdn.com/photos/images/original/000/972/842/1aa.gif');
        message.channel.send({embed: embed});
    },

    ohno: function(message) {
        let embed = new Discord.RichEmbed()
            .setImage('http://i0.kym-cdn.com/photos/images/original/000/781/010/887.gif');
        message.channel.send({embed: embed});
    },

    himark: function(message) {
        let embed = new Discord.RichEmbed()
            .setImage('https://media2.giphy.com/media/l0HUldzuCa0S16SkM/giphy.gif');
        message.channel.send({embed: embed});
    },

    lelolelo: function(message) {
        let embed = new Discord.RichEmbed()
            .setImage('http://i.imgur.com/0yr0PMy.gif');
        message.channel.send({embed: embed});
    },

    luvU: function(message) {
        let riofriz = '408255473821679617';
        let grin = '273453235287883776';
        let string;
        if (message.author.id === grin) {
            if (message.isMentioned('408255473821679617')) {
                string = 'He totally luv u back <3';
            } else {
                string = 'I\'ll allow it only if is for riofriz.';
            }
        } else if (message.author.id === riofriz) {
            if (message.isMentioned('<@273453235287883776>')) {
                string = 'awwwwwww so damn sweet.';
            }
        } else {
            string = 'Only riofriz is worthy of such lovely abbreviations. Please, don\'t use it.';
        }
        message.channel.send(string);
    },

    zak: function(message) {
        // let timeout = [
        //     40000, 90000, 100000, 1000, 5000, 9000, 15000, 55000, 946000, 7000, 234232, 5343, 10, 5324254, 53444254, 2934342, 34141141, 11312321, 535224, 73431213, 2229993, 60493
        // ];
        // let randomOne = Math.floor(Math.random() * timeout.length);
        // let randomNumber = timeout[randomOne];

        let ms = Math.random() * 7222222;
        let sec = Math.floor(ms / 1000);
        let min = Math.floor(sec / 60);
        let hour = Math.floor(min / 60);
        sec = sec % 60;
        min = min % 60;
        hour = hour % 24;

        setTimeout(function() {
            if (message.content.toLowerCase()).includes("marco") {
                console.log('Zak '+ms+' '+message.author.username+' '+hour+'h-'+min+'m-'+sec+'s');
                message.channel.send('Nik - '+'<@'+message.author.id+'> : '+hour+'h-'+min+'m-'+sec+'s');
                console.log('Nik '+message.author.username+' '+hour+'h-'+min+'m-'+sec+'s');
            } else {
                console.log('Marco '+ms+' '+message.author.username+' '+hour+'h-'+min+'m-'+sec+'s');
                message.channel.send('Polo - '+'<@'+message.author.id+'> : '+hour+'h-'+min+'m-'+sec+'s');
                console.log('Polo '+message.author.username+' '+hour+'h-'+min+'m-'+sec+'s');
            }
        }, ms);
    },

    poets: function(message) {
        let quotes = [
            '"Try me again. \n- **riofriz** *May, 2018*"',
            '"When someone lick your tears, it\'s heartwarming. \n- **Grin** *May, 2018*"',
            '"BLACK HOLE. \n- **Stom** chaser *May, 2018*"',
            '"Don\'t come. \n- **Grin** *May, 2018*"\n"Grin, I\'m cXming for you. \n- **Chaudfontaine** *May, 2018*"',
            '"Please do. \n- **Grin** *May, 2018*"',
            '"Is Marco wet? \n- **Chaudfontaine** *May, 2018*"',
            '"Ah, yes! No, no! \n- **Storm chaser**, *May, 2018*"',
            '"...you bring there girl there. \n- **Grin** *May, 2018*"',
            '"you\'re such an inspirement for all curvy headed men ❤ \n- **Mapache** *May, 2018*"',
            '"The fontaine of my Chaud, drink it. \n- **Chaudfontaine** *May, 2018*"',
            '"chats die when the MVPs leave \n- **Sprasle** *May, 2018*"',
            '"Hard G or soft G?" \n- **X Drake** *May, 2018*',
            '"I had a crush on the muscle smurf." \n- **Mapache** *Jul 30, 2015*,',
            '"I forgive but never forget." \n- **Tony** *Jun 18, 2015*',
            '"Even Usopp is more badass than me." \n- **Cobain**, *2015*',
            '"Is that really how you\'re supposed to say Memes? Meams" \n- **Tony**, *2015*',
            '"Everyone has a big dick." \n- **Egameca** *Aug 02, 2015* \n"(slap on your chest) right here, in your heart."\n- **Egameca** *Aug 02, 2015*",',
            '"Meh meh I thought that was what everyone says." \n- **Tony** *Aug, 2015*',


        ];
        let randomOne = Math.floor(Math.random() * quotes.length);
        message.channel.send(quotes[randomOne]);
    },

    ship: function(message, args) {
        let string;
        let firstStrip;
        let secondStrip;
        let user;
        if (args[0]) {
            for (let i = 0; i !== args.length; i++) {
                firstStrip = args[i].replace('<@', '');
                secondStrip = firstStrip.replace('>', '');
                user = secondStrip.replace('!', '');
                string += user + ' ';
            }
            string = string.replace('undefined', '');
            string = string.trim();

            if (string.toLowerCase().includes('x')) {

                let users = string.toLowerCase().split('x');
                let user1 = users[0].trim();
                let user2 = users[1].trim();
                let percentage = Math.floor(Math.random() * 104);
                let progressbar;
                let finalResult;
                if (percentage <= 10) {
                    progressbar = '``[=                        ]``';
                }
                else if (percentage > 10 && percentage <= 20) {
                    progressbar = '``[===                      ]``';
                }
                else if (percentage > 20 && percentage <= 30) {
                    progressbar = '``[======                   ]``';
                }
                else if (percentage > 30 && percentage <= 40) {
                    progressbar = '``[=========                ]``';
                }
                else if (percentage > 40 && percentage <= 50) {
                    progressbar = '``[===========              ]``';
                }
                else if (percentage > 50 && percentage <= 60) {
                    progressbar = '``[===============          ]``';
                }
                else if (percentage > 60 && percentage <= 70) {
                    progressbar = '``[==================       ]``';
                }
                else if (percentage > 70 && percentage <= 80) {
                    progressbar = '``[=====================    ]``';
                }
                else if (percentage > 80 && percentage <= 90) {
                    progressbar = '``[=======================  ]``';
                }
                else if (percentage > 90 && percentage <= 100) {
                    progressbar = '``[=========================]``';
                }

                finalResult = 'Affinity: **' + percentage + '%** ' + progressbar;

                if (percentage > 100) {
                    finalResult = 'I am not powerful enough to measure such big love!!'
                }

                if (percentage === 0) {
                    finalResult = 'Nope!! **0%**'
                }

                if (message.isMentioned('425640277794095104')) { // behnam
                    finalResult = 'Nope!! **0%**'
                }

                if (message.isMentioned('273453235287883776')) { //grin dahling
                    finalResult = 'This user belongs to Master Cookie. I had to disable his shipping to you or she\'d dismantle me and throw me in a spare bot parts dumpster. She is all for recycling.';
                }

                if (message.isMentioned('415230548248887296')) {
                    finalResult = 'Affinity: **0%** ``[...]``';
                }
                if(message.isMentioned('273453235287883776') && message.isMentioned('415230548248887296')) { //grin x 10th
                    finalResult = 'https://orig00.deviantart.net/31de/f/2012/108/1/a/makorra_ship_by_animewaterfall-d4wnoj7.gif';
                }
                if (message.isMentioned('273453235287883776') && message.isMentioned('408255473821679617')) { //riofriz x grin
                        finalResult = 'I am not powerful enough to mesure such big love!! (DON\'T KILL ME, DON\'T KILL ME!!!)'
                }
                if (message.isMentioned('434009741832880128') && message.isMentioned('118473291504549893')) { //jacky x sam
                    finalResult = 'Affinity: **100%** ``[=========================]``';
                }
                if (message.isMentioned('173598881609678848') && message.isMentioned('171344312234278913')) { // Thomas x blossom
                    finalResult = 'Affinity: **100%** ``[=========================]``';
                }
                if (message.isMentioned('415230548248887296') && message.isMentioned('408255473821679617')) { // riofriz x 10th
                    finalResult = 'INTIMACY+++++ . Grin is not as possessive, he won\'t dismantle me.';
                }
                if (message.isMentioned('146822995908755456') && message.isMentioned('408255473821679617')) { // riofriz x zibo
                    finalResult = 'https://media3.giphy.com/media/l2Je3n9VXC8z3baTe/giphy.gif'
                }
                if (message.isMentioned('307390107411939329')) {
                    finalResult = 'Nope!! **0%**';
                }

                message.channel.send(finalResult);
            } else {
                message.channel.send('Mmmh.. there was a mistake, the command is: o-ship @user1 x @user2..');
            }
        } else {
            message.channel.send('Self esteem boost up: affinity **100%** for yourself!! ``[=========================]``');
        }
    },

    boobslap: function(message, args) {
        let image;
        let string;

        if (args[0]) {
            string = '<@'+message.author.id+'> boob slapped '+args[0];
        } else {
            string = 'SELF BOOB SLAP INCOMING!';
        }
        if (message.channel.name === 'nsfw') {
            image = 'https://i.pinimg.com/originals/ac/40/cc/ac40ccb3730ab7e950373e7805e34efe.gif'
        } else {
            image = 'http://i.imgur.com/7frjZnG.gif';
        }

        let embed = new Discord.RichEmbed()
            .setImage(image)
            .setColor(corevars.randomColor());
        message.channel.send(string);
        message.channel.send({embed: embed});
    },

    boobhug: function(message, args) {
        let image;
        let string;

        if (args[0]) {
            string = '<@'+message.author.id+'> boob hugged '+args[0];
        } else {
            string = 'SELF BOOB HUG INCOMING!';
        }

        image = 'https://cdn.weeb.sh/images/rk6PsvOUM.gif';

        let embed = new Discord.RichEmbed()
            .setImage(image)
            .setColor(corevars.randomColor());
        message.channel.send(string);
        message.channel.send({embed: embed});
    },

    rhyme: function(message, args) {
        let string;
        if (args[0]) {
            for (let i = 0; i !== args.length; i++) {
                string += args[i] + ' ';
            }
            string = string.replace('undefined', '');
            string = string.trim();
        }

        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
        };

        let options = {
            url: 'http://api.datamuse.com/words',
            method: 'GET',
            headers: headers,
            qs: {'rel_rhy': string}
        };

        request(options, function (error, response, body) {
            if (args[0]) {
                if (!error && response.statusCode === 200) {
                    let json_body = JSON.parse(body);
                    let result = 'Can\'t find it :(';
                    let counter = 1;
                    for (let key in json_body) {
                        if (json_body.hasOwnProperty(key)) {
                            if (counter === 1) {
                                result = '';
                            }
                            result += json_body[key]['word'];
                            if (json_body.length !== counter) {
                                result += ' , ';
                            }
                            counter++;
                        }
                    }
                    message.channel.send(result.replace('undefined', '').trim());
                } else {
                    console.log(error.message);
                }
            } else {
                message.channel.send('Nothing rhymes with nothing.. <:lul:423899879371177996>')
            }
        });
    },

    prank: function(message, args) {
        let channels = [
            'pokemon_channel',
            'news',
            'memes',
            'chatteroni',
            'multi-lingual-channel',
            'bot-spam',
            'music',
            'gamers-general',
            'quiz-channel',
            'fanart'
        ];
        let user;
        if (args[0]) {
            let firstStrip = args[0].replace('<@', '');
            let secondStrip = firstStrip.replace('>', '');
            user = secondStrip.replace('!', '');
            user = user.trim();
        } else {
            user = message.author.id;
            user = user.trim();
        }
        let randomNumber = Math.floor(Math.random()*channels.length);
        let prankMessage;
        try {
            if ((message.isMentioned('415230548248887296') && message.author.id === '273453235287883776')) {
                prankMessage = 'I love you, <@' + user + '> - *grin*';
            } else if ((message.isMentioned('273453235287883776') && message.author.id === '415230548248887296')) {
                prankMessage = 'U cute, <@' + user + '> - *10th*';
            } else {
                prankMessage = '<@' + user + '> <:pfftbot:449189450094870530> <:pfft:448636903915257866>';
            }
            message.guild.channels.find('name', channels[randomNumber]).send(prankMessage)
        }
        catch (err) {
            console.log(err);
        }
    },

    wuami: function(message, args) {
        let string;
        if (args[0]) {
            for (let i = 0; i !== args.length; i++) {
                string += args[i] + ' ';
            }
            string = string.replace('undefined', '');
            string = string.trim();
        } else {
            string = message.author.username;
        }

        let headers = {
            'User-Agent': 'https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com',
            'Content-Type': 'application/json'
        };

        let options = {
            url: 'https://wunameaas.herokuapp.com/wuami/'+string.trim(),
            method: 'GET',
            headers: headers
        };

        request(options, function (error, response, body) {
            try {
                if (!error && response.statusCode === 200) {
                    const $ = cheerio.load(body);
                    let name = $('.hero-unit p b').text();
                    message.channel.send('**'+string+'** *from this day forward you will also be known as* **'+name+'**');
                } else {
                    console.log(error.message);
                }
            } catch (err) {
                message.channel.send('You are not fit to have an awesome name!');
                console.log(err);
            }
        });
    }
};
