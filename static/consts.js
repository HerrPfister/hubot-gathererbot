module.exports = {
    defaultError: 'There was an issue with your request. Please try again.',
    findError: 'We could not find the card(s) you were looking for. Please try again.',
    findInvalidParamError: 'Invalid parameters. Please make sure that parameters are separated by a semicolon.',
    responseErrorCodes: [
        400,
        500
    ],
    urlMap: {
        deckBrewPrefix: 'https://api.deckbrew.com/mtg/cards?',
        gathererMultiverseId: 'https://api.deckbrew.com/mtg/cards?multiverseid=',
        gatherer: 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=',
        gathererAdvanced: 'http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&',
        gathererRandom: 'http://gatherer.wizards.com/Pages/Card/Details.aspx?action=random'
    }
};
