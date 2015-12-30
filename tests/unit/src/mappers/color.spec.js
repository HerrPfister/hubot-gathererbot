'use strict';

var colorMapper = require('../../../../src/mappers/color'),

    chai = require('chai'),
    expect = chai.expect;

describe('color mapper', function () {
    it('should return "U" if given "blue"', function () {
        expect(colorMapper.map('blue')).to.equal('U');
    });
    it('should return "R" if given "red"', function () {
        expect(colorMapper.map('red')).to.equal('R');
    });
    it('should return "G" if given "green"', function () {
        expect(colorMapper.map('green')).to.equal('G');
    });
    it('should return "B" if given "black"', function () {
        expect(colorMapper.map('black')).to.equal('B');
    });
    it('should return "W" if given "white"', function () {
        expect(colorMapper.map('white')).to.equal('W');
    });
});
