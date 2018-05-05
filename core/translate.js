const translate = require('google-translate-api');
let corevars = require('./corevars');

module.exports = {
    translateText: function(message, args) {
        let string;
        for (let i = 0; i !== args.length; i++) {
            string += args[i] + ' ';
        }
        string = string.replace('undefined', '').split('>');
        translate(string[1], {to: string[0]}).then(res => {
            console.log(res.text);
            //=> I speak English
            console.log();
            //=> nl
            let thumb = 'https://raw.githubusercontent.com/hjnilsson/country-flags/master/png1000px/'+res.from.language.iso+'.png';
            let embed = new Discord.RichEmbed()
                .setThumbnail(url=thumb)
                .addField(res.from.language.iso, string[1])
                .setColor(corevars.randomColor());
            message.channel.send({embed: embed});
        }).catch(err => {
            console.error(err);
        });
    }
};