var mtg = require('mtgsdk');
var Scry = require('scryfall-sdk');

function randomCard(robot) {
    Scry.Cards.random()
        .then(function(result) {
            if(result.image_uris.normal) {
                robot.send(result.image_uris.normal);
            } else {
                console.error('Scryfall returned a card object, but no card image. Falling back to Gatherer...');
                gathererFallback(robot);
            }
        })
        .catch(function(error) {
            console.error('Falling back to Gatherer after receiving an error from Scryfall: ', error.message);
            gathererFallback(robot);
        });
}

function gathererFallback(robot) {
    mtg.card.where({random: true, pageSize: 1})
        .then(function (cards) {
            var emptyMessage = 'There was an error getting a random card. Please try again later.';

            if (cards.length > 0) {
                robot.send(cards[0].imageUrl);
            } else {
                robot.send(emptyMessage);
            }
        })
        .catch(function () {
            robot.send('Something went wrong getting a random card. Please try again later.');
        });
}

module.exports = randomCard;
