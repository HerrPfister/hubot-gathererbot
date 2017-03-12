'use strict';

var mtgRandom = require('../../../../src/commands/random'),
    mtg = require('mtgsdk'),

    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('mtg random command', function () {
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

    describe('random', function () {
        describe('when', function () {
            it('should', function () {
                expect(true).to.be.ok;
            });
        });
    });
});
