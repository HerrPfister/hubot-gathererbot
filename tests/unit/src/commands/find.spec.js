'use strict';

var mtgFind = require('../../../../src/commands/find'),
    mtg = require('mtgsdk'),

    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),

    chai = require('chai'),
    expect = chai.expect;

describe('mtg find command', function () {
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

    describe('find', function () {
        describe('when', function () {
            it('should', function () {
                expect(true).to.be.ok;
            });
        });
    });
});
