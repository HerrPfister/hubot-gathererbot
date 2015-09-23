var messageMap = require('../utils/message-maps').messageMap;

module.exports = {
    resolveClash: function(robo, challenger, challenged) {
        var challengerCard = challenger.card[0],
            challengedCard = challenged.card[0],

            challengerCardCMC = parseInt(challengerCard.cmc),
            challengedCardCMC = parseInt(challengedCard.cmc),

            defaultMessage = messageMap.clashDefault(challenger.name, challenged.name),
            challengerCardMessage = messageMap.clashCardDraw(challenger.name, challengerCard),
            challengedCardMessage = messageMap.clashCardDraw(challenged.name, challengedCard);

        robo.send(defaultMessage + '\n' + challengerCardMessage + '\n' + challengedCardMessage);

        if (challengerCardCMC === challengedCardCMC) {
            robo.send(messageMap.clashDraw);
        } else if (challengerCardCMC > challengedCardCMC){
            robo.send(messageMap.clashWinner(challenger.name));
        } else {
            robo.send(messageMap.clashWinner(challenged.name));
        }
    }
};
