var CLASH_DRAW = 'It\'s a draw!';

function getClashWinnerString(winnerName) {
    return 'Clash resolved! ' + winnerName + ' is the winner!';
}

function getClashCardDrawString(name, card) {
    return name + ' drew ' + card.name + ', which has a converted mana cost of ' + card.cmc + '.';
}

function getClashDefaultString(challenger, opponent) {
    return challenger + ' challenges ' + opponent + ' to a mtg clash!';
}

function resolveClash(robo, challenger, challenged) {
    var challengerCard = challenger.card[0],
        challengedCard = challenged.card[0],

        challengerCardCMC = parseInt(challengerCard.cmc),
        challengedCardCMC = parseInt(challengedCard.cmc),

        defaultMessage = getClashDefaultString(challenger.name, challenged.name),
        challengerCardMessage = getClashCardDrawString(challenger.name, challengerCard),
        challengedCardMessage = getClashCardDrawString(challenged.name, challengedCard),

        clashMessage = defaultMessage + '\n' + challengerCardMessage + '\n' + challengedCardMessage;

    if (challengerCardCMC === challengedCardCMC) {
        robo.send(clashMessage + '\n' + CLASH_DRAW);
    } else if (challengerCardCMC > challengedCardCMC){
        robo.send(clashMessage + '\n' + getClashWinnerString(challenger.name));
    } else {
        robo.send(clashMessage + '\n' + getClashWinnerString(challenged.name));
    }
}

module.exports = {
    resolveClash: resolveClash
};
