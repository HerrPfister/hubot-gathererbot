var consts = require('../../static/consts'),
    cardUtils = require('../utils/card'),

    _ = require('lodash');


function parseResponse(robo, card) {
    var cardDetails;

    if (_.isEmpty(card)) {
        robo.send(consts.defaultError);
    } else {
        cardDetails = cardUtils.getCardDetails(card[0]);
        cardUtils.sendDetails(robo, cardDetails);
    }
}

module.exports = {
    parseResponse: parseResponse
};

