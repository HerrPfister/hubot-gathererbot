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

var consts = require('../consts/gatherer_consts.json');

function findSpecificCard(cardName, cards) {
  for (var i in cards) {
    if (cardName.toLowerCase() === cards[i].name.toLowerCase()) {
      return cards[i];
    }
  }

  return undefined;
}

function getValidCardEdition(card) {
  for (var i in card.editions) {
    var editionID = parseInt(card.editions[i].multiverse_id);
    if (editionID > 0) {
      return card.editions[i];
    }
  }

  return undefined;
}

function getCardDetails(card) {
  if (!card.editions || card.editions.length === 0) {
    return undefined;
  }

  var cardEdition = getValidCardEdition(card);
  var multiverseID = cardImage = gathererText = gathererLink = gathererInfo = '';

  if (cardEdition) {
    multiverseID = cardEdition.multiverse_id;
    cardImage = cardEdition.image_url;
    gathererText = "View in Gatherer: ";
    gathererLink = "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=" + multiverseID;
    gathererInfo = gathererText + gathererLink;
  }

  return {
    name: card.name,
    text: card.text,
    cost: card.cost,
    types: card.types,
    cardImage: cardImage,
    subtypes: card.subtypes,
    gathererInfo: gathererInfo,
    attributes: (card.power) ? card.power + "/" + card.toughness : ''
  };
}

module.exports = function (robot) {

  // As of right now, we are just capturing everything after the gatherer command.
  // However, later we can make it more customizable if we want.
  // i.e. getting subtypes, color, rarity, etc.
  robot.respond(/gatherer\s+(.*)/i, function (res) {

    // Grab the captured user's input
    var cardName = res.match[1];

    robot.http('https://api.deckbrew.com/mtg/cards?name=' + cardName)
      .header('Accept', 'application/json')
      .get()(function(error, response, body) {
          if (error) {
            res.send('There was an issue with your request. Please try again later.');
          } else {
            var cards = JSON.parse(body);
            var cardCount = cards.length;

            // If there are no cards returned then that means the card either doesn't exist
            // or the user misspelled its' name. We need to notify them.
            if (cardCount === 0) {
              res.send('We could not find the card ' + cardName + '. Please try again.');
              return;
            }

            var card = findSpecificCard(cardName, cards);

            // If findSpecificCard comes back with a match that means, we hope,
            // it found the exact card the user was looking for. Otherwise, that means
            // the service has found more than one match.
            if (card) {
              var cardDetails = getCardDetails(card);

              // If getCardDetails returns undefined then something strange
              // is going on with the data returned by the service. Otherwise,
              // display all the relevant data.
              if (!cardDetails) {
                res.send('There was an issue with retrieving the details on the card you were looking for. Please try again.');
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

              res.send(cardDetails.gathererInfo);

            } else {
              // Grab the first X amount of cards, which is determined from the constant cardLimit.
              // Then print off the name of each card.
              var cardLimit = consts.cardLimit;
              var cardSample = cards.slice(0, cardLimit);

              res.send('Displaying ' + cardSample.length + ' out of ' + cardCount + ' cards:');
              for (var i in cardSample) {
                res.send(cardSample[i].name);
              }
            }
          }
        });
  });
};
