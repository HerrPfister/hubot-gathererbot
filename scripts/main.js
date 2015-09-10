// Description:
//   A simple hubot that queries the deckbrew service for specific cards.
//
// Commands:
//   hubot gatherer find [search param1]=[search value1] ...
//   hubot gatherer find [card name] - both commands query the service and return the exact match,
//                                     if it exists, or names of other partially matched cards.
//
//   hubot gatherer random - this command will query the service for a random card.
//
//   hubot gatherer clash [@handler] - this command will query the service for two random cards and
//                                     then compare their converted mana costs to see which is higher
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   HerrPfister and wickerpopstar

var Q = require('q');

var UrlMap = require('../static/consts').urlMap;

var utils = require('./utils/utils');
var GathererFind = require('./commands/gFind');
var GathererClash = require('./commands/gClash');
var GathererRandom = require('./commands/gRandom');

module.exports = function (robot) {
  robot.respond(/gatherer\s+clash\s+(@\w+)/i, function(robo) {
    Q.all([utils.getRandomMultiverseId(robot), utils.getRandomMultiverseId(robot)])
      .done(function(multiverseIds) {
        Q.all([utils.getRandomCard(robot), utils.getRandomCard(robot, multiverseIds[1])])
          .done(function(cards) {
            var challenger = { name: robo.message.user.name, card: cards[0] };
            var challenged = { name: robo.match[1], card: cards[1] };

            GathererClash.resolveClash(robo, challenger, challenged);
          });
      });
  });

  robot.respond(/gatherer\s+random/i, function(robo) {
    utils.getRandomMultiverseId(robot)
      .then(function(multiverseId){
        return utils.getRandomCard(robot, multiverseId);
      })
      .done(function(card){
        GathererRandom.parseResponse(robo, card);
      });
  });

  robot.respond(/gatherer\s+find\s+(.*)/i, function (robo) {

    // Grab the captured user's input and parse for search params
    var cardName = utils.getCardName(robo.match[1]);
    var urlParams = utils.parseUrlParams(robo.match[1]);

    robot.http(UrlMap.deckBrewBase + urlParams)
      .header('Accept', 'application/json')
      .get()(function(err, res, body){
        if (err) {
          GathererFind.parseServerError(robo, err);
        } else if (utils.hasErrorCode(res.statusCode)) {
          GathererFind.parseCommandError(robo, err);
        } else {
          GathererFind.parseResponse(robo, body, cardName);
        }
      });
  });
};
