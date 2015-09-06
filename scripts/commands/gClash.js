var MessageMap = require('../../consts/consts').messageMap;

module.exports = {
  resolveClash: function(robo, challenger, opponent) {
    var challengerCMC = parseInt(challenger.card.cmc);
    var opponentCMC = parseInt(opponent.card.cmc);

    robo.send(MessageMap.clashDefault(challenger.name, opponent.name));

    if (challengerCMC > opponentCMC) {
      robo.send(MessageMap.clashWinner(challenger.name));
    } else {
      robo.send(MessageMap.clashWinner(opponent.name));
    }
  }
};
