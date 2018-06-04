const Discord = require('discord.js');

module.exports = {

    popquiz: function(message, args) {
        if (args[0]) {
            let interval;
            if (args[0].trim() === 'on') {
                let t = ()=>
                    setInterval(()=>{
                        message.channel.send("popquiztest")
                    },5000);
            } else if (args[0].trim() === 'off') {
                interval = t();
                clearInterval(interval);
            }
        }
    }

};