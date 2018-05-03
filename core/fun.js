let corevars = require('./corevars');
const Discord = require('discord.js');

module.exports = {

    /**
     * @param message
     */
    messageOnQuote: function(message) {
        let textArray = [
            "Nami has the third highest IQ of everyone introduced to us before chapter 64.",
            "Robin's least favourite food is gum, because she can't swallow it. I've always loved this piece of information. It reflects how practical Robin is.",
            "Doflamingo's least favourite food is barbecue. The why is fun to deduce on your own.",
            "Sanji's nosebleeds appeared to become rather amusing to Nami post timeskip. She even laughed at one of them as the crew descended to Fishman Island. I'll find the link later. Edit: Found the link. It seems that Nami has really come to appreciate Sanji as a friend rather than a tool over the years, hence her concern for him in Zou and WCI.",
            "Sanji began smoking to prove himself to Zeff as an adult.",
            "Doflamingo got glasses under his glasses.",
            "Jango's beard is actually the trunk of a mushroom.",
            "Doffy and Viola had a most likely sexual relationship while she was in his crew.",
            "After Corazon's death Law met Shachi and Penguin in a nearby town who were bullying Bepo who set out to see to find his brother, after beating them up they all became friends and founded the Heart Pirates.",
            "The symbols on Kuro's jackets are poop.",
            "The Worst Generation has hilarious hobbys like bathing and interior design (Hawkins), cooking (Killer) and lovemaking and hiking (Urouge).",
            "If a human ate Chopper's devil fruit he would become an \"enlightened human\".",
            "Not about One Piece itself but pretty funny imo: Oda forces his editor to sleep with his phone in his hands so Oda can call him 24 a day.",
            "You should really read some SBS, the question and answer corner of the volumes.",
            "Jinbe was the first warlord to be mention in the series."
        ];

        let randomNumber = Math.floor(Math.random()*textArray.length);

        let embed = new Discord.RichEmbed()
            .setThumbnail(url='http://i.imgur.com/0m6gCqy.jpg')
            .addField("Fun Fact Moment!", textArray[randomNumber])
            .setColor(corevars.randomColor())
            .setFooter("Your lovable opfbot.");
        message.channel.send({embed: embed});
    },

    /**
     * @param message
     * @param args
     */
    love: function(message, args) {
        if (args[0]) {
            message.channel.send(':wedding: '+message.author+" loves "+args[0]+" :wedding:");
        } else {
            message.channel.send(':wedding: '+message.author+" i guess you love everybody.. :wedding:");
            message.channel.fetchMessage(message.id)
                .then(m => {
                    m.delete();
                });
        }
    },

    /**
     * @param message
     */
    nsfw: function(message) {
        if (message.channel.name === 'nsfw') {
            message.channel.send(':drum: And the latest pervert is.. '+message.author);
            message.channel.fetchMessage(message.id)
                .then(m => {
                    m.delete();
                });
        } else {
            message.channel.send('na na.. not allowed <:pfft:393455142239862795>');
        }
    },

    /**
     * @param message
     */
    evilLaugh: function(message) {
        message.channel.send('Evil Laugh!!!!111!!!!');
        message.channel.fetchMessage(message.id)
            .then(m => {
                m.delete();
            });
    },

    /**
     * @param str
     * @returns {*}
     */
    commandsWithNoCommands: function(str) {
        let substrings = [
            "symphogear",
            "y'all"
        ];
        for (let i = 0; i !== substrings.length; i++) {
            let string = str.split(' ');
            for (let j = 0; j !== string.length; j++) {
                if (string[j] === substrings[i]) {
                    return string[j];
                }
            }
        }
        return null;
    }
};
