// Description:
//   A simple hubot that queries the deckbrew service for specific cards.
//
// Commands:
//   hubot mtg find [search param1]=[search value1] ...
//   hubot mtg find [card name] - both commands query the service and return the exact match,
//                                if it exists, or names of other partially matched cards.
//
//   hubot mtg random - this command will query the service for a random card.
//
//   hubot mtg clash [@handler] - this command will query the service for two random cards and
//                                then compare their converted mana costs to see which is higher
//
// Author:
//   HerrPfister and wickerpopstar


var api = require('./utils/api'),
    MtgFind = require('./commands/mtg-find'),
    MtgClash = require('./commands/mtg-clash'),
    MtgRandom = require('./commands/mtg-random'),
    utils = require('./utils/utils'),
    UrlMap = require('../static/consts').urlMap,

    Q = require('q');

module.exports = function (robot) {
    robot.respond(/mtg\s+clash\s+(@\w+)/i, function(robo) {
        Q.all([api.getRandomMultiverseId(robot), api.getRandomMultiverseId(robot)])
            .done(function(multiverseIds) {
                Q.all([api.getRandomCard(robot, multiverseIds[0]), api.getRandomCard(robot, multiverseIds[1])])
                    .done(function(cards) {
                        var challenger = { name: robo.message.user.name, card: cards[0] };
                        var challenged = { name: robo.match[1], card: cards[1] };

                        MtgClash.resolveClash(robo, challenger, challenged);
                    });
            });
    });

    robot.respond(/mtg\s+random/i, function(robo) {
        api.getRandomMultiverseId(robot)
            .then(function(multiverseId){
                return api.getRandomCard(robot, multiverseId);
            })
            .done(function(card){
                MtgRandom.parseResponse(robo, card);
            });
    });

    robot.respond(/mtg\s+find\s+(.*)/i, function (robo) {
        var cardName = utils.getCardName(robo.match[1]),
            urlParams = utils.parseUrlParams(robo.match[1]);

        robot.http(UrlMap.deckBrewBase + urlParams)
            .header('Accept', 'application/json')
            .get()(function(err, res, body){
                if (err) {
                    MtgFind.parseServerError(robo, err);
                } else if (utils.hasErrorCode(res.statusCode)) {
                    MtgFind.parseCommandError(robo, err);
                } else {
                    MtgFind.parseResponse(robo, body, cardName);
                }
            });
    });
};
