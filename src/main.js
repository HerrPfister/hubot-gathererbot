// Description:
//   A simple hubot that uses the mtg-sdk to query for specific cards.
//
// Commands:
//   hubot mtg query [search param1]=[search value1],[search value2]|[search value3] & [search param2]= ...
//   hubot mtg find [card name]
//   hubot mtg random
//   hubot mtg clash [@handler]
//   hubot mtg term [term]
//
// Author:
//   HerrPfister

var clash = require('./commands/clash'),
    findCard = require('./commands/find'),
    queryCards = require('./commands/query'),
    randomCard = require('./commands/random'),
    scry = require('./commands/scryfall_find'),
    term = require('./commands/term');

module.exports = function (robot) {
    robot.respond(/mtg\s+clash\s+(.*)/i, clash);
    robot.respond(/mtg\s+query\s+(.*)/i, queryCards);
    robot.respond(/mtg\s+find\s+(.*)/i, findCard);
    robot.respond(/mtg\s+term\s+(.*)/i, term);
    robot.respond(/mtg\s+random/i, randomCard);
    robot.hear(/[[(.*)]]/i, scry);
};
