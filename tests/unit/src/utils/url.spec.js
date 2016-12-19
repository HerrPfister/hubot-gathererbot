'use strict';

var urlUtils = require('../../../../src/utils/url'),
    gathererKeyMapper = require('../../../../src/mappers/gatherer-keys'),
    colorMapper = require('../../../../src/mappers/color'),
    rarityMapper = require('../../../../src/mappers/rarity'),

    _ = require('lodash'),
    fluki = require('fluki'),

    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chai = require('chai'),
    expect = chai.expect;

describe('url utils', function () {
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

    describe('convertUserInputToUrlParams', function () {

        describe('when not given user input', function () {
            it('should return empty string', function () {
                var parsedParams = urlUtils.convertUserInputToUrlParams('');
                expect(parsedParams).to.equal('');

                parsedParams = urlUtils.convertUserInputToUrlParams(undefined);
                expect(parsedParams).to.equal('');
            });
        });

        describe('when not given properly formatted user input', function () {
            it('should return just the name param', function () {
                var expectedUserInput = fluki.string(10),
                    parsedParams = urlUtils.convertUserInputToUrlParams(expectedUserInput);

                expect(parsedParams).to.equal('name=' + expectedUserInput);
            });
        });

        describe('when given properly formatted user input', function () {
            var expectedKeys,
                expectedValues;

            function buildUserInputString() {
                var userInput = [];

                _.times(fluki.integer(2, 10), function () {
                    var randomKey = fluki.string(5),
                    randomValue = fluki.string(5);

                    userInput.push(randomKey + '=' + randomValue);
                    expectedKeys.push(randomKey);
                    expectedValues.push(randomValue);
                });

                return userInput.join(';');
            }

            beforeEach(function () {
                expectedKeys = [];
                expectedValues = [];
            });

            it('should return converted user input', function () {
                var expectedUserInput = buildUserInputString(),
                parsedParams = urlUtils.convertUserInputToUrlParams(expectedUserInput);

                _.forEach(parsedParams.split('&'), function (param, index) {
                    var expectedParam = expectedKeys[index] + '=' + expectedValues[index];

                    expect(param).to.equal(expectedParam);
                });
            });
        });
    });

    describe('convertUrlParamsToGathererParams', function () {
        var expectedGathererColorKey,
            expectedGathererRarityKey,
            expectedColor,
            expectedRarity,

            actualGathererParams;

        beforeEach(function () {
            expectedGathererColorKey = fluki.string(10);
            expectedGathererRarityKey = fluki.string(10);
            expectedColor = fluki.string(10);
            expectedRarity = fluki.string(10);

            sandbox.stub(colorMapper, 'map').returns(expectedColor);
            sandbox.stub(rarityMapper, 'map').returns(expectedRarity);
            sandbox.stub(gathererKeyMapper, 'map');

            gathererKeyMapper.map.withArgs('color').returns(expectedGathererColorKey);
            gathererKeyMapper.map.withArgs('rarity').returns(expectedGathererRarityKey);
        });

        describe('when user input is given', function () {
            function buildExtraUrlParams(baseUrlParams) {
                _.times(fluki.integer(2, 10), function () {
                    var key = fluki.string(10),
                    value = fluki.string(10),
                    gathererKey = fluki.string(10);

                    baseUrlParams.push(key + '=' + value);

                    gathererKeyMapper.map.withArgs(key).returns(gathererKey);
                });

                return _.shuffle(baseUrlParams).join('&');
            }

            beforeEach(function () {
                var urlParams = buildExtraUrlParams([ 'color=' + fluki.string(5), 'rarity=' + fluki.string(5) ]);

                actualGathererParams = urlUtils.convertUrlParamsToGathererParams(urlParams);
            });

            it('should return converted url params', function () {
                var gathererParams = actualGathererParams.split('&');

                expect(gathererParams).to.include(expectedGathererColorKey + '%5B' + expectedColor + '%5D');
                expect(gathererParams).to.include(expectedGathererRarityKey + '%5B' + expectedRarity + '%5D');
            });
        });

        describe('when user input is not given', function () {
            it('should return empty string', function () {
                var gathererParams = urlUtils.convertUrlParamsToGathererParams(undefined);
                expect(gathererParams).to.equal('');

                gathererParams = urlUtils.convertUrlParamsToGathererParams('');
                expect(gathererParams).to.equal('');
            });
        });
    });
});
