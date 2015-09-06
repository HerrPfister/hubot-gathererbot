// Description:
//   A simple hubot that queries the deckbrew service for specific cards.
//
// Commands:
//   hubot gatherer [card name] - queries the card service and returns the exact match
//                                if it exists, or names of full search results.
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   HerrPfister and wickerpopstar

var UrlMap = require('../consts/consts').urlMap;

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

    var opponent = {
      name: robo.match[1],
      card: {
        cmc: utils.getRandomMultiverseId()
      }
    };

    GathererClash.resolveClash(robo, challenger, opponent);
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

  // NOTE: As of right now, we are just capturing everything after the find
  //       command. However, later we can make it more customizable if we want.
  //       i.e. getting subtypes, color, rarity, etc.
  robot.respond(/gatherer\s+find\s+(.*)/i, function (robo) {

    // Grab the captured user's input
    var cardName = robo.match[1];

    robot.http(UrlMap.cardName + cardName)
      .header('Accept', 'application/json')
      .get()(function(err, res, body){
        if (err) {
          GathererFind.parseError(robo, err);
        } else {
          GathererFind.parseResponse(robo, body);
        }
      });
  });
};
