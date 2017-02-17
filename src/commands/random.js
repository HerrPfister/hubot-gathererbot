var mtg = require('mtgsdk');
var gatherer = require('../utils/gatherer');

function randomCard(robot) {
    mtg.card.where({ random: true, pageSize: 1 })
        .then(function (cards) {
            var emptyMessage = 'There was an error getting a random card. Please try again later.';

            if (cards.length > 0) {
                robot.send(cards[0].imageUrl);
                robot.send(gatherer.buildMultiverseIdQuery(cards[0].multiverseid))
            } else {
                robot.send(emptyMessage);
            }
        })
        .catch(function () {
            robot.send('Something went wrong getting a random card. Please try again later.');
        });
}

module.exports = randomCard;