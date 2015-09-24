module.exports = {
    cardLimit: 5,
    responseErrorCodes: [
        400,
        500
    ],
    urlMap: {
        deckBrewBase: 'https://api.deckbrew.com/mtg/cards?',
        deckBrewMultiverseId: 'https://api.deckbrew.com/mtg/cards?multiverseid=',
        gatherer: 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=',
        gathererRandom: 'http://gatherer.wizards.com/Pages/Card/Details.aspx?action=random'
    }
};
