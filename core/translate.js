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
            console.log(res.from.language.iso);
            //=> nl
        }).catch(err => {
            console.error(err);
        });
    }
};