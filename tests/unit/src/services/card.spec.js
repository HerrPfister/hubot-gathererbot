'use strict';

var cardService = require('../../../../src/services/card'),
    urlMap = require('../../../../static/consts').urlMap,

    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('api utils', function () {
    var sandbox,
        robotStub,
        headerStub,
        callbackSpy;

    function buildRobotStub(error, response, body) {
        headerStub = {
            header: sandbox.stub().returns({
                get: sandbox.stub().returns(
                    sandbox.stub().yields(error, response, body)
                )
            })
        };

        robotStub = {
            http: sandbox.stub().returns(headerStub)
        };
    }

    before(function () {
       chai.use(sinonChai);
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        callbackSpy = sandbox.spy();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('hasErrorCode', function () {
        it('should return true if it is an error code', function () {
            expect(cardService.hasErrorCode(400)).to.equal(true);
            expect(cardService.hasErrorCode(500)).to.equal(true);
        });

        it('should return false if it is not an error code', function () {
            expect(cardService.hasErrorCode(fluki.integer(200, 300))).to.equal(false);
        });
    });

    describe('getRandomMultiverseId', function () {

        describe('when a multiverse id is successfully found', function () {
            var expectedMultiverseId;

            beforeEach(function () {
                expectedMultiverseId = fluki.string();

                buildRobotStub(undefined, {
                    headers: {
                        location: fluki.string() + '=' + expectedMultiverseId
                    }
                });

                cardService.getRandomMultiverseId(robotStub, callbackSpy);
            });

            it('should return a multiverse id', function () {
                expect(robotStub.http).to.have.callCount(1);
                expect(robotStub.http).to.have.been.calledWith(urlMap.gathererRandom);

                expect(headerStub.header).to.have.callCount(1);
                expect(headerStub.header).to.have.been.calledWith('Accept', 'application/json');

                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(expectedMultiverseId);
            });
        });

        describe('when there is an error', function () {
            beforeEach(function () {
                buildRobotStub(fluki.string(10));

                cardService.getRandomMultiverseId(robotStub, callbackSpy);
            });

            it('should return the error', function () {
                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(null);
            });
        });
    });

    describe('getRandomCard', function () {
        var expectedMultiverseId;

        beforeEach(function () {
            expectedMultiverseId = fluki.string(10);
        });

        describe('when a card with a given multiverse id is found', function () {
            var expectedResponse;

            beforeEach(function () {
                expectedResponse = {};
                expectedResponse[fluki.string(10)] = fluki.string(10);

                buildRobotStub(undefined, undefined, JSON.stringify(expectedResponse));

                cardService.getRandomCard(robotStub, expectedMultiverseId, callbackSpy);
            });

            it('should return a random card', function () {
                expect(robotStub.http).to.have.callCount(1);
                expect(robotStub.http).to.have.been.calledWith(urlMap.deckBrewPrefix + 'multiverseId=' + expectedMultiverseId);

                expect(headerStub.header).to.have.callCount(1);
                expect(headerStub.header).to.have.been.calledWith('Accept', 'application/json');

                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(expectedResponse);
            });
        });

        describe('when there is an error', function () {
            beforeEach(function () {
                buildRobotStub(fluki.string(10));

                cardService.getRandomCard(robotStub, expectedMultiverseId, callbackSpy);
            });

            it('should return the error', function () {
                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(null);
            });
        });
    });
});
