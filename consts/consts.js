module.exports = {
  "cardLimit": 5,
  "verseIDSeed": 4980,
  "urlMap": {
    "gatherer": "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=",
    "cardName": "https://api.deckbrew.com/mtg/cards?name=",
    "multiverseid": "https://api.deckbrew.com/mtg/cards?multiverseid="
  },
  "errorMessageMap" : {
    "default": "There was an issue with your request. Please try again.",
    "cardDetail": "There was an issue with retrieving the details on the card you were looking for. Please try again.",
    cardNotFound: function(cardName) { return "We could not find the card " + cardName + ". Please try again."; },
    verseIdNotFound: function(multiverseid) { return "We could not find the card with multiverse id" + multiverseid + ". Please try again."; }
  },
  "messageMap": {
    cardPoolSize: function (sampleSize, poolSize) { return 'Displaying ' + sampleSize + ' out of ' + poolSize + ' cards:'; },
    clashWinner: function (winnerName) { return 'Clash resolved! ' + winnerName + ' is the winner!'; },
    clashDefault: function (challenger, opponent) { return challenger + ' challenges ' + opponent + ' to a mtg clash.'; }
  }
};
