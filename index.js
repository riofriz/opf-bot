//configure enviornment variables
require("dotenv").config();

// Import all the modules.
const Discord = require('discord.js');
let corevars = require('./core/corevars');
let corecommands = require('./core/corecommands');
let forumapi = require('./core/forumapi');
let fun = require('./core/fun');
let gamerchannel = require('./core/gamerchannel');
let translate = require('./core/translate');
let yomomma = require('./core/yomomma');
let variousapi = require('./core/variousapi');
let basiclogics = require('./userfunctions/basics');
let commandsforberries = require('./userfunctions/commandsforberries');
let rpgcore = require('./rpg/corefunctions');
let pvp = require('./rpg/pvp');

// Let's call discord now.
const client = new Discord.Client();
// let commandPrefix = 'opf-' || 'op-' || 'o-';
let commandPrefix = '';
let rpgPrefix = '';
let allowed = false;
let notification = true;

const talkedRecently = new Set();

let randomRankIncrease = Math.random() * 7;
randomRankIncrease = Math.floor(randomRankIncrease);

//const commandPrefix = "opf-" || "op-" || "o-";



// OPFBOT READY? GOOO
client.on("ready", () => {
    console.log("Bot started!");
    client.user.setUsername("OPF MegaBot");
    client.user.setPresence({ game: { name: 'o- / op- / opf- . Try me!' } });
});

client.on("message", (message) => {
    "use strict";

    if (message.content.toLowerCase().includes('opf-')) {
        commandPrefix = 'opf-';
        allowed = true;
    } else if (message.content.toLowerCase().includes('op-')) {
        commandPrefix = 'op-';
        allowed = true;
    } else if (message.content.toLowerCase().includes('o-')) {
        commandPrefix = 'o-';
        allowed = true;
    } else if (message.content.toLowerCase().includes('+')) {
        commandPrefix = '+';
        allowed = true;
    }

    if (message.content.toLowerCase().includes('rpg-')) {
        rpgPrefix = 'rpg-';
        allowed = true;
    } else if (message.content.toLowerCase().includes('rp-')) {
        rpgPrefix = 'rp-';
        allowed = true;
    } else if (message.content.toLowerCase().includes('r-')) {
        rpgPrefix = 'r-';
        allowed = true;
    }

    //Declares Command variable
    let command = message.content.toLowerCase();
    let rpgCommand;
    command = command.slice(commandPrefix.length);
    rpgCommand = command.slice(rpgPrefix.length);

    //Declares args and command with args variable
    const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
    const rpgargs = message.content.slice(rpgPrefix.length).trim().split(/ +/g);
    const commandWithArgs = args.shift().toLowerCase();
    const rpgCommandWithArgs = rpgargs.shift().toLowerCase();

    basiclogics.saveusers(message);
    basiclogics.increaseCommands(message, 1);

    let messageArray = message.content.split(' ');

    // COMMANDS THAT DON'T NEED THE PREFIX TO BE TRIGGERED
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "y'all" && message.author.id !== '441203112460681216') { //&& message.author.id !== '146822995908755456') {
        allowed = true;
        notification = false;
        message.channel.send("You know, every time you say *y'all* Grin dies inside.");
    }
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "symphogear") {
        allowed = true;
        notification = false;
        let embed = new Discord.RichEmbed()
            .setTitle('mmmh.. you mean ＳＹＭＰＨＯＧＥＡＲ, right?')
            .setImage('https://notredreviews.files.wordpress.com/2012/03/1332063182783.gif');
        message.channel.send({embed: embed});
    }
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "darling") {
        fun.darling(message);
        basiclogics.increaseCommands(message, randomRankIncrease);
    }
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "oh my god") {
        fun.ezekiel(message);
    }
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "chuck norris") {
        allowed = true;
        notification = false;
        fun.chuckNorris(message);
    }
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "luv u") {
        allowed = true;
        notification = false;
        fun.luvU(message);
    }
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "zak") {
        allowed = true;
        notification = false;
        fun.zak(message);
        basiclogics.increaseCommands(message, randomRankIncrease);
    }
    if (message.isMentioned('415230548248887296')) {
        allowed = true;
        notification = false;
        fun.dontTagMe(message);
    }

    // REACTS IF BOT IS TAGGED
    if (message.isMentioned(client.user) && message.author !== client.user) {
        fun.messageOnQuote(message);
    }

    if (message.content.endsWith(',')) {
        message.channel.send('Yum!! That comma at the end looks tasty!');
    }

    if (messageArray.length > 25 && message.content.includes(',') === false) {
        if (message.content.includes('?') === false && message.content.includes(';') === false && message.content.includes('!') === false && message.content.includes('.') === false && message.content.includes(':') === false) {
            message.channel.send('Grammar. Mother fuckin\' GRAMMAR.');
        }
    }

    // if (corecommands.tooManyTags(message) >= 10) {
    //     message.channel.send(fun.dontTagMe(message));
    // }

    //Checks if starts with prefix and commands are enabled. If false returns nothing.
    if(corecommands.globalCheck(client, commandPrefix, message, allowed) && message.content.toLowerCase().startsWith(commandPrefix)) {

        //If command is not in available commands and user is not mentioned returns fun message.
        // if (corevars.isAvailable(commandWithArgs) === false && corevars.isAvailable(command) === false && !message.isMentioned(client.user) && notification !== false) {
        //     message.channel.send(message.author+' <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250>');
        // }

        // CORE COMMANDS

        if (command === 'who\'s boss') {
            corecommands.credits(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if(command === "hello") {
            corecommands.helloMessage(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if(command === "help" || message.content === 'o-' || message.content === 'op-' || message.content === 'opf-' || message.content === '+'){
            corecommands.help(commandPrefix, message);
            corecommands.deleteMessage(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === "q") {
            corecommands.quoteMessage(commandPrefix, message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === "t") {
            //if (message.channel.name === 'multi-lingual-channel') {
                translate.translateText(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
            //} else {
            //    message.channel.send('Naaah.. just speak english in here. try this in #multi-lingual-channel');
            //}
        }

        if (commandWithArgs === 'spoiler') {
            corecommands.spoilerTag(commandPrefix, message, args);
            corecommands.deleteMessage(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'spoilalert') {
            corecommands.editMessageToSpoiler(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        // FORUM API

        if (commandWithArgs === "latest") {
            forumapi.latestCommands(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === "username") {
            forumapi.username(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'whois') {
            forumapi.whois(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        // FUN COMMANDS

        if (commandWithArgs === "love") {
            fun.love(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === "yomama") {
            yomomma.yomama(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === "howlong") {
            fun.howlong(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'nsfw') {
            fun.nsfw(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (command === 'muhahaha') {
            fun.evilLaugh(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'garchu') {
            fun.garchu(client, message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'poets') {
            fun.poets(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'meme') {
            if (message.channel.name === 'memes') {
                fun.getMeme(message, args);
            } else {
                message.channel.send('Sorry, this is not allowed in here. try in #memes');
            }
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'whops') {
            fun.whops(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'pokemon') {
            if (message.channel.name === 'pokemon_channel') {
                gamerchannel.pokemon(message, args);
            } else {
                message.channel.send('Sorry, this is not allowed in here. try in #pokemon_channel');
            }
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'boobslap') {
            fun.boobslap(message, args);
        }

        if(commandWithArgs === 'prank') {
            fun.prank(message, args);
            corecommands.deleteMessage(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        // GAMERS
        if (commandWithArgs === 'sgame') {
            if (message.channel.name === 'gamers-general') {
                gamerchannel.gamesearch(message, args);
            } else {
                message.channel.send('Sorry, this is not allowed in here. try in #gamers-general');
            }
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        // INFO SEARCH
        if (commandWithArgs === 'movie') {
            variousapi.mediaSearch(message, args, 'movie');
            basiclogics.increaseCommands(message, randomRankIncrease);
        }
        if (commandWithArgs === 'series') {
            variousapi.mediaSearch(message, args, 'tv');
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        // USER SPECIFIC
        if (command === 'grin') {
            fun.onlyForGrin(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (command === 'niichan') {
            if (message.author.id === '273453235287883776' || message.author.id === '!273453235287883776') {
                fun.onlyForGrin(message);
            }
        }

        if (command === 'bikki') {
            message.channel.send('<:BikkiBerserk:254211431610843136>');
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        //USER INTERACTION WITH BOT
        if (commandWithArgs === 'rank') {
            basiclogics.rank(message, args, client);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (command === 'claim') {
            basiclogics.claim(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (command === 'balance') {
            basiclogics.balance(message);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'nick') {
            commandsforberries.changenick(message, args, client);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if(commandWithArgs === 'rhyme') {
            fun.rhyme(message, args);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (commandWithArgs === 'oprank') {
            rpgcore.oprank(message, args, client);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }
    }

    //RPG COMMANDS

    if(corecommands.globalCheck(client, rpgPrefix, message, allowed) && message.content.toLowerCase().startsWith(rpgPrefix)) {
        if (rpgCommand === 'loot') {
            rpgcore.loot(message, talkedRecently);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if (rpgCommandWithArgs === 'mobfight') {
            pvp.mobfight(message, rpgargs, talkedRecently);
            basiclogics.increaseCommands(message, randomRankIncrease);
        }

        if(rpgCommand === "help" || message.content === 'r-' || message.content === 'rp-' || message.content === 'rpg-'){
            rpgcore.help(rpgPrefix, message);
        }
    }

});

client.login(process.env.BOT_TOKEN);



