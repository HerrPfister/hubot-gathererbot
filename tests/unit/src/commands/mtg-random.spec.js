'use strict';

var mtgRandomCmd = require('../../../../src/commands/mtg-random'),
    consts = require('../../../../static/consts'),
    cardUtils = require('../../../../src/utils/card'),

    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('mtg random command', function () {
    var sandbox,
        responseSpy,
        card;

    before(function () {
       chai.use(sinonChai);
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        responseSpy = {
            send: sandbox.spy()
        };

        card = {};
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('parseResponse when given a card', function () {
        var expectedCardDetails;

        beforeEach(function () {
            card[ fluki.string(10) ] = fluki.string(10);
            expectedCardDetails = fluki.string(10);

            sandbox.stub(cardUtils, 'getCardDetails').returns(expectedCardDetails);
            sandbox.stub(cardUtils, 'sendDetails');

            mtgRandomCmd.parseResponse(responseSpy, card);
        });

        it('should ', function () {
            expect(cardUtils.sendDetails).to.have.callCount(1);
            expect(cardUtils.sendDetails).to.have.been.calledWith(responseSpy, expectedCardDetails);
        });
    });

    describe('parseResponse when given an empty card', function () {
        beforeEach(function () {
            mtgRandomCmd.parseResponse(responseSpy, card);
        });

        it('should ', function () {
            expect(responseSpy.send).to.have.callCount(1);
            expect(responseSpy.send).to.have.been.calledWith(consts.defaultError);
        });
    });
});
