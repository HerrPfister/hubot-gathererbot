'use strict';

var mtgQuery = require('../../../../src/commands/query'),
    mtg = requre('mtgsdk'),

    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('mtg query command', function () {
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

    describe('query', function () {
        describe('when', function () {
            it('should', function () {
                expect(true).to.be.truthy();
            });
        });
    });
});
