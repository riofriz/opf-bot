require("dotenv").config();
let corevars = require('../core/corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Users']);

module.exports = {
  changenick: function (message, args, client) {
      "use strict";

      console.log(client.user.id);
      console.log(client.users.get(client.user.id));
      console.log(client.users.get(message.author.id));

      if (args[0]) {
          let string;
          for (let i = 0; i !== args.length; i++) {
              string += args[i] + ' ';
          }

          message.guild.member(message.client.user).setNickname(args.newNickname).then(member => {
              message.reply(`nice one!`);
              message.client.logger.info(`nice one on the '${message.guild.name}' guild`);
          });

          // message.channel.send('<@'+message.author.id+'> Your username has been changed to: '+string);
      } else {
          message.channel.send('no argument passed');
      }
  }
};