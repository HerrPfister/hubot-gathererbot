module.exports = {
  "cardLimit": 5,
  "gathererColorMap": {
    "blue": "u",
    "red": "r",
    "green": "g",
    "black": "b",
    "white": "w"
  },
  "gathererRarityMap": {
    "common": "c",
    "uncommon": "u",
    "rare": "r",
    "mythic": "m"
  },
  "gathererUrlKeyMap": {
    "color": "color=+",
    "format": "format=+",
    "oracle": "text=+",
    "rarity": "rarity=+",
    "set": "set=+",
    "subtype": "subtype=+",
    "type": "type=+"
  },
  "responseErrorCodes": [
    400,
    500
  ],
  "urlMap": {
    "deckBrewBase": "https://api.deckbrew.com/mtg/cards?",
    "deckBrewMultiverseId": "https://api.deckbrew.com/mtg/cards?multiverseid=",
    "gatherer": "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=",
    "gathererAdvanced": "http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&",
    "gathererRandom": "http://gatherer.wizards.com/Pages/Card/Details.aspx?action=random"
  }
};