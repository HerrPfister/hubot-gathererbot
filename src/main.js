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


var apiUtils = require('./utils/api'),
    cardUtils = require('./utils/card'),
    urlUtils = require('./utils/url'),

    mtgFind = require('./commands/mtg-find'),
    mtgClash = require('./commands/mtg-clash'),
    mtgRandom = require('./commands/mtg-random'),

    urlMap = require('../static/consts').urlMap,

    Q = require('q');

function clash(robot, chat) {
    var randomMultiverseIds = [
        apiUtils.getRandomMultiverseId(robot),
        apiUtils.getRandomMultiverseId(robot)
    ];

    Q.all(randomMultiverseIds)
        .done(function (multiverseIds) {
            var randomCards = [
                apiUtils.getRandomCard(robot, multiverseIds[0]),
                apiUtils.getRandomCard(robot, multiverseIds[1])
            ];

            Q.all(randomCards)
            .done(function (cards) {
                var challenger = {
                    name: chat.message.user.name,
                    card: cards[0]
                },
                challenged = {
                    name: chat.match[1],
                    card: cards[1]
                };

                mtgClash.resolveClash(chat, challenger, challenged);
            });
        });
}

function findCard(robot, chat) {
    var cardName = cardUtils.getCardName(chat.match[1]),
        urlParams = urlUtils.convertUserInputToUrlParams(chat.match[1]);

    robot.http(urlMap.deckBrewPrefix + urlParams)
        .header('Accept', 'application/json')
        .get()(function (err, res, body) {
            if (err) {
                chat.send(consts.defaultError);

            } else if (apiUtils.hasErrorCode(res.statusCode)) {
                mtgFind.parseCommandError(chat, err);

            } else {
                mtgFind.parseResponse(chat, body, cardName, urlParams);
            }
        });
}

function randomCard(robot, chat) {
    apiUtils.getRandomMultiverseId(robot)
        .then(function (multiverseId) {
            return apiUtils.getRandomCard(robot, multiverseId);
        })
        .done(function (card) {
            mtgRandom.parseResponse(chat, card);
        });
}

module.exports = function (robot) {
    robot.respond(/mtg\s+clash\s+(.*)/i, clash.bind(this, robot));
    robot.respond(/mtg\s+find\s+(.*)/i, findCard.bind(this, robot));
    robot.respond(/mtg\s+random/i, randomCard.bind(this, robot));
};
