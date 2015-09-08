var MessageMap = require('../../static/consts').messageMap;
var ErrorMessageMap = require('../../static/consts').errorMessageMap;

module.exports = {
  resolveClash: function(robo, challenger, challenged) {
    var challengerCard = challenger.card[0];
    var challengedCard = challenged.card[0];
    var challengerCardCMC = parseInt(challengerCard.cmc);
    var challengedCardCMC = parseInt(challengedCard.cmc);

    robo.send(MessageMap.clashDefault(challenger.name, challenged.name));

    robo.send(MessageMap.clashCardDraw(challenger.name, challengerCard));
    robo.send(MessageMap.clashCardDraw(challenged.name, challengedCard));

    if (challengerCardCMC === challengedCardCMC) {
      robo.send(MessageMap.clashDraw);
    } else if (challengerCardCMC > challengedCardCMC){
      robo.send(MessageMap.clashWinner(challenger.name));
    } else {
      robo.send(MessageMap.clashWinner(challenged.name));
    }
  },

  parseError: function(robo, error) {
    robo.send(ErrorMessageMap.default);
  }
};
