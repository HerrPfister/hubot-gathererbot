'use strict';

var rarityMapper = require('../../../../src/mappers/rarity'),

chai = require('chai'),
expect = chai.expect;

describe('rarity mapper', function () {
    it('should return "C" if given "common"', function () {
        expect(rarityMapper.map('common')).to.equal('C');
    });

    it('should return "U" if given "uncommon"', function () {
        expect(rarityMapper.map('uncommon')).to.equal('U');
    });

    it('should return "R" if given "rare"', function () {
        expect(rarityMapper.map('rare')).to.equal('R');
    });

    it('should return "M" if given "mythic"', function () {
        expect(rarityMapper.map('mythic')).to.equal('M');
    });
});