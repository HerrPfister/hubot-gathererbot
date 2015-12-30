'use strict';

var gathererKeyMapper = require('../../../../src/mappers/gatherer-keys'),

    chai = require('chai'),
    expect = chai.expect;

describe('gatherer keys mapper', function () {
    it('should return "color=+" if given "color"', function () {
        expect(gathererKeyMapper.map('color')).to.equal('color=+');
    });

    it('should return "format=+" if given "format"', function () {
        expect(gathererKeyMapper.map('format')).to.equal('format=+');
    });

    it('should return "text=+" if given "oracle"', function () {
        expect(gathererKeyMapper.map('oracle')).to.equal('text=+');
    });

    it('should return "rarity=+" if given "rarity"', function () {
        expect(gathererKeyMapper.map('rarity')).to.equal('rarity=+');
    });

    it('should return "set=+" if given "set"', function () {
        expect(gathererKeyMapper.map('set')).to.equal('set=+');
    });

    it('should return "subtype=+" if given "subtype"', function () {
        expect(gathererKeyMapper.map('subtype')).to.equal('subtype=+');
    });

    it('should return "type=+" if given "type"', function () {
        expect(gathererKeyMapper.map('type')).to.equal('type=+');
    });
});
