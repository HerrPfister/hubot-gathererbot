var async = require('async');
var mtg = require('mtgsdk');

var CLASH_DRAW = 'It\'s a draw!';
var VALID_TYPES = ['instant', 'sorcery', 'creature', 'artifact', 'land', 'enchantment', 'planeswalker'].join('|');

function getClashWinnerString(winnerName) {
    return 'Clash resolved! ' + winnerName + ' is the winner!';
}

function getClashCardDrawString(name, card) {
    return name + ' drew ' + card.name + ', which has a converted mana cost of ' + card.cmc + '.';
}

function getClashDefaultString(player, opponent) {
    return player + ' challenges ' + opponent + ' to a mtg clash!';
}

function getRandomCard(next) {
    return mtg.card.where({random: true, pageSize: 1, types: VALID_TYPES})
        .then(function (cards) {
            next(null, cards)
        })
        .catch(function () {
            next(true);
        });
}

function handleSuccess(robot, response) {
    var opponentsCard = response.opponent[0],
        playersCard = response.player[0],
        playerName = robot.message.user.name,
        opponentName = robot.match[1],
        playerCMC = playersCard.cmc || 0,
        opponentCMC = opponentsCard.cmc || 0,
        messages = [
            getClashDefaultString(playerName, opponentName),
            getClashCardDrawString(playerName, playersCard),
            getClashCardDrawString(opponentName, opponentsCard)
        ];

    if (playerCMC > opponentCMC) {
        messages.push(getClashWinnerString(playerName));
    } else if (playerCMC < opponentCMC) {
        messages.push(getClashWinnerString(opponentName));
    } else {
        messages.push(CLASH_DRAW);
    }

    robot.send(messages.join('\n'));
}


function resolveClash(robot) {
    async.parallel({
        player: getRandomCard,
        opponent: getRandomCard
    }, function (err, response) {
        if (!err) {
            handleSuccess(robot, response);
        } else {
            robot.send('Something went wrong while clashing. Please try again later.');
        }
    });
}

module.exports = resolveClash;
