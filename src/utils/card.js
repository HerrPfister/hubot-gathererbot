var _ = require('lodash'),
    urlMap = require('../../static/consts').urlMap;

function buildDetailsString(cardDetails) {
    var details = cardDetails.cardImage ? [
        cardDetails.cardImage,
        cardDetails.gathererText
    ] : [
        cardDetails.name,
        cardDetails.text,
        cardDetails.cost,
        cardDetails.types,
        cardDetails.subtypes,
        cardDetails.attributes,
        cardDetails.gathererText
    ];

    return details.join('\n');
}

function getFirstEditionFrom(editions) {
    return _.find(editions, function (edition) {
        return parseInt(edition.multiverse_id) > 0;
    });
}

function getCardDetails(card) {
    var attributes = (card.power > -1 && card.toughness > -1) ? card.power + '/' + card.toughness : undefined,

        cardEdition = getFirstEditionFrom(card.editions),
        cardImage = cardEdition ? cardEdition.image_url : undefined,
        gathererText = cardEdition ? 'View in Gatherer: ' + urlMap.gatherer + cardEdition.multiverse_id : undefined;

    return {
        attributes : attributes,
        cardImage : cardImage,
        cost : card.cost,
        gathererText : gathererText,
        name : card.name,
        subtypes : card.subtypes,
        text : card.text,
        types : card.types
    };
}

function getCardName(userInput) {
    var cardNameParamRegEx = /name=(\w+)/i,
        paramListRegEx = /\w+=\w+/i,

        validNameQuery = cardNameParamRegEx.test(userInput),
        invalidNameQuery = paramListRegEx.test(userInput) && !cardNameParamRegEx.test(userInput);

    if (invalidNameQuery || !userInput) {
        return undefined;
    } else if (validNameQuery) {
        return cardNameParamRegEx.exec(userInput)[1];
    } else {
        return userInput;
    }
}

function sendDetails(res, cardDetails) {
    if (!cardDetails) {
        res.send('There was an issue retrieving the cards\'s details. Please try again.');
        return;
    }

    res.send(buildDetailsString(cardDetails));
}

module.exports = {
    getCardName : getCardName,
    getCardDetails : getCardDetails,
    sendDetails : sendDetails
};
