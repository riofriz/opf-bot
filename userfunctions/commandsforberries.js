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
          string = string.trim();
          console.log(message.guild.me.hasPermission('MANAGE_NICKNAMES'));
          if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
              message.channel.send('I don\'t have permission to change your nickname!');
          } else {

              let berries;
              try {
                  db.Users.findOne({"id": message.author.id}, function (err, doc) {
                      if (doc) {
                          if (JSON.parse(JSON.stringify(doc)).hasOwnProperty('claims')) {
                              berries = doc.claims.berries;
                              let balanceReturn = 50-berries;
                              let balanceLeft = berries-50;
                              if (berries >= 50) {

                                  let promise1 = new Promise(function(resolve, reject) {
                                      message.member.setNickname(string);
                                      db.Users.update(
                                          {"id": message.author.id},
                                          {$set: {"id": message.author.id, "claims": {"berries" : balanceLeft}}},
                                          {upsert: true},
                                          function (err) {}
                                      );
                                      message.channel.send('Your nick has been updated to *'+string+'* and your balance is now '+balanceLeft+'*B*');
                                  });

                                  promise1.catch(function(error) {
                                      console.log(error);
                                      message.channel.send('You are too powerful for me to change your nick. Sorry Master.');
                                  });


                                  // message.member.setNickname(string).catch(err => {
                                  //     console.log(err);
                                  //     message.channel.send('You are too powerful for me to change your nick. Sorry Master.');
                                  //     return;
                                  // });

                              } else {
                                  message.channel.send('Sorry, your balance is not enough to change nickname. Missing *B* :'+balanceReturn);
                              }
                          } else {
                              message.channel.send('Your balance is still 0*B* claim some with o-claim');
                          }
                      } else {
                          message.channel.send('Whops.. there might have been an error.');
                      }
                  });
              }
              catch (e){ console.log(e); }
          }
      } else {
          message.channel.send('no argument passed');
      }
  }

};