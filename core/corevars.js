module.exports = {
    /**
     * @param value
     * @returns {boolean}
     */
    isAvailable: function (value) {
        const commandsArray = [
            'hello',
            'help',
            '',
            'latest',
            'love',
            'username',
            'whois',
            'nsfw',
            "muhahaha",
            "who's boss",
            "garchu",
            "sgame",
            "q",
            "t",
            "spoiler",
            "spoilalert",
            "pokemon",
            "meme",
            "yomama",
            "howlong",
            "movie",
            "series",
            "whops",
            "grin",
            "poets",
            "rank",
            "claim",
            "balance",
            "nick",
            "oprank",
            "boobslap",
            "rhyme",
            "niichan",
            "prank",
            "loot",
            "mobfight",
            "lelolelo",
            "jacky",
            "neechan"
        ];
        if (commandsArray.indexOf(value) === -1) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * @returns {string}
     */
    randomHello: function() {
        const textArray = [
            "‘Ello, mate.",
            "Heeey, baaaaaby.",
            "Hi, honeybunch!",
            "Oh, yohohohohohohohohohohoho!",
            "How you doin'?",
            "I like your face.",
            "What's cookin', good lookin'? <:smugbird:432840473439109130> ",
            "Howdy, miss.",
            "Why, hello there!",
            "Hey, boo."
        ];

        let randomNumber = Math.floor(Math.random()*textArray.length);
        return textArray[randomNumber];
    },

    /**
     * @returns {string}
     */
    randomColor: function() {
        const colorArray = [
            '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
            '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'
        ];
        let randomColor = Math.floor(Math.random() * colorArray.length);
        return colorArray[randomColor];
    },

    /**
     * @param message
     */
    credits: function(message) {
        message.channel.send('<@408255473821679617> made me, he\'s boss!');
        message.channel.fetchMessage(message.id)
            .then(m => {
                m.delete();
            });
    },

    /**
     * @param section
     * @returns {string}
     */
    buildRss: function(section) {
        let url = 'https://opforum.net/'+section+'/index.rss';
        return url;
    },

    /**
     * @param sourceArray
     * @param neededElements
     * @returns {string}
     */
    getMeRandomElements: function(sourceArray, neededElements) {
        let result;
        for (let i = 0; i < neededElements; i++) {
            if (i !== neededElements-1) {
                result += sourceArray[Math.floor(Math.random()*sourceArray.length)]+', ';
            } else {
                result += sourceArray[Math.floor(Math.random()*sourceArray.length)];
            }
        }
        return result;
    }



};