var MessageMap = require('../../static/consts').messageMap;

module.exports = {
  resolveClash: function(robo, challenger, challenged) {
    var challengerCMC = parseInt(challenger.card.cmc);
    var challengedCMC = parseInt(challenged.card.cmc);

    robo.send(MessageMap.clashDefault(challenger.name, challenged.name));

    if (challengerCMC > challengedCMC) {
      robo.send(MessageMap.clashWinner(challenger.name));
    } else {
      robo.send(MessageMap.clashWinner(challenged.name));
    }
  }
};
