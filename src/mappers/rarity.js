'use strict';

function map(key) {
    return {
        common: 'C',
        uncommon: 'U',
        rare: 'R',
        mythic: 'M'
    }[key];
}

module.exports = {
    map: map
};