require("dotenv").config();
let qs = require('qs');
let corevars = require('./corevars');
const Discord = require('discord.js');
//let Parser = require('rss-parser');
//let parser = new Parser();
let string = '';
var parser = require('xml2js');
let https = require('https');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

module.exports = {
    gamesearch: function(message, args) {
        let title;
        let messageToSend;
        for (let i = 0; i !== args.length; i++) {
            string += args[i]+' ';
        }

        // let url = 'https://www.giantbomb.com';
        // let path = '/api/search/'+qs.stringify('?api_key='+process.env.GIANTBOMB+'&query='+string);
        //
        // let options = {
        //     host: url,
        //     path: path,
        //     "user-agent": "https://onepieceforum.net discord bot. For info contact comm.campione@gmail.com",
        //     method: 'GET',
        // };
        //
        // parser.on('error', function(err) { message.channel.send('Whops.. something must have gone wrong', err); });
        // let data = '';
        // https.request(options, function(res) {
        //     if (res.statusCode >= 200) {
        //         res.on('data', function(data_) { data += data_.toString(); });
        //         res.on('end', function() {
        //             console.log('data', data);
        //             let rawName = data.game.name.replace('<![CDATA[ ', '');
        //             let name = rawName.replace(' ]]>', '');
        //             if (name === string) {
        //                 messageToSend = name +' - '+ data.game.name;
        //             } else {
        //                 messageToSend = 'Please be more specific';
        //             }
        //
        //             message.channel.send(messageToSend);
        //
        //             parser.parseString(data, function(err, result) {
        //                 console.log('FINISHED', err, result);
        //             });
        //         });
        //     } else {
        //         console.log('error!! '+url+' '+res.statusCode+'\n'+res);
        //     }
        // });

        let url = 'https://www.giantbomb.com';
        let path = '/api/search/'+qs.stringify('?api_key='+process.env.GIANTBOMB+'&query='+string);
        let call = url+path;

        XMLHttpRequest.open("GET", call, true);
        XMLHttpRequest.onreadystatechange = function () {
            if (XMLHttpRequest.readyState === 4 && XMLHttpRequest.status >= 200)
            {
                var doc = XMLHttpRequest.responseXML;
                console.log(doc);
            }
        };
        XMLHttpRequest.send(null);
    }
};