module.exports = {
  "cardLimit": 5,
  "responseErrorCodes": [ 400, 500 ],
  "urlMap": {
    "deckBrewBase": "https://api.deckbrew.com/mtg/cards?",
    "deckBrewMultiverseId": "https://api.deckbrew.com/mtg/cards?multiverseid=",
    "gatherer": "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=",
    "gathererRandom": "http://gatherer.wizards.com/Pages/Card/Details.aspx?action=random"
  },
  "errorMessageMap" : {
    "default": "There was an issue with your request. Please try again.",
    "findCommandError": "Invalid parameters. Please make sure that parameters are seperated by a comma.",
    "cardDetail": "There was an issue with retrieving the details of the card you were looking for. Please try again.",
    cardNotFound: function(cardName) { return "We could not find the card " + cardName + ". Please try again."; },
    verseIdNotFound: function(multiverseid) { return "We could not find the card with multiverse id" + multiverseid + ". Please try again."; }
  },
  "messageMap": {
    "clashDraw": "It's a draw! Try again if you still can't settle the dispute.",
    clashWinner: function (winnerName) { return 'Clash resolved! ' + winnerName + ' is the winner!'; },
    clashCardDraw: function (name, card) { return name + ' drew ' + card.name + ', which has a converted mana cost of ' + card.cmc + '.'; },
    clashDefault: function (challenger, opponent) { return challenger + ' challenges ' + opponent + ' to a mtg clash!'; },
    cardPoolSize: function (sampleSize, poolSize) { return 'Displaying ' + sampleSize + ' out of ' + poolSize + ' cards:'; }
  }
};
