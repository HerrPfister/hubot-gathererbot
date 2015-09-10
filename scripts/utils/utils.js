var Q = require('q');
var map = require('lodash/collection/map');
var find = require('lodash/collection/find');
var isEmpty = require('lodash/lang/isEmpty');

var consts = require('../../static/consts');

var UrlMap = consts.urlMap;
var ErrorMessageMap = consts.errorMessageMap;
var ResponseErrorCodes = consts.responseErrorCodes;

module.exports = {
  hasErrorCode: function(statusCode) {
    return find(ResponseErrorCodes, function(code) { return code === statusCode; })
  },

  getRandomMultiverseId: function (robot) {
    var that = this;
    var deferred = Q.defer();

    robot.http(UrlMap.gathererRandom)
      .header('Accept', 'application/json')
      .get()(function(err, res, body){
        if (err) {
          deferred.reject(err);
        } else {
          var location = res.headers.location;
          var multiverseid = location.split('=')[1];

          deferred.resolve(multiverseid);
        }
      });

    return deferred.promise;
  },

  getRandomCard: function (robot, multiverseid) {
    var deferred = Q.defer();

    robot.http(UrlMap.deckBrewMultiverseId + multiverseid)
      .header('Accept', 'application/json')
      .get()(function(err, res, body){
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(JSON.parse(body));
        }
      });

    return deferred.promise;
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
