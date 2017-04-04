var _ = require('lodash');
var mtg = require('mtgsdk');

function findCard(robot) {
    var name = robot.match[1].trim().toLowerCase();

    mtg.card.where({name: name})
        .then(function (cards) {
            var emptyMessage = 'I\'m sorry we could not find a card with the name ' + name + '.',
                card = _.find(cards, function (c) {
                    return c.imageUrl && c.name.toLowerCase() === name.toLowerCase()
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
