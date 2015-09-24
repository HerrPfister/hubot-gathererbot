var consts = require('../../static/consts'),
    messageMaps = require('../utils/message-maps'),
    utils = require('../utils/utils'),

    find = require('lodash/collection/find'),
    isEmpty = require('lodash/lang/isEmpty'),
    pluck = require('lodash/collection/pluck'),

    messageMap = messageMaps.messageMap,
    errorMessageMap = messageMaps.errorMessageMap;

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
                return cardName.toLowerCase() === card.name.toLowerCase()
            });

        // If find() comes back with a match that means it found the exact card the user was
        // looking for. Otherwise, that means the service has found more than one match.
        if (card) {
            cardDetails = utils.getCardDetails(card);
            utils.sendDetails(robo, cardDetails);

        } else if (cards.length > 0) {
            // Grab the first X amount of cards, which is determined from the constant cardLimit.
            // Then print off the name of each card.
            cardSample = cards.slice(0, consts.cardLimit);
            cardSampleNames = pluck(cardSample, 'name');
            cardSampleText = cardSampleNames.join('\n');
            cardPoolSize = messageMap.cardPoolSize(cardSample.length, cards.length);

            gathererBaseUrl = consts.urlMap.gathererAdvanced;
            gathererParams = utils.parseGathererUrlParams(urlParams);
            gathererUrl = gathererBaseUrl + gathererParams;

            robo.send(cardPoolSize + '\n' + cardSampleText + '\n' + gathererUrl);

        } else {
            robo.send(errorMessageMap.cardNotFound(cardName));
        }
    },

    parseCommandError: function(robo, err) {
        robo.send(errorMessageMap.findCommandError);
    },

    parseServerError: function(robo, err) {
        robo.send(errorMessageMap.defaultError)
    }
};
