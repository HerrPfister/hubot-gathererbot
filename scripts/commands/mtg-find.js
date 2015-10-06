var consts = require('../../static/consts'),
    utils = require('../utils/utils'),

    find = require('lodash/collection/find'),
    isEmpty = require('lodash/lang/isEmpty'),
    pluck = require('lodash/collection/pluck'),

    CARD_LIMIT = 5,
    FIND_CMD_ERROR = 'Invalid parameters. Please make sure that parameters are separated by a comma.';

function getCardPoolSizeString(sampleSize, poolSize) {
    return 'Displaying ' + sampleSize + ' out of ' + poolSize + ' cards:';
}

function getCardNotFoundError(cardName) {
    return 'We could not find the card ' + cardName + '. Please try again.';
}

module.exports = {
    parseResponse: function(robo, body, cardName, urlParams) {
        var cardDetails,
            gathererBaseUrl,
            gathererParams,
            gathererUrl,
            cardPoolSize,
            cardSample,
            cardSampleNames,
            cardSampleText,
            cards = JSON.parse(body),
            card = (isEmpty(cards) || !cardName) ? undefined : find(cards, function(card){
                return cardName.toLowerCase() === card.name.toLowerCase();
            });

        // If find() comes back with a match that means it found the exact card the user was
        // looking for. Otherwise, that means the service has found more than one match.
        if (card) {
            cardDetails = utils.getCardDetails(card);
            utils.sendDetails(robo, cardDetails);

        } else if (cards.length > 0) {
            // Grab the first X amount of cards, which is determined from the constant cardLimit.
            // Then print off the name of each card.
            cardSample = cards.slice(0, CARD_LIMIT);
            cardSampleNames = pluck(cardSample, 'name');
            cardSampleText = cardSampleNames.join('\n');
            cardPoolSize = getCardPoolSizeString(cardSample.length, cards.length);

            gathererBaseUrl = consts.urlMap.gathererAdvanced;
            gathererParams = utils.parseGathererUrlParams(urlParams);
            gathererUrl = 'View in Gatherer: ' + gathererBaseUrl + gathererParams;

            robo.send(cardPoolSize + '\n' + cardSampleText + '\n' + gathererUrl);

        } else {
            robo.send(getCardNotFoundError(cardName));
        }
    },

    parseCommandError: function(robo, err) {
        robo.send(FIND_CMD_ERROR);
    },

    parseServerError: function(robo, err) {
        robo.send(consts.defaultError);
    }
};
