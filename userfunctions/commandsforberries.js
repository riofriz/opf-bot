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
      let string;
      if (args[0]) {
          for (let i = 0; i !== args.length; i++) {
              string += args[i] + ' ';
          }
          string = string.replace('undefined', '');
          console.log(message.guild.me.hasPermission('MANAGE_NICKNAMES'));
          if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
              message.channel.send('I don\'t have permission to change your nickname!');
          } else {
              try {
                  message.member.setNickname(string).catch(err => {
                      console.log(err);
                      message.channel.send('You are too powerful for my to change your nick. Sorry Master.');
                  });
              } catch (e){
                  console.log(e);
              }
          }
          // message.channel.send('<@'+message.author.id+'> Your username has been changed to: '+string);
      } else {
          message.channel.send('no argument passed');
      }
  }

};