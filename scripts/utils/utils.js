var find = require('lodash/collection/find');
var isEmpty = require('lodash/lang/isEmpty');

var consts = require('../../static/consts');
var UrlMap = consts.urlMap;
var ErrorMessageMap = consts.errorMessageMap;

function hasMultipleParams(userInput) {
  return (userInput.indexOf('=') > -1);
}

module.exports = {
  parseUrlParams: function(userInput) {
    if (hasMultipleParams(userInput)) {
      var urlParams = userInput.split(' ');
      return urlParams.join('&');
    } else {
      return 'name=' + userInput;
    }
  },

  getCardName: function(userInput) {
    if (!hasMultipleParams(userInput)) {
      return userInput;
    }

    var params = userInput.split(/[ =]/gi);

    for (var i = 0; i < params.length; i++) {
      if (params[i] === 'name') {
        return params[i+1];
      }
    }

    return undefined;
  },

  getRandomMultiverseId: function() {
    // NOTE: We are using a seed that may change over time.
    //       We need a more dynamic way of getting the max multiverseid.
    //       This will generate an id between 1 and 4980.
    return Math.floor(Math.random() * (consts.verseIDSeed - 1) + 1);
  },

  getCardDetails: function(card) {
    if (isEmpty(card.editions)) {
      return undefined;
    }

    var cardEdition = find(card.editions, function(edition){
      return parseInt(edition.multiverse_id) > 0;
    });

    var multiverseid = cardImage = gathererText = '';

    if (cardEdition) {
      cardImage = cardEdition.image_url;
      multiverseid = cardEdition.multiverse_id;
      gathererText = "View in Gatherer: " + UrlMap.gatherer + multiverseid;
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
    // If cardDetails is undefined then something strange
    // is going on with the data returned by the service. Otherwise,
    // display all the relevant data.
    if (!cardDetails) {
      res.send(ErrorMessageMap.cardDetail);
      return;
    }

    if (cardDetails.cardImage){
      res.send(cardDetails.cardImage);
    } else {
      res.send(cardDetails.name);
      res.send(cardDetails.text);
      res.send(cardDetails.cost);
      res.send(cardDetails.types);
      res.send(cardDetails.subtypes);
      res.send(cardDetails.attributes);
    }

    res.send(cardDetails.gathererText);
  }
};
