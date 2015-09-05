// Description:
//   A simple bot that queries the deckbrew service for specific cards.
//
// Commands:
//   hubot gatherer [card name] - queries the card service and returns the exact match
//                                if it exists, or names of full search results.
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   HerrPfister and wickerpopstar

var find = require('lodash/collection/find');
var isEmpty = require('lodash/lang/isEmpty');
var consts = require('../consts/consts');

var UrlMap = consts.urlMap;
var MessageMap = consts.messageMap;
var ErrorMessageMap = consts.errorMessageMap;

function getCardDetails(card) {
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
}

function sendDetails(res, cardDetails) {
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

module.exports = function (robot) {
  robot.respond(/gatherer random/i, function(res){
    // NOTE: We are using a seed that may change over time.
    // We need a more dynamic way of getting the max multiverseid.
    // This will generate an id between 1 and 4980.
    var multiverseid = Math.floor(Math.random() * (consts.verseIDSeed - 1) + 1);

    robot.http(UrlMap.multiverseid + multiverseid)
      .header('Accept', 'application/json')
      .get()(function(error, response, body) {
        if (error) {
          res.send(ErrorMessageMap.default)
        } else {
          var card = JSON.parse(body);

          if (!isEmpty(card)) {
            var cardDetails = getCardDetails(card[0]);
            sendDetails(res, cardDetails);
          } else {
            res.send(ErrorMessageMap.multiverseIdNotFound(multiverseid));
          }
        }
      });
  });

  // NOTE: As of right now, we are just capturing everything after the find
  // command. However, later we can make it more customizable if we want.
  // i.e. getting subtypes, color, rarity, etc.
  robot.respond(/gatherer\sfind\s(.*)/i, function (res) {

    // Grab the captured user's input
    var cardName = res.match[1];

    robot.http(UrlMap.cardName + cardName)
      .header('Accept', 'application/json')
      .get()(function(error, response, body) {
        if (error) {
          res.send(ErrorMessageMap.default);
        } else {
          var cards = JSON.parse(body);

          if (!isEmpty(cards)) {
            var card = find(cards, function(card){
              return cardName.toLowerCase() === card.name.toLowerCase()
            });

            // If find() comes back with a match that means it found the exact card the user was
            // looking for. Otherwise, that means the service has found more than one match.
            if (card) {
              var cardDetails = getCardDetails(card);
              sendDetails(res, cardDetails);

            } else {
              // Grab the first X amount of cards, which is determined from the constant cardLimit.
              // Then print off the name of each card.
              var cardLimit = consts.cardLimit;
              var cardSample = cards.slice(0, cardLimit);

              res.send(MessageMap.cardPoolSize(cardSample.length, cards.length));

              for (var i in cardSample) {
                res.send(cardSample[i].name);
              }
            }
          } else {
            res.send(ErrorMessageMap.cardNotFound(cardName));
          }
        }
      });
  });
};
