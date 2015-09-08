module.exports = {
  "cardLimit": 5,
  "verseIDSeed": 4980,
  "urlMap": {
    "gathererFind": "https://api.deckbrew.com/mtg/cards?",
    "multiverseid": "https://api.deckbrew.com/mtg/cards?multiverseid=",
    "gatherer": "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid="
  },
  "errorMessageMap" : {
    "default": "There was an issue with your request. Please try again.",
    "findCommandError": "Invalid parameters. Please make sure that the card name is included in the parameters.",
    "cardDetail": "There was an issue with retrieving the details of the card you were looking for. Please try again.",
    cardNotFound: function(cardName) { return "We could not find the card " + cardName + ". Please try again."; },
    verseIdNotFound: function(multiverseid) { return "We could not find the card with multiverse id" + multiverseid + ". Please try again."; }
  },
  "messageMap": {
    "clashDraw": "It's a draw! Try again if you still can't settle the dispute.",
    clashWinner: function (winnerName) { return 'Clash resolved! ' + winnerName + ' is the winner!'; },
    clashCardDraw: function (name, card) { return name + ' drew ' + card.name + ', which has a converted mana cost of ' + card.cmc + '.'; },
    clashDefault: function (challenger, opponent) { return challenger + ' challenges ' + opponent + ' to a mtg clash!'; },
    cardPoolSize: function (sampleSize, poolSize) { return 'Displaying ' + sampleSize + ' out of ' + poolSize + ' matched cards:'; }
  }
};
