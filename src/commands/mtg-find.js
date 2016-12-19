var consts = require('../../static/consts'),
    cardUtils = require('../utils/card'),
    urlUtils = require('../utils/url'),

    _ = require('lodash'),

    CARD_LIMIT = 5;

function parseCommandError(robo) {
    robo.send(consts.findInvalidParamError);
}

function getCardPoolSizeString(poolSize) {
    var limit = poolSize < 5 ? poolSize : CARD_LIMIT;

    return 'Displaying ' + limit + ' out of ' + poolSize + ' cards:';
}

function buildTypesSubstring(details) {
    var supertypes = details.supertypes ? details.supertypes.join(' ') + ' ' : '',
        types = details.types ? details.types.join(' ') : '',
        subtypes = details.subtypes ? ' - ' + details.subtypes.join(' ') : '';

    return supertypes + types + subtypes;
}

function buildSampleName(card) {
    var details = cardUtils.getCardDetails(card),
        colors = details.colors.join(' '),
        name = details.name;

    return name + ' | ' + colors + ' | ' + buildTypesSubstring(details);
}

function createCardList(cards) {
    var cardSample = cards.slice(0, CARD_LIMIT),
        cardSampleNames = _.map(cardSample, buildSampleName);

    return cardSampleNames.join('\n');
}

function createGathererUrl(urlParams) {
    var gathererBaseUrl = consts.urlMap.gathererAdvanced,
        gathererParams = urlUtils.convertUrlParamsToGathererParams(urlParams);

    return 'View in Gatherer: ' + gathererBaseUrl + gathererParams;
}

function findCard(cards, cardName) {
    return !cardName ? undefined : _.find(cards, function (card) {
        return cardName.toLowerCase() === card.name.toLowerCase();
    });
}

function parseResponse(robo, body, cardName, urlParams) {
    var cardDetails,
        cards = JSON.parse(body),
        card = findCard(cards, cardName);

    if (!cards.length) {
        robo.send(consts.findError);

    } else if (card) {
        cardDetails = cardUtils.getCardDetails(card);
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
