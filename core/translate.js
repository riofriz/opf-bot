const translate = require('google-translate-api');
let corevars = require('./corevars');
const Discord = require('discord.js');

module.exports = {
    translateText: function(message, args) {
        if (args[0]) {
            let string;
            let translateText;
            for (let i = 0; i !== args.length; i++) {
                string += args[i] + ' ';
            }
            string = string.replace('undefined', '').split('>');
            try {
                if (typeof string[1] !== 'undefined') {
                    if (string[1].trim().match(/^[0-9]*$/) !== null) {
                        message.channel.fetchMessage(string[1])
                            .then(m => {
                                translateText = m.content;
                                translate(translateText.trim(), {to: string[0].trim()}).then(res => {
                                    let thumb = 'https://raw.githubusercontent.com/hjnilsson/country-flags/master/png1000px/' + res.from.language.iso.trim() + '.png';
                                    let embed = new Discord.RichEmbed()
                                        .setThumbnail(url = thumb)
                                        .addField(res.text, translateText.trim())
                                        .setColor(corevars.randomColor());
                                    message.channel.send({embed: embed});
                                }).catch(err => {
                                    console.error(err);
                                });
                            });
                    } else {
                        translateText = string[1].trim();
                        translate(translateText.trim(), {to: string[0].trim()}).then(res => {
                            let thumb = 'https://raw.githubusercontent.com/hjnilsson/country-flags/master/png1000px/' + res.from.language.iso.trim() + '.png';
                            let embed = new Discord.RichEmbed()
                                .setThumbnail(url = thumb)
                                .addField(res.text, string[1].trim())
                                .setColor(corevars.randomColor());
                            message.channel.send({embed: embed});
                        }).catch(err => {
                            console.error(err);
                        });
                    }
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            message.channel.send('Dunno what to translate :(');
        }
    }
};