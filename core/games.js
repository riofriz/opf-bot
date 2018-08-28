const Discord = require('discord.js');
const Trivia = require('trivia-api');
const trivia = new Trivia();

module.exports = {

    popquiz: function(message, args) {
        if (args[0]) {
            let interval;
            if (args[0].trim() === 'on') {
                interval = setInterval(function () {
                    // use the message's channel (TextChannel) to send a new message
                    let options = {
                        amount: 1
                    };
                    trivia.getQuestions(options)
                        .then(questions => {
                            console.log(questions['results']);
                            console.log(questions['results'][0]['incorrect_answers']);

                            let type = questions['results'][0]['type'];
                            let correct = questions['results'][0]['correct_answer'];
                            let incorrect = questions['results'][0]['incorrect_answers'];
                            let question = decodeURIComponent(questions['results'][0]['question']);
                            let difficulty = questions['results'][0]['difficulty'];
                            let answers = [correct];
                            let berry;

                            for (let inc = 0; inc <= incorrect.length; inc++) {
                                answers.push(incorrect[inc]);
                            }
                            let answersString = '';

                            for (let i = answers.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                [answers[i], answers[j]] = [answers[j], answers[i]]; // eslint-disable-line no-param-reassign
                            }

                            for (let i = 0; i <= answers.length; i++) {
                                if (typeof(answers[i]) !== 'undefined') {
                                    answersString += answers[i] + ' \n';
                                }
                            }
                            answersString = answersString.replace('undefined '+/\n/g, "");
                            if (difficulty === 'easy') { berry = 150; } else if (difficulty === 'medium') { berry = 300; } else if (difficulty === 'hard') { berry = 450; }

                            if (type === 'boolean') {
                                message.channel.send('Ok! '+difficulty+' question:\n----------\n**'+question+'** ```True \nFalse \n```----------');
                            } else {
                                message.channel.send('Ok! '+difficulty+' question:\n----------\n**'+question+'** ```'+answersString+'```----------');
                            }


                            message.channel.awaitMessages(filter, {
                                max: 200,
                                time: 50000,
                                errors: ['time']
                            })
                                .then(collected => {
                                })
                                // .catch is called on error - time up is considered an error (says so in docs)
                                .catch(collected => {
                                    if (collected.size > 0) {
                                        let finalArray = [];
                                        let result = '';
                                        let counter = 0;
                                        function countInArray(array, what) {
                                            var count = 0;
                                            for (var i = 0; i < array.length; i++) {
                                                if (array[i] === what) {
                                                    count++;
                                                }
                                            }
                                            return count;
                                        }
                                        collected.forEach(function (convertedArray, key) {
                                            finalArray.push(argsArray[parseInt(convertedArray.content)]);
                                            if (counter+1 === collected.size) {
                                                for (let i = 0; i !== argsArray.length; i++) {
                                                    result += '**'+argsArray[i] + '** received **' + countInArray(finalArray, argsArray[i]) + '** votes!\n';
                                                }
                                                message.channel.send('There were '+collected.size+' entries! \n\n'+result);
                                            }
                                            counter++;
                                        });
                                    }
                                });


                        })
                        .catch(console.error);

                    message.channel.send("popquiztest")
                        .catch(console.error); // add error handling here
                }, 5000);
            } else if (args[0].trim() === 'off') {
                return clearInterval(interval);
            }
        }
    }

};