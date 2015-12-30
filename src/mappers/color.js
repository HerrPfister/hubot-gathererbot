'use strict';

function map(key) {
    return {
        blue: 'U',
        red: 'R',
        green: 'G',
        black: 'B',
        white: 'W'
    }[key];
}

module.exports = {
    map: map
};