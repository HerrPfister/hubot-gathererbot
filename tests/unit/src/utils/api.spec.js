'use strict';

var apiUtil = require('../../../../src/utils/api'),
    urlMap = require('../../../../static/consts').urlMap,

    Q = require('q'),
    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('api utils', function () {
    var sandbox,
        robotStub,
        headerStub;

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
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('hasErrorCode', function () {
        it('should return true if it is an error code', function () {
            expect(apiUtil.hasErrorCode(400)).to.equal(true);
            expect(apiUtil.hasErrorCode(500)).to.equal(true);
        });

        it('should return false if it is not an error code', function () {
            expect(apiUtil.hasErrorCode(fluki.integer(200, 300))).to.equal(false);
        });
    });

    describe('getRandomMultiverseId', function () {
        var deferredSpy;

        beforeEach(function () {
            deferredSpy = {
                reject: sandbox.spy(),
                resolve: sandbox.spy()
            };

            sandbox.stub(Q, 'defer').returns(deferredSpy);
        });

        describe('when a multiverse id is successfully found', function () {
            var expectedMultiverseId;

            beforeEach(function () {
                expectedMultiverseId = fluki.string();

                buildRobotStub(undefined, {
                    headers: {
                        location: fluki.string() + '=' + expectedMultiverseId
                    }
                });

                apiUtil.getRandomMultiverseId(robotStub);
            });

            it('should return a multiverse id', function () {
                expect(robotStub.http).to.have.callCount(1);
                expect(robotStub.http).to.have.been.calledWith(urlMap.gathererRandom);

                expect(headerStub.header).to.have.callCount(1);
                expect(headerStub.header).to.have.been.calledWith('Accept', 'application/json');

                expect(deferredSpy.resolve).to.have.callCount(1);
                expect(deferredSpy.resolve).to.have.been.calledWith(expectedMultiverseId);
            });
        });

        describe('when there is an error', function () {
            var expectedError;

            beforeEach(function () {
                expectedError = fluki.string(10);

                buildRobotStub(expectedError);

                apiUtil.getRandomMultiverseId(robotStub);
            });

            it('should return the error', function () {
                expect(deferredSpy.reject).to.have.callCount(1);
                expect(deferredSpy.reject).to.have.been.calledWith(expectedError);
            });
        });
    });

    describe('getRandomCard', function () {
        var deferredSpy,
            expectedMultiverseId;

        beforeEach(function () {
            expectedMultiverseId = fluki.string(10);

            deferredSpy = {
                reject: sandbox.spy(),
                resolve: sandbox.spy()
            };

            sandbox.stub(Q, 'defer').returns(deferredSpy);
        });

        describe('when a card with a given multiverse id is found', function () {
            var expectedResponse;

            beforeEach(function () {
                expectedResponse = {};
                expectedResponse[fluki.string(10)] = fluki.string(10);

                buildRobotStub(undefined, undefined, JSON.stringify(expectedResponse));

                apiUtil.getRandomCard(robotStub, expectedMultiverseId);
            });

            it('should return a random card', function () {
                expect(robotStub.http).to.have.callCount(1);
                expect(robotStub.http).to.have.been.calledWith(urlMap.deckBrewPrefix + 'multiverseId=' + expectedMultiverseId);

                expect(headerStub.header).to.have.callCount(1);
                expect(headerStub.header).to.have.been.calledWith('Accept', 'application/json');

                expect(deferredSpy.resolve).to.have.callCount(1);
                expect(deferredSpy.resolve).to.have.been.calledWith(expectedResponse);
            });
        });

        describe('when there is an error', function () {
            var expectedError;

            beforeEach(function () {
                expectedError = fluki.string(10);

                buildRobotStub(expectedError);

                apiUtil.getRandomCard(robotStub, expectedMultiverseId);
            });

            it('should return the error', function () {
                expect(deferredSpy.reject).to.have.callCount(1);
                expect(deferredSpy.reject).to.have.been.calledWith(expectedError);
            });
        });
    });
});
