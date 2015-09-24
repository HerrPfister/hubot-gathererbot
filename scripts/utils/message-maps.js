module.exports = {
    errorMessageMap : {
        cardDetailError: 'There was an issue retrieving the cards\'s details. Please try again.',
        defaultError: 'There was an issue with your request. Please try again.',
        findCommandError: 'Invalid parameters. Please make sure that parameters are separated by a comma.',
        cardNotFound: function(cardName) {
          return 'We could not find the card ' + cardName + '. Please try again.';
        }
    },

    messageMap: {
        clashDraw: 'It\'s a draw!',
        clashWinner: function (winnerName) {
          return 'Clash resolved! ' + winnerName + ' is the winner!';
        },
        clashCardDraw: function (name, card) {
          return name + ' drew ' + card.name + ', which has a converted mana cost of ' + card.cmc + '.';
        },
        clashDefault: function (challenger, opponent) {
          return challenger + ' challenges ' + opponent + ' to a mtg clash!';
        },
        cardPoolSize: function (sampleSize, poolSize) {
          return 'Displaying ' + sampleSize + ' out of ' + poolSize + ' cards:';
        },
        cardDetails: function (cardDetails) {
            var details = [
                cardDetails.name,
                cardDetails.text,
                cardDetails.cost,
                cardDetails.types,
                cardDetails.subtypes,
                cardDetails.attributes
            ];

            return details.join('\n');
        }
    }
};
