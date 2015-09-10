var utils = require('../utils/utils');
var isEmpty = require('lodash/lang/isEmpty');

var ErrorMessageMap = require('../../static/consts').errorMessageMap;

module.exports = {
  parseResponse: function(robo, card) {
    if (!isEmpty(card)) {
      var cardDetails = utils.getCardDetails(card[0]);
      utils.sendDetails(robo, cardDetails);
    } else {
      robo.send(ErrorMessageMap.default);
    }
  }
}

