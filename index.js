//configure enviornment variables
require("dotenv").config();

// Import all the modules.
const Discord = require('discord.js');
let corevars = require('./core/corevars');
let corecommands = require('./core/corecommands');
let forumapi = require('./core/forumapi');
let fun = require('./core/fun');

// Let's call discord now.
const client = new Discord.Client();

const commandPrefix = "opf-";

// OPFBOT READY? GOOO
client.on("ready", () => {
    console.log("Bot started!");
    client.user.setUsername("OPF MegaBot");
    client.user.setPresence({ game: { name: 'Try opf-help to see what i can do!' } });
});

client.on("message", (message) => {
    "use strict";

    //Declares Command variable
    let command = message.content.toLowerCase();
    command = command.slice(commandPrefix.length);

    //Declares args and command with args variable
    const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
    const commandWithArgs = args.shift().toLowerCase();


    //Checks if starts with prefix, bot is mentioned and commands are exceptions. If false returns nothing.
    if(!corecommands.globalCheck(client, commandPrefix, message)) {
        return;
    }

    //If command is not in available commands and user is not mentioned returns fun message.
    if (corevars.isAvailable(commandWithArgs) === false && corevars.isAvailable(command) === false && !message.isMentioned(client.user) && corevars.isException(fun.commandsWithNoCommands(message.content.toLowerCase())) === false) {
        message.channel.send(message.author+' <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250> <:ping:432976718010122250>');
    }

    // CORE COMMANDS

    if (command === 'who\'s boss') {
        corecommands.credits(message);
    }

    if(command === "hello"){
        corecommands.helloMessage(message);
    }

    if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "y'all") {
        message.channel.send("You know, every time you say *y'all* Grin dies inside.");
    } else if (fun.commandsWithNoCommands(message.content.toLowerCase()) === "symphogear") {
        message.channel.send("mmmh.. you mean ＳＹＭＰＨＯＧＥＡＲ, right? <:rip:433296953208471592>");
    }

    if(command === "help"){
        corecommands.help(commandPrefix, message);
    }

    if (commandWithArgs === "q") {
        corecommands.quoteMessage(commandPrefix, message, args);
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

    if (message.isMentioned(client.user) && message.author !== client.user) {
        fun.messageOnQuote(message);
    }

    if (commandWithArgs === "love") {
        fun.love(message, args);
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

});
client.login(process.env.BOT_TOKEN);



