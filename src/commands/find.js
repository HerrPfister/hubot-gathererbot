var mtg = require('mtgsdk');

function findCard(robot) {
    var name = robot.match[1].trim().toLowerCase();

    mtg.card.where({ name: name })
        .then(function (cards) {
            var emptyMessage = 'I\'m sorry we could not find a card with the name ' + name + '.';

            if (cards.length > 0 && cards[0].name.toLowerCase() === name) {
                robot.send(cards[0].imageUrl);
            } else {
                robot.send(emptyMessage);
            }
        })
        .catch(function () {
            robot.send('Something went wrong finding ' + name + '. Please try again later.');
        });
}

module.exports = findCard;