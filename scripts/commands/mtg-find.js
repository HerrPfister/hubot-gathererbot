var consts = require('../../static/consts'),
    cardUtils = require('../utils/card'),

    _ = require('lodash'),

    CARD_LIMIT = 5;

function parseServerError(robo) {
    robo.send(consts.defaultError);
}

function parseCommandError(robo) {
    robo.send('Invalid parameters. Please make sure that parameters are separated by a comma.');
}

function getCardPoolSizeString(poolSize) {
    return 'Displaying ' + sampleSize + ' out of ' + poolSize + ' cards:';
}

function getCardNotFoundError(cardName) {
    return 'We could not find the card ' + cardName + '. Please try again.';
}

function createCardList(cards) {
    var cardSample = cards.slice(0, CARD_LIMIT),
        cardSampleNames = _.pluck(cardSample, 'name');

    return cardSampleNames.join('\n');
}

function createGathererUrl(urlParams) {
    var gathererBaseUrl = consts.urlMap.gathererAdvanced,
        gathererParams = cardUtils.parseGathererUrlParams(urlParams);

    return 'View in Gatherer: ' + gathererBaseUrl + gathererParams;
}

function hasCards(cards, cardName) {
    return cards.length && cardName;
}

function findCard(cards, cardName) {
    return _.find(cards, function (card) {
        return cardName.toLowerCase() === card.name.toLowerCase();
    });
}

function parseResponse(robo, body, cardName, urlParams) {
    var cardDetails,
        cards = JSON.parse(body);

    if (hasCards(cards, cardName)) {
        cardDetails = cardUtils.getCardDetails(findCard(cards, cardName));
        cardUtils.sendDetails(robo, cardDetails);

    } else if (cards.length > 0) {
        robo.send(
            getCardPoolSizeString(cards.length) + '\n' +
            createCardList(cards) + '\n' +
            createGathererUrl(urlParams)
        );

    } else {
        robo.send(getCardNotFoundError(cardName));
    }
}

module.exports = {
    parseResponse: parseResponse,
    parseCommandError: parseCommandError,
    parseServerError: parseServerError
};
