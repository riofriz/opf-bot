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

// Let's call discord now.
const client = new Discord.Client();
// let commandPrefix = 'opf-' || 'op-' || 'o-';
let commandPrefix = '';
let allowed = false;
let notification = true;

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
    }

    //Declares Command variable
    let command = message.content.toLowerCase();
    command = command.slice(commandPrefix.length);

    //Declares args and command with args variable
    const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
    const commandWithArgs = args.shift().toLowerCase();

    // COMMANDS THAT DON'T NEED THE PREFIX TO BE TRIGGERED
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "y'all") {
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
    }
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "oh my god") {
        fun.ezekiel(message);
    }
    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "chuck norris") {
        allowed = true;
        notification = false;
        fun.chuckNorris(message);
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

    // if (corecommands.tooManyTags(message) >= 10) {
    //     message.channel.send(fun.dontTagMe(message));
    // }

    //Checks if starts with prefix and commands are enabled. If false returns nothing.
    if(corecommands.globalCheck(client, commandPrefix, message, allowed) && message.content.toLowerCase().startsWith(commandPrefix)) {

        //If command is not in available commands and user is not mentioned returns fun message.
        if (corevars.isAvailable(commandWithArgs) === false && corevars.isAvailable(command) === false && !message.isMentioned(client.user) && notification !== false) {
            message.channel.send(message.author+' <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250>');
        }

        // CORE COMMANDS

        if (command === 'who\'s boss') {
            corecommands.credits(message);
        }

        if(command === "hello") {
            corecommands.helloMessage(message);
        }

        if(command === "help" || command === ''){
            corecommands.help(commandPrefix, message);
            corecommands.deleteMessage(message);
        }

        if (commandWithArgs === "q") {
            corecommands.quoteMessage(commandPrefix, message, args);
        }

        if (commandWithArgs === "t") {
            //if (message.channel.name === 'multi-lingual-channel') {
                translate.translateText(message, args);
            //} else {
            //    message.channel.send('Naaah.. just speak english in here. try this in #multi-lingual-channel');
            //}
        }

        if (commandWithArgs === 'spoiler') {
            corecommands.spoilerTag(commandPrefix, message, args);
            corecommands.deleteMessage(message);
        }

        if (commandWithArgs === 'spoilalert') {
            corecommands.editMessageToSpoiler(message, args);
        }

        // FORUM API

        if (commandWithArgs === "latest") {
            forumapi.latestCommands(message, args);
        }

        if (commandWithArgs === "username") {
            forumapi.username(message, args);
        }

        if (commandWithArgs === 'whois') {
            forumapi.whois(message, args);
        }

        // FUN COMMANDS

        if (commandWithArgs === "love") {
            fun.love(message, args);
        }

        if (commandWithArgs === "yomama") {
            yomomma.yomama(message, args);
        }

        if (commandWithArgs === "howlong") {
            fun.howlong(message, args);
        }

        if (commandWithArgs === 'nsfw') {
            fun.nsfw(message);
        }

        if (command === 'muhahaha') {
            fun.evilLaugh(message);
        }

        if (commandWithArgs === 'garchu') {
            fun.garchu(client, message, args);
        }

        if (commandWithArgs === 'meme') {
            if (message.channel.name === 'memes') {
                fun.getMeme(message, args);
            } else {
                message.channel.send('Sorry, this is not allowed in here. try in #memes');
            }
        }

        if (commandWithArgs === 'whops') {
            fun.whops(message);
        }

        if (commandWithArgs === 'pokemon') {
            if (message.channel.name === 'pokemon_channel') {
                gamerchannel.pokemon(message, args);
            } else {
                message.channel.send('Sorry, this is not allowed in here. try in #pokemon_channel');
            }
        }

        // GAMERS
        if (commandWithArgs === 'sgame') {
            if (message.channel.name === 'gamers-general') {
                gamerchannel.gamesearch(message, args);
            } else {
                message.channel.send('Sorry, this is not allowed in here. try in #gamers-general');
            }
        }

        // INFO SEARCH
        if (commandWithArgs === 'movie') {
            variousapi.mediaSearch(message, args, 'movie')
        }
        if (commandWithArgs === 'series') {
            variousapi.mediaSearch(message, args, 'tv')
        }

        // USER SPECIFIC
        if (command === 'grin') {
            fun.onlyForGrin(message);
        }
    }

});

client.login(process.env.BOT_TOKEN);



