var _ = require('lodash');
var mtg = require('mtgsdk');
var Scry = require('scryfall-sdk');

function findCard(robot) {
    var cardName = robot.match[1].trim().toLowerCase();

    Scry.Cards.byName(cardName, true)
        .then(function(result) {
            if(result.image_uris.normal) {
                robot.send(result.image_uris.normal);
            } else {
                console.error('Scryfall returned a card object, but no card image. Falling back to Gatherer...');
            }
        }).catch(function (error) {
        console.error('Falling back to Gatherer after receiving an error from Scryfall: ', error.message);
        gathererFallback(robot);
    });
}

function gathererFallback(robot) {
    var cardName = robot.match[1].trim().toLowerCase();

    mtg.card.where({name: cardName})
        .then(function (cards) {
            var emptyMessage = 'I\'m sorry we could not find a card with the name ' + name + '.',
                card = _.find(cards, function (c) {
                    return c.imageUrl && c.name.toLowerCase() === name.toLowerCase();
                });

            if (card) {
                robot.send(card.imageUrl);
            } else {
                robot.send(emptyMessage);
            }
        })
        .catch(function () {
            robot.send('Something went wrong finding ' + name + '. Please try again later.');
        });
}

module.exports = findCard;
