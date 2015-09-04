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
var consts = require('../consts/gatherer_consts.json');

var UrlMap = consts.urlMap;
var ErrorMsgMap = consts.errorMsgMap;

function getCardDetails(card) {
  if (isEmpty(card.editions)) {
    return undefined;
  }

  var cardEdition = find(card.editions, function(edition){
    return parseInt(edition.multiverse_id) > 0;
  });

  var multiverseID = cardImage = gathererText = '';

  if (cardEdition) {
    cardImage = cardEdition.image_url;
    multiverseID = cardEdition.multiverse_id;
    gathererText = "View in Gatherer: " + UrlMap.gatherer + multiverseID;
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

module.exports = function (robot) {
  robot.respond(/gatherer random/i, function(res){
    // TODO: Find out what the seed number should be
    var multiverseid = Math.floor(Math.random() * 50000);

    robot.http(UrlMap.multiverseid + multiverseid)
      .header('Accept', 'application/json')
      .get()(function(error, response, body) {
        if (error) {
          res.send(ErrorMsgMap.default)
        } else {
          // TODO: return random card info
        }
      });
  });

  // As of right now, we are just capturing everything after the gatherer command.
  // However, later we can make it more customizable if we want.
  // i.e. getting subtypes, color, rarity, etc.
  robot.respond(/gatherer\s+(.*)/i, function (res) {

    // Grab the captured user's input
    var cardName = res.match[1];

    // This endpoint returns a list of 10 cards (the same format as the /mtg/cards endpoint)
    // that match the beginning of the search term. This endpoint is great for building interactive
    // autocomplete search for Magic cards.
    robot.http(UrlMap.cardName + cardName)
      .header('Accept', 'application/json')
      .get()(function(error, response, body) {
        if (error) {
          res.send(ErrorMsgMap.default);
        } else {
          var cards = JSON.parse(body);

          // If there are no cards returned then that means the card either doesn't exist
          // or the user misspelled its' name. We need to notify them.
          if (isEmpty(cards)) {
            res.send('We could not find the card ' + cardName + '. Please try again.');
            return;
          }

          var card = find(cards, function(card){
            return cardName.toLowerCase() === card.name.toLowerCase()
          });

          // If findSpecificCard comes back with a match that means, we hope,
          // it found the exact card the user was looking for. Otherwise, that means
          // the service has found more than one match.
          if (card) {
            var cardDetails = getCardDetails(card);

            // If getCardDetails returns undefined then something strange
            // is going on with the data returned by the service. Otherwise,
            // display all the relevant data.
            if (!cardDetails) {
              res.send(ErrorMsgMap.cardDetail);
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

          } else {
            // Grab the first X amount of cards, which is determined from the constant cardLimit.
            // Then print off the name of each card.
            var cardLimit = consts.cardLimit;
            var cardSample = cards.slice(0, cardLimit);

            res.send('Displaying ' + cardSample.length + ' out of ' + cards.length + ' cards:');
            for (var i in cardSample) {
              res.send(cardSample[i].name);
            }
          }
        }
      });
  });
};
