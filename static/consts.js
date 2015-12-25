module.exports = {
    defaultError: 'There was an issue with your request. Please try again.',
    gathererColorMap: {
        blue: 'U',
        red: 'R',
        green: 'G',
        black: 'B',
        white: 'W'
    },
    gathererRarityMap: {
        common: 'C',
        uncommon: 'U',
        rare: 'R',
        mythic: 'M'
    },
    gathererUrlKeyMap: {
        color: 'color=+',
        format: 'format=+',
        oracle: 'text=+',
        rarity: 'rarity=+',
        set: 'set=+',
        subtype: 'subtype=+',
        type: 'type=+'
    },
    responseErrorCodes: [
        400,
        500
    ],
    urlMap: {
        deckBrewPrefix: 'https://api.deckbrew.com/mtg/cards?',
        gatherer: 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=',
        gathererAdvanced: 'http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&',
        gathererRandom: 'http://gatherer.wizards.com/Pages/Card/Details.aspx?action=random'
    }
};
