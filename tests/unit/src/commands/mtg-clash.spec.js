'use strict';

var mtgClashCmd = require('../../../../src/commands/mtg-clash'),

    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('mtg clash command', function () {
    var sandbox,
        responseSpy,
        challenged,
        challenger;

    function buildMessage(challengerName, challengedName, challengerCard, challengedCard, winnerName) {
        var initialMsg = challengerName + ' challenges ' + challengedName + ' to a mtg clash!\n',
            challengerMsg = challengerName + ' drew ' + challengerCard.name + ', which has a converted mana cost of ' + challengerCard.cmc + '.\n',
            challengedMsg = challengedName + ' drew ' + challengedCard.name + ', which has a converted mana cost of ' + challengedCard.cmc + '.\n',
            resolutionMsg = winnerName ? 'Clash resolved! ' + winnerName + ' is the winner!' : 'It\'s a draw!';

        return initialMsg + challengerMsg + challengedMsg + resolutionMsg;
    }

    before(function () {
        chai.use(sinonChai);
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        responseSpy = {
            send: sandbox.spy()
        };

        challenger = {
            name: fluki.string(10)
        };

        challenged = {
            name: fluki.string(10)
        };
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('resolveClash', function () {

        describe('when challenger has a card with a higher cmc', function () {
            beforeEach(function () {
                challenger.card = [ { name: fluki.string(10), cmc: 1 } ];
                challenged.card = [ { name: fluki.string(10), cmc: 0 } ];

                mtgClashCmd.resolveClash(responseSpy, challenger, challenged);
            });

            it('should return the correct winner message', function () {
                expect(responseSpy.send).to.have.callCount(1);
                expect(responseSpy.send).to.have.been.calledWith(
                    buildMessage(challenger.name,
                                 challenged.name,
                                 challenger.card[0],
                                 challenged.card[0],
                                 challenger.name)
                );
            });
        });

        describe('when challenged has a card with a higher cmc', function () {
            beforeEach(function () {
                challenger.card = [ { name: fluki.string(10), cmc: 0 } ];
                challenged.card = [ { name: fluki.string(10), cmc: 1 } ];

                mtgClashCmd.resolveClash(responseSpy, challenger, challenged);
            });

            it('should return the correct winner message', function () {
                expect(responseSpy.send).to.have.callCount(1);
                expect(responseSpy.send).to.have.been.calledWith(
                    buildMessage(challenger.name,
                                 challenged.name,
                                 challenger.card[0],
                                 challenged.card[0],
                                 challenged.name)
                );
            });
        });

        describe('when its a draw', function () {
            beforeEach(function () {
                challenger.card = [ { name: fluki.string(10), cmc: 0 } ];
                challenged.card = [ { name: fluki.string(10), cmc: 0 } ];

                mtgClashCmd.resolveClash(responseSpy, challenger, challenged);
            });

            it('should return the correct message', function () {
                expect(responseSpy.send).to.have.callCount(1);
                expect(responseSpy.send).to.have.been.calledWith(
                    buildMessage(challenger.name, challenged.name, challenger.card[0], challenged.card[0])
                );
            });
        });
    });
});
