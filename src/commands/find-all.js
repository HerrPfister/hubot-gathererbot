var mtg = require('mtgsdk');

var paramMap = {
    colors: 'colors',
    name: 'name',
    oracle: 'text',
    rarity: 'rarity',
    subTypes: 'subtypes',
    superTypes: 'supertypes',
    types: 'types'
};

function buildQuery(userInput) {
    var paramParts, param, mappedParam, value, query = {},
        words = userInput.split('&');

    for (var i = 0; i < words.length; i++) {
        paramParts = words[i].split('=');
        param = paramParts[0].trim();
        value = paramParts[1].trim();
        mappedParam = paramMap[param];

        if (!mappedParam) {
            return {
                error: param,
                validParams: Object.keys(paramMap).join(', ')
            };
        } else {
            query[mappedParam] = value;
        }
    }

    query.pageSize = 5;

    return query;
}

function buildCardListText(cards) {
    return cards.slice(0, 5).map(function (card) {
        return [card.name, card.manaCost, card.type].join(' | ');
    }).join('\n');
}

function findAllCards(query, robot) {
    mtg.card.where(query)
        .then(function (cards) {
            var emptyMessage = 'I\'m sorry we could not find a card with those params.';

            if (cards.length > 0) {
                robot.send(buildCardListText(cards));
            } else {
                robot.send(emptyMessage);
            }
        })
        .catch(function () {
            robot.send('Something went wrong getting cards with those parameters. Please try again later.');
        });
}

function validateQuery(robot) {
    var query = buildQuery(robot.match[1]);

    if (!query.error) {
        findAllCards(query, robot);
    } else {
        robot.send('Invalid query parameter: ' + query.error + '.');
        robot.send('Valid query parameters are ' + query.validParams + '.');
    }
}

module.exports = validateQuery;