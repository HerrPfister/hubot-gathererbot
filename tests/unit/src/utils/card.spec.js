'use strict';

var cardUtils = require('../../../../src/utils/card'),

    urlMap = require('../../../../static/consts').urlMap,

    fluki = require('fluki'),
    _ = require('lodash'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('card utils', function () {
    var sandbox;

    before(function () {
        chai.use(sinonChai);
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('getCardName', function () {
        var expectedCardName;

        beforeEach(function () {
            expectedCardName = fluki.string(10);
        });

        describe('when provided without param formatting', function () {
            it('should return the card\'s name', function () {
                var actualCardName = cardUtils.getCardName(expectedCardName);
                expect(actualCardName).to.equal(expectedCardName);
            });
        });

        describe('when provided with param formatting', function () {
            it('should return the card\'s name', function () {
                var actualCardName = cardUtils.getCardName('name=' + expectedCardName);
                expect(actualCardName).to.equal(expectedCardName);
            });
        });

        describe('when provided with no name', function () {
            it('should return undefined', function () {
                var actualCardName = cardUtils.getCardName(undefined);
                expect(actualCardName).to.equal(undefined);

                actualCardName = cardUtils.getCardName('');
                expect(actualCardName).to.equal(undefined);

                actualCardName = cardUtils.getCardName(fluki.string(10) + '=' + fluki.string(10));
                expect(actualCardName).to.equal(undefined);
            });
        });
    });

    describe('getCardDetails', function () {
        var actualCardDetails,

            expectedCard,
            expectedCost,
            expectedImageUrl,
            expectedName,
            expectedPower,
            expectedRandomEditions,
            expectedSubTypes,
            expectedText,
            expectedToughness,
            expectedTypes;

        function buildCard(power, toughness, cost, name, subtypes, text, types, editions) {
            return {
                power: power,
                toughness: toughness,
                cost: cost,
                name: name,
                subtypes: subtypes,
                text: text,
                types: types,
                editions: editions
            };
        }

        function buildRandomEditions(imageUrl) {
            var randomEditions = [],
                numberOfEditions = fluki.integer(2, 10);

            _.times(numberOfEditions, function (count) {
                var low = fluki.integer(2, 100),
                    high = fluki.integer(2, 100),
                    average = fluki.integer(2, 100);

                randomEditions.push({
                    multiverse_id: count,
                    image_url: imageUrl,
                    price: {
                        low: low,
                        high: high,
                        average: average
                    }
                });
            });

            return _.shuffle(randomEditions);
        }

        beforeEach(function () {
            expectedImageUrl = fluki.string(10);
            expectedPower = fluki.integer(2, 10);
            expectedToughness = fluki.integer(2, 10);
            expectedCost = fluki.integer();
            expectedName = fluki.string(10);
            expectedSubTypes = fluki.string(10);
            expectedText = fluki.string(10);
            expectedTypes = fluki.string(10);

            expectedRandomEditions = buildRandomEditions(expectedImageUrl);
        });

        describe('when given a card', function () {
            beforeEach(function () {
                expectedCard = buildCard(
                    expectedPower,
                    expectedToughness,
                    expectedCost,
                    expectedName,
                    expectedSubTypes,
                    expectedText,
                    expectedTypes,
                    expectedRandomEditions
                );

                actualCardDetails = cardUtils.getCardDetails(expectedCard);
            });

            it('should return card details', function () {
                expect(actualCardDetails.attributes).to.equal(expectedCard.power + '/' + expectedCard.toughness);
                expect(actualCardDetails.name).to.equal(expectedCard.name);
                expect(actualCardDetails.cost).to.equal(expectedCard.cost);
                expect(actualCardDetails.subtypes).to.equal(expectedCard.subtypes);
                expect(actualCardDetails.text).to.equal(expectedCard.text);
                expect(actualCardDetails.types).to.equal(expectedCard.types);

                expect(actualCardDetails.gathererText).to.not.equal('View in Gatherer: ' + urlMap.gatherer + '0');
                expect(actualCardDetails.cardImage).to.equal(expectedImageUrl);
            });
        });

        describe('when given a card without editions', function () {
            beforeEach(function () {
                expectedCard = buildCard(
                    expectedPower,
                    expectedToughness,
                    expectedCost,
                    expectedName,
                    expectedSubTypes,
                    expectedText,
                    expectedTypes
                );

                actualCardDetails = cardUtils.getCardDetails(expectedCard);
            });

            it('should return undefined for card image and gatherer text', function () {
                expect(actualCardDetails.gathererText).to.equal(undefined);
                expect(actualCardDetails.cardImage).to.equal(undefined);
            });
        });

        describe('when given a card without power/toughness', function () {
            beforeEach(function () {
                expectedCard = buildCard(
                    undefined,
                    undefined,
                    expectedCost,
                    expectedName,
                    expectedSubTypes,
                    expectedText,
                    expectedTypes,
                    expectedRandomEditions
                );

                actualCardDetails = cardUtils.getCardDetails(expectedCard);
            });

            it('should return undefined for card attributes', function () {
                expect(actualCardDetails.attributes).to.equal(undefined);
            });
        });
    });

    describe('sendDetails', function () {
        var responseSpy,
            expectedName,
            expectedText,
            expectedCost,
            expectedTypes,
            expectedSubtypes,
            expectedAttributes,
            expectedImage,
            expectedGathererText;

        beforeEach(function () {
            responseSpy = {
                send: sandbox.spy()
            };

            expectedImage = fluki.string(10);
            expectedGathererText = fluki.string(10);

            expectedName = fluki.string(10);
            expectedText = fluki.string(10);
            expectedCost = fluki.string(10);
            expectedTypes = fluki.string(10);
            expectedSubtypes = fluki.string(10);

            expectedAttributes = fluki.string(10);
        });

        describe('when given an undefined card', function () {
            beforeEach(function () {
                cardUtils.sendDetails(responseSpy);
            });

            it('should send an error', function () {
                expect(responseSpy.send).to.have.callCount(1);
                expect(responseSpy.send).to.have.been.calledWith(
                    'There was an issue retrieving the cards\'s details. Please try again.'
                );
            });
        });

        describe('when given a card with an image', function () {
            beforeEach(function () {
                cardUtils.sendDetails(responseSpy, {
                    cardImage: expectedImage,
                    gathererText: expectedGathererText
                });
            });

            it('should send the card\'s image', function () {
                expect(responseSpy.send).to.have.callCount(1);
                expect(responseSpy.send).to.have.been.calledWith(expectedImage + '\n' + expectedGathererText);
            });
        });

        describe('when given a card with no image', function () {
            beforeEach(function () {
                cardUtils.sendDetails(responseSpy, {
                    name: expectedName,
                    text: expectedText,
                    cost: expectedCost,
                    types: expectedTypes,
                    subtypes: expectedSubtypes,
                    attributes: expectedAttributes,
                    gathererText: expectedGathererText
                });
            });

            it('should send the card\'s details', function () {
                expect(responseSpy.send).to.have.callCount(1);
                expect(responseSpy.send).to.have.been.calledWith(
                    expectedName + '\n' +
                    expectedText + '\n' +
                    expectedCost + '\n' +
                    expectedTypes + '\n' +
                    expectedSubtypes + '\n' +
                    expectedAttributes + '\n' +
                    expectedGathererText
                );
            });
        });
    });
});
