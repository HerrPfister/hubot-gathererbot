'use strict';

var cardService = require('../../../../src/services/card'),
    urlMap = require('../../../../static/consts').urlMap,

    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('Card Service', function () {
    var sandbox,
        robotStub,
        headerStub,
        callbackSpy;

    function buildStubs(error, response, body) {
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
                expectedMultiverseId = fluki.string(10);

                buildStubs(null, {
                    headers: {
                        location: fluki.string(10) + '=' + expectedMultiverseId
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
                expect(callbackSpy).to.have.been.calledWith(null, expectedMultiverseId);
            });
        });

        describe('when there is an error', function () {
            var expectedError;

            beforeEach(function () {
                expectedError = fluki.string(10);
                buildStubs(expectedError);

                cardService.getRandomMultiverseId(robotStub, callbackSpy);
            });

            it('should return the error', function () {
                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(expectedError, null);
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

                buildStubs(null, null, JSON.stringify(expectedResponse));

                cardService.getRandomCard(robotStub, expectedMultiverseId, callbackSpy);
            });

            it('should return a random card', function () {
                expect(robotStub.http).to.have.callCount(1);
                expect(robotStub.http).to.have.been.calledWith(urlMap.gathererMultiverseId + expectedMultiverseId);

                expect(headerStub.header).to.have.callCount(1);
                expect(headerStub.header).to.have.been.calledWith('Accept', 'application/json');

                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(null, expectedResponse);
            });
        });

        describe('when there is an error', function () {
            var expectedError;

            beforeEach(function () {
                expectedError = fluki.string(10);
                buildStubs(expectedError);

                cardService.getRandomCard(robotStub, expectedMultiverseId, callbackSpy);
            });

            it('should return the error', function () {
                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(expectedError, null);
            });
        });
    });

    describe('getCard', function () {
        var urlParams;

        beforeEach(function () {
            urlParams = fluki.string(10);
        });

        describe('when a card with a given name is found', function () {
            var expectedBody,
                expectedUrlParams;

            beforeEach(function () {
                expectedBody = {};
                expectedBody[fluki.string(10)] = fluki.string(10);
                expectedBody = JSON.stringify(expectedBody);

                expectedUrlParams = fluki.string(10);

                buildStubs(null, null, expectedBody);

                cardService.getCard(robotStub, expectedUrlParams, callbackSpy);
            });

            it('should return the named card', function () {
                expect(robotStub.http).to.have.callCount(1);
                expect(robotStub.http).to.have.been.calledWith(urlMap.deckBrewPrefix + expectedUrlParams);

                expect(headerStub.header).to.have.callCount(1);
                expect(headerStub.header).to.have.been.calledWith('Accept', 'application/json');

                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(null, null, expectedBody);
            });
        });

        describe('when there is an error', function () {
            var expectedError;

            beforeEach(function () {
                expectedError = fluki.string(10);
                buildStubs(expectedError, null, null);

                cardService.getCard(robotStub, fluki.string(10), callbackSpy);
            });

            it('should return the error', function () {
                expect(callbackSpy).to.have.callCount(1);
                expect(callbackSpy).to.have.been.calledWith(expectedError, null, null);
            });
        });
    });
});
