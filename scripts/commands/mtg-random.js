var consts = require('../../static/consts'),
    cardUtils = require('../utils/card'),

    isEmpty = require('lodash/lang/isEmpty');


function parseResponse(robo, card) {
    var cardDetails;

    if (!isEmpty(card)) {
        cardDetails = cardUtils.getCardDetails(card[0]);
        cardUtils.sendDetails(robo, cardDetails);
    } else {
        robo.send(consts.defaultError);
    }
}

module.exports = {
    parseResponse: parseResponse
};

