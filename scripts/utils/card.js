var _ = require('lodash');

function getCardDetailsString(cardDetails) {
    var details = [
        cardDetails.name,
        cardDetails.text,
        cardDetails.cost,
        cardDetails.types,
        cardDetails.subtypes,
        cardDetails.attributes
    ];

    return details.join('\n');
}

function getGathererDetails(editions) {
    return _.find(editions, function (edition) {
        return parseInt(edition.multiverse_id) > 0;
    });
}

function getCardDetails(card) {
    var cardEdition = getGathererDetails(card.editions)

    return {
        attributes: card.power ? card.power + '/' + card.toughness : '',
        cardImage: cardEdition ? cardEdition.image_url : undefined,
        cost: card.cost,
        gathererText: cardEdition ? 'View in Gatherer: ' + urlMap.gatherer + cardEdition.multiverse_id : undefined,
        name: card.name,
        subtypes: card.subtypes,
        text: card.text,
        types: card.types
    };
}

function getCardName(userInput) {
    var nameRegEx = /.*[^=].*/i,
        nameParamRegEx = /name=(\w+)/i;

    if (nameParamRegEx.test(userInput)) {
        return nameParamRegEx.exec(userInput)[1];

    } else if (nameRegEx.test(userInput)) {
        return userInput;

    } else {
        return undefined;
    }
}

function sendDetails(res, cardDetails) {
    var detailsMessage,
        gathererText;

    if (!cardDetails) {
        res.send('There was an issue retrieving the cards\'s details. Please try again.');
        return;
    }

    gathererText = cardDetails.gathererText;
    detailsMessage = (cardDetails.cardImage) ? cardDetails.cardImage : getCardDetailsString(cardDetails);

    res.send(detailsMessage + '\n' + gathererText);
}

module.exports = {
    getCardName: getCardName,
    getCardDetails: getCardDetails,
    sendDetails: sendDetails
};
