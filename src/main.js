// Description:
//   A simple hubot that uses the mtg-sdk to query for specific cards.
//
// Commands:
//   hubot mtg query [search param1]=[search value1],[search value2]|[search value3] & [search param2]= ...
//         - This command will return up to 5 cards with the given params.
//           NOTE: separate value lists with a "|" to make an OR clause
//                 and a "," for an AND clause. Separate params with a "&"
//
//   hubot mtg find [card name]
//         - Returns the card with a name that exactly matches the passed in name, if it exists.
//
//   hubot mtg random
//         - This command return a random card.
//
//   hubot mtg clash [@handler]
//         - This command will get two random cards and then compare their converted mana costs to see which is higher.
//
// Author:
//   HerrPfister

var clash = require('./commands/clash'),
    findCard = require('./commands/find'),
    queryCards = require('./commands/query'),
    randomCard = require('./commands/random');

module.exports = function (robot) {
    robot.respond(/mtg\s+clash\s+(.*)/i, clash);
    robot.respond(/mtg\s+query\s+(.*)/i, queryCards);
    robot.respond(/mtg\s+find\s+(.*)/i, findCard);
    robot.respond(/mtg\s+random/i, randomCard);
};
