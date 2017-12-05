var Scry = require('scryfall-sdk');
var gatherer = require('./find');

function scryfallFindCard(robot) {
    var cardName = robot.match[1].trim().toLowerCase();

    Scry.Cards.byName(cardName, true)
        .then(function(result) {
            if(result.image_uris.normal) {
                robot.send(result.image_uris.normal);
            } else {
                handleError(robot, 'returned card object, but no image uri');
            }
        }).catch(function (error) {
        handleError(robot, error);
    });
}

function handleError(robot, error) {
    console.error('Falling back to Gatherer after receiving an error from Scryfall: ', error.message);
    gatherer(robot);
}

module.exports = scryfallFindCard;
