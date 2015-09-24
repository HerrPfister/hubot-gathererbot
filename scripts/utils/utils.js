
var consts = require('../../static/consts'),
    messageMap = require('./message-maps'),
    urlMap = require('../../static/consts').urlMap,

    find = require('lodash/collection/find'),
    isEmpty = require('lodash/lang/isEmpty'),
    map = require('lodash/collection/map'),

    errorMessageMap = messageMap.errorMessageMap,
    responseErrorCodes = messageMap.responseErrorCodes;

module.exports = {
    hasErrorCode: function(statusCode) {
        return find(responseErrorCodes, function(code) { return code === statusCode; });
    },

    parseGathererUrlParams: function(urlParams) {
        var params = urlParams.split('&'),
            keyValuePair,
            parsedKey,
            parsedValue,
            mappedValue,
            mappedKey,
            mappedParams;

        mappedParams = map(params, function (param) {
            keyValuePair = param.split('=');
            parsedKey = keyValuePair[0];
            parsedValue = keyValuePair[1];

            mappedKey = consts.gathererUrlKeyMap[parsedKey];

            if (parsedKey === 'color') {
                mappedValue = consts.gathererColorMap[parsedValue];
            } else if (parsedKey === 'rarity') {
                mappedValue = consts.gathererRarityMap[parsedValue];
            } else {
                mappedValue = parsedValue;
            }

            return mappedKey + '[' + mappedValue + ']';
        });

        return mappedParams.join('&');
    },

    parseUrlParams: function(userInput) {
        var params,
            trimmedParams;

        if (userInput.indexOf('=') === -1) {
            return 'name=' + userInput;

        } else {
            params = userInput.split(',');

            trimmedParams = map(params, function (param) {
                return param.trim();
            });

            return trimmedParams.join('&');
        }
    },

    getCardName: function(userInput) {
        var nameRegEx = /.*[^=].*/i,
            nameParamRegEx = /name=(\w+)/i;

        if (nameParamRegEx.test(userInput)) {
            return nameParamRegEx.exec(userInput)[1];

        } else if (nameRegEx.test(userInput)) {
            return userInput;

        } else {
            return undefined;
        }
    },

    getCardDetails: function(card) {
        var multiverseId,
            cardEdition,
            cardImage,
            gathererText;

        if (isEmpty(card.editions)) {
            return undefined;
        }

        cardEdition = find(card.editions, function (edition) {
            return parseInt(edition.multiverse_id) > 0;
        });


        if (cardEdition) {
            cardImage = cardEdition.image_url;
            multiverseId = cardEdition.multiverse_id;
            gathererText = "View in Gatherer: " + urlMap.gatherer + multiverseId;
        }

        return {
          name: card.name,
          text: card.text,
          cost: card.cost,
          types: card.types,
          cardImage: cardImage,
          subtypes: card.subtypes,
          gathererText: gathererText,
          attributes: (card.power) ? card.power + "/" + card.toughness : ''
        };
    },

    sendDetails: function(res, cardDetails) {
        var detailsMessage,
            gathererText;

        // If cardDetails is undefined then something strange
        // is going on with the data returned by the service. Otherwise,
        // display all the relevant data.
        if (!cardDetails) {
            res.send(errorMessageMap.cardDetailError);
            return;
        }

        gathererText = cardDetails.gathererText;
        detailsMessage = (cardDetails.cardImage) ?
            cardDetails.cardImage : messageMap.cardDetails(cardDetails);

        res.send(detailsMessage + '\n' + gathererText);
    }
};
