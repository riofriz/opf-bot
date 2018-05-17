require("dotenv").config();
let corevars = require('../core/corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Users']);

module.exports = {
  changenick: function (message, args) {

      if (args[0]) {
          let string;
          for (let i = 0; i !== args.length; i++) {
              string += args[i] + ' ';
          }
          if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
              message.channel.send('I don\'t have permission to change your nickname!');
          } else {
              message.member.setNickname(string);
          }
          // message.channel.send('<@'+message.author.id+'> Your username has been changed to: '+string);
      } else {
          message.channel.send('no argument passed');
      }

  }
};