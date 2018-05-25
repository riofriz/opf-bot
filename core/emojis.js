let corevars = require('./corevars');
const Discord = require('discord.js');
let https = require('https');
let qs = require('qs');
let request = require('request');
let mongojs = require('mongojs');
let db = mongojs('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds143362.mlab.com:43362/opmegabot', ['Emojis']);

module.exports = {

    customEmojis: function (str, message) {
        let customEmojis = [
            'pAngel', 'pAww', 'pBlank', 'pBlind', 'pNoMore', 'pKewl', 'pDuck', 'pDSip', 'pPresent', 'pHappy',
            'pCash', 'pMurican', 'pEvil', 'pDerp', 'pDab', 'pNuu', 'pCrayon', 'pAhh', 'pAhhh', 'pWhine',
            'pWhut', 'pWoah', 'pSci', 'pDawg', 'pScared', 'pSip', 'pCookie', 'pSleepy', 'pHmm', 'pVampire', 'pepeRope',
            'pepeKMS', 'pepeCry', 'pepeAnimu', 'pepeTriggered', 'bikki', 'pWdiepie', 'megarot', 'gtfo', 'gtfo1',
            'asd', 'pBooli', 'bunbun', 'dead', 'thinkk', 'benice', 'pCop', 'doffy', 'pepeOh', 'pepeSad', 'pepeWhy',
            'pepeSmirk', 'tearsofjoy', 'fingerheart', 'blob'
        ];
        let result;
        let extension;
        for (let i = 0; i !== customEmojis.length; i++) {
            if (str.includes(':' + customEmojis[i] + ':')) {
                result = customEmojis[i];
            }
        }
        if (result === 'pWdiepie' || result === 'megarot' || result === 'asd' || result === 'blob') {
            extension = '.gif';
        } else {
            extension = '.png';
        }
        if (str.includes(':' + result + ':') && str.includes('``:' + result + ':``') === false) {
            message.channel.send({file: __dirname + '/customemoji/' + result + extension});
            if (message.author.id !== '441203112460681216') {
                message.channel.fetchMessage(message.id)
                    .then(m => {
                        m.delete();
                    });
            }
        }
    },

    fillMongo: function (message) {
        let customEmojis = [
            'pAngel', 'pAww', 'pBlank', 'pBlind', 'pNoMore', 'pKewl', 'pDuck', 'pDSip', 'pPresent', 'pHappy',
            'pCash', 'pMurican', 'pEvil', 'pDerp', 'pDab', 'pNuu', 'pCrayon', 'pAhh', 'pAhhh', 'pWhine',
            'pWhut', 'pWoah', 'pSci', 'pDawg', 'pScared', 'pSip', 'pCookie', 'pSleepy', 'pHmm', 'pVampire', 'pepeRope',
            'pepeKMS', 'pepeCry', 'pepeAnimu', 'pepeTriggered', 'bikki', 'pWdiepie', 'megarot', 'gtfo', 'gtfo1',
            'asd', 'pBooli', 'bunbun', 'dead', 'thinkk', 'benice', 'pCop', 'doffy', 'pepeOh', 'pepeSad', 'pepeWhy',
            'pepeSmirk', 'tearsofjoy', 'fingerheart', 'blob'
        ];
        for (let i = 0; i !== customEmojis.length; i++) {
            try {
                db.Emojis.findOne({ "name" : customEmojis[i] }, function(err, doc) {
                    if(doc) {
                        message.channel.send('Emoji '+customEmojis[i]+' already exists');
                    } else {
                        db.Users.insert( { "name":customEmojis[i], "file":customEmojis[i]+".png", "uploadedBy":message.author.id } );
                        message.channel.send('Emoji '+customEmojis[i]+' added!');
                    }
                });
            } catch (e){ console.log('error: '+ e); }
        }
    },

    corefunctionalityWorks: function(message) {
        let id = message.author.id;
        let filter = m => id === m.author.id;

        message.channel.awaitMessages(filter, {
            max: 1,
            time: 5000,
            errors: ['time']
        })
            .then(collected => {
                message.channel.send('here\'s your collection');
                console.log(collected);
                console.log('AND THEN THIS \n\n\n\n');

                collected.forEach(function(convertedArray, key) {
                    message.channel.send(convertedArray.content);
                });
            })
            // .catch is called on error - time up is considered an error (says so in docs)
            .catch(collected => {
                message.channel.send('Whops.. timed out.');
            });
    },

    emojiHelp: function(message) {
        let customEmojis = [
            'pAngel', 'pAww', 'pBlank', 'pBlind', 'pNoMore', 'pKewl', 'pDuck', 'pDSip', 'pPresent', 'pHappy',
            'pCash', 'pMurican', 'pEvil', 'pDerp', 'pDab', 'pNuu', 'pCrayon', 'pAhh', 'pAhhh', 'pWhine',
            'pWhut', 'pWoah', 'pSci', 'pDawg', 'pScared', 'pSip', 'pCookie', 'pSleepy', 'pHmm', 'pVampire', 'pepeRope',
            'pepeKMS', 'pepeCry', 'pepeAnimu', 'pepeTriggered', 'bikki', 'pWdiepie', 'megarot', 'gtfo', 'gtfo', 'asd',
            'pBooli', 'bunbun', 'dead', 'thinkk', 'benice', 'pCop', 'doffy', 'pepeOh', 'pepeSad', 'pepeWhy',
            'pepeSmirk', 'tearsofjoy', 'fingerheart', 'blob'
        ];

        let string = [
            '``:pAngel:``', '``:pAww:``', '``:pBlank:``', '``:pBlind:``', '``:pNoMore:``', '``:pKewl:``', '``:pDuck:``', '``:pDSip:``', '``:pPresent:``', '``:pHappy:``',
            '``:pCash:``', '``:pMurican:``', '``:pEvil:``', '``:pDerp:``', '``:pDab:``', '``:pNuu:``', '``:pCrayon:``', '``:pAhh:``', '``:pAhhh:``', '``:pWhine:``',
            '``:pWhut:``', '``:pWoah:``', '``:pSci:``', '``:pDawg:``', '``:pScared:``', '``:pSip:``', '``:pCookie:``', '``:pSleepy:``', '``:pHmm:``', '``:pVampire:``', '``:pepeRope:``',
            '``:pepeKMS:``', '``:pepeCry:``', '``:pepeAnimu:``', '``:pepeTriggered:``', '``:bikki:``', '``:pWdiepie:``', '``:megarot:``', '``:gtfo:``', '``:gtfo1:``', '``:asd:``',
            '``:pBooli:``', '``:bunbun:``', '``:dead:``', '``:thinkk:``', '``:benice:``', '``:pCop:``', '``:doffy:``', '``:pepeOh:``', '``:pepeSad:``', '``:pepeWhy:``',
            '``:pepeSmirk:``', '``:tearsofjoy:``', '``:fingerheart:``', '``:blob:``'
        ];

        let extension;
        let finalString = '';
        let counter = 1;

        for (let i = 0; i !== customEmojis.length; i++) {
            finalString += string[i]+' ';
            if (i %4 === 0 && i !== 0) {
                finalString += '\n';
            } else {
                if (counter !== customEmojis.length) {finalString += '- ';}
            }
        }
        message.channel.send(finalString);
    },

};