// Description:
//   A simple hubot that queries the deckbrew service for specific cards.
//
// Commands:
//   hubot gatherer find [search param1]=[search value1] ...
//   hubot gatherer find [card name] - bot commands query the card service and return the exact match
//                                     if it exists, or names of other partially matched cards.
//
//   hubot gatherer random - this command will query the service for a random card.
//
//   hubot gatherer clash [@handler] - this command will query the service for two random cards and
//                                     then compare the converted mana costs to see which has a
//                                     higher cost.
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   HerrPfister and wickerpopstar

var UrlMap = require('../static/consts').urlMap;

var utils = require('./utils/utils');
var GathererFind = require('./commands/gFind');
var GathererClash = require('./commands/gClash');
var GathererRandom = require('./commands/gRandom');

module.exports = function (robot) {
  robot.respond(/gatherer\s+clash\s+(@\w+)/i, function(robo) {
    var challenger = {
      name: robo.message.user.name,
      card: {
        cmc: utils.getRandomMultiverseId()
      }
    };

    var challenged = {
      name: robo.match[1],
      card: {
        cmc: utils.getRandomMultiverseId()
      }
    };

    GathererClash.resolveClash(robo, challenger, challenged);
  });

  robot.respond(/gatherer\s+random/i, function(robo){
    var randomMultiverseId = utils.getRandomMultiverseId();

    robot.http(UrlMap.multiverseid + randomMultiverseId)
      .header('Accept', 'application/json')
      .get()(function(err, res, body){
        if (err) {
          GathererRandom.parseError(robo, err);
        } else {
          GathererRandom.parseResponse(robo, body);
        }
      });
  });

  robot.respond(/gatherer\s+find\s+(.*)/i, function (robo) {

    // Grab the captured user's input and parse for search params
    var cardName = utils.getCardName(robo.match[1]);
    var urlParams = utils.parseInput(robo.match[1]);

    robot.http(UrlMap.gathererFind + urlParams)
      .header('Accept', 'application/json')
      .get()(function(err, res, body){
        if (!cardName) {
          GathererFind.parseCommandError(robo, err);
        } else if (err) {
          GathererFind.parseError(robo, err);
        } else {
          GathererFind.parseResponse(robo, body, cardName);
        }
      });
  });
};
