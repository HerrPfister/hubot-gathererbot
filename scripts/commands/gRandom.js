var utils = require('../utils/utils');
var isEmpty = require('lodash/lang/isEmpty');

var ErrorMessageMap = require('../../consts/consts').errorMessageMap;

module.exports = {
  parseResponse: function(robo, body) {
    var card = JSON.parse(body);

    if (!isEmpty(card)) {
      var cardDetails = utils.getCardDetails(card[0]);
      utils.sendDetails(robo, cardDetails);
    } else {
      robo.send(ErrorMessageMap.multiverseIdNotFound(multiverseid));
    }
  },

  parseError: function(robo, error) {
    robo.send(ErrorMessageMap.default)
  }
}

