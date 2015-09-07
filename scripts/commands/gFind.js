var utils = require('../utils/utils');
var consts = require('../../static/consts');
var find = require('lodash/collection/find');
var isEmpty = require('lodash/lang/isEmpty');

var MessageMap = consts.messageMap;
var ErrorMessageMap = consts.errorMessageMap;

module.exports = {
  parseResponse: function(robo, body, cardName) {
    var cards = JSON.parse(body);

    var card = (isEmpty(cards)) ? undefined : find(cards, function(card){
      return cardName.toLowerCase() === card.name.toLowerCase()
    });

    // If find() comes back with a match that means it found the exact card the user was
    // looking for. Otherwise, that means the service has found more than one match.
    if (card) {
      var cardDetails = utils.getCardDetails(card);
      utils.sendDetails(robo, cardDetails);

    } else if (cards.length > 0) {
      // Grab the first X amount of cards, which is determined from the constant cardLimit.
      // Then print off the name of each card.
      var cardLimit = consts.cardLimit;
      var cardSample = cards.slice(0, cardLimit);

      robo.send(MessageMap.cardPoolSize(cardSample.length, cards.length));

      // TODO: Custom sort cards before printing names. The ordering that the
      //       service sends them back in is a little strange.
      for (var i in cardSample) {
        robo.send(cardSample[i].name);
      }

    } else {
      robo.send(ErrorMessageMap.cardNotFound(cardName));
    }
  },

  parseCommandError: function(robo) {
    robo.send(ErrorMessageMap.findCommandError);
  },

  parseError: function(robo, error) {
    robo.send(ErrorMessageMap.default);
  }
};
