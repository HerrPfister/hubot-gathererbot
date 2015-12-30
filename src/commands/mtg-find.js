var consts = require('../../static/consts'),
    cardUtils = require('../utils/card'),
    urlUtils = require('../utils/url'),

    _ = require('lodash'),

    CARD_LIMIT = 5;

function parseCommandError(robo) {
    robo.send(consts.findInvalidParamError);
}

function getCardPoolSizeString(poolSize) {
    return 'Displaying ' + CARD_LIMIT + ' out of ' + poolSize + ' cards:';
}

function createCardList(cards) {
    var cardSample = cards.slice(0, CARD_LIMIT),
        cardSampleNames = _.pluck(cardSample, 'name');

    return cardSampleNames.join('\n');
}

function createGathererUrl(urlParams) {
    var gathererBaseUrl = consts.urlMap.gathererAdvanced,
        gathererParams = urlUtils.convertUrlParamsToGathererParams(urlParams);

    return 'View in Gatherer: ' + gathererBaseUrl + gathererParams;
}

function findCard(cards, cardName) {
    return _.find(cards, function (card) {
        return cardName.toLowerCase() === card.name.toLowerCase();
    });
}

function parseResponse(robo, body, cardName, urlParams) {
    var cardDetails,
        cards = JSON.parse(body);

    if (!cards.length) {
        robo.send(consts.findError);

    } else if (cardName) {
        cardDetails = cardUtils.getCardDetails(findCard(cards, cardName));
        cardUtils.sendDetails(robo, cardDetails);

    } else {
        robo.send(
            getCardPoolSizeString(cards.length) + '\n' +
            createCardList(cards) + '\n' +
            createGathererUrl(urlParams)
        );
    }
}

module.exports = {
    parseCommandError: parseCommandError,
    parseResponse: parseResponse
};
