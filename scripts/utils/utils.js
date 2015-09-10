var map = require('lodash/collection/map');
var find = require('lodash/collection/find');
var isEmpty = require('lodash/lang/isEmpty');

var consts = require('../../static/consts');

var urlMap = consts.urlMap;
var errorMessageMap = consts.errorMessageMap;
var responseErrorCodes = consts.responseErrorCodes;

module.exports = {
  hasErrorCode: function(statusCode) {
    return find(responseErrorCodes, function(code) { return code === statusCode; })
  },

  parseUrlParams: function(userInput) {
    if (userInput.indexOf('=') === -1) {
      return 'name=' + userInput;
    } else {
      var params = userInput.split(',');
      var trimmedParams = map(params, function(param) { return param.trim(); });

      return trimmedParams.join('&');
    }
  },

  getCardName: function(userInput) {
    var nameRegEx = /.*[^=].*/i;
    var nameParamRegEx = /name=(\w+)/i;

    if (nameParamRegEx.test(userInput)) {
      return nameParamRegEx.exec(userInput)[1];
    } else if (nameRegEx.test(userInput)) {
      return userInput;
    } else {
      return undefined;
    }
  },

  getCardDetails: function(card) {
    if (isEmpty(card.editions)) {
      return undefined;
    }

    var cardEdition = find(card.editions, function(edition){
      return parseInt(edition.multiverse_id) > 0;
    });

    var multiverseId = cardImage = gathererText = '';

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
    // If cardDetails is undefined then something strange
    // is going on with the data returned by the service. Otherwise,
    // display all the relevant data.
    if (!cardDetails) {
      res.send(errorMessageMap.cardDetail);
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
