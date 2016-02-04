'use strict';

var mtgFindCmd = require('../../../../src/commands/mtg-find'),
    cardUtils = require('../../../../src/utils/card'),
    urlUtils = require('../../../../src/utils/url'),
    consts = require('../../../../static/consts'),

    _ = require('lodash'),

    fluki = require('fluki'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('mtg find command', function () {
    var sandbox,
        responseSpy;

    before(function () {
        chai.use(sinonChai);
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        responseSpy = {
            send : sandbox.stub()
        };
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('parseErrorCommand', function () {
        it('should return correct message', function () {
            mtgFindCmd.parseCommandError(responseSpy);

            expect(responseSpy.send).to.have.callCount(1);
            expect(responseSpy.send).to.have.been.calledWith(consts.findInvalidParamError);
        });
    });

    describe('parseResponse', function () {
        var listOfCards,

            expectedGathererParams,
            expectedCardNames,
            expectedUrlParams,
            expectedCardNameMessage,
            expectedCardDetails;

        function buildCards(cardCount) {
            var cards = [];

            _.times(cardCount, function (count) {
                var cardName = fluki.string(10);

                cards.push({
                    name : cardName
                });

                if (count < 5) {
                    expectedCardNames.push(cardName);
                    expectedCardNameMessage += cardName + '\n';
                }
            });

            return cards;
        }

        beforeEach(function () {
            expectedCardNames = [];
            expectedCardNameMessage = '';
            expectedCardDetails = fluki.string(10);
            expectedGathererParams = fluki.string(10);
            expectedUrlParams = fluki.string(10);
        });

        describe('when no cards are provided', function () {
            beforeEach(function () {
                mtgFindCmd.parseResponse(responseSpy, '{}');
            });

            it('should return card details', function () {
                expect(responseSpy.send).to.have.callCount(1);
                expect(responseSpy.send).to.have.been.calledWith(consts.findError);
            });
        });

        describe('when a card name is provided', function () {
            beforeEach(function () {
                listOfCards = buildCards(1);

                sandbox.stub(cardUtils, 'getCardDetails').returns(expectedCardDetails);
                sandbox.stub(cardUtils, 'sendDetails');

                mtgFindCmd.parseResponse(responseSpy, JSON.stringify(listOfCards), listOfCards[0].name);
            });

            it('should return card details', function () {
                expect(cardUtils.sendDetails).to.have.callCount(1);
                expect(cardUtils.sendDetails).to.have.been.calledWith(responseSpy, expectedCardDetails);
            });
        });

        describe('when no card name is provided', function () {
            var expectedMessage;

            function buildResponseMessage(numberOfCards) {
                var sampleSize = numberOfCards > 5 ? 5 : numberOfCards,
                    cardPoolMessage = 'Displaying ' + sampleSize + ' out of ' + listOfCards.length + ' cards:\n',
                    gathererMessage = 'View in Gatherer: ' + consts.urlMap.gathererAdvanced + expectedGathererParams;

                return cardPoolMessage + expectedCardNameMessage + gathererMessage;
            }

            beforeEach(function () {
                sandbox.stub(urlUtils, 'convertUrlParamsToGathererParams').returns(expectedGathererParams);
            });

            describe('when response has 5 or more cards', function () {
                beforeEach(function () {
                    var numberOfCards = fluki.integer(5, 15);

                    listOfCards = buildCards(numberOfCards);
                    expectedMessage = buildResponseMessage(numberOfCards);

                    mtgFindCmd.parseResponse(responseSpy, JSON.stringify(listOfCards), undefined, expectedUrlParams);
                });

                it('should return a list of the first 5 cards', function () {
                    expect(responseSpy.send).to.have.callCount(1);
                    expect(responseSpy.send).to.have.been.calledWith(expectedMessage);

                    _.forEach(expectedCardNames, function (cardName, index) {
                        expect(cardName).to.equal(listOfCards[index].name);
                    });
                });
            });

            describe('when response has less than 5 cards', function () {
                beforeEach(function () {
                    var numberOfCards = fluki.integer(1, 5);

                    listOfCards = buildCards(numberOfCards);
                    expectedMessage = buildResponseMessage(numberOfCards);

                    mtgFindCmd.parseResponse(responseSpy, JSON.stringify(listOfCards), undefined, expectedUrlParams);
                });

                it('should return the entire list of cards', function () {
                    expect(responseSpy.send).to.have.callCount(1);
                    expect(responseSpy.send).to.have.been.calledWith(expectedMessage);

                    _.forEach(expectedCardNames, function (cardName, index) {
                        expect(cardName).to.equal(listOfCards[index].name);
                    });
                });
            });
        });
    });
});
