'use strict';

function map(key) {
    switch (key) {
        case 'color':
            return 'color=+';
        case 'format':
            return 'format=+';
        case 'oracle':
            return 'text=+';
        case 'rarity':
            return 'rarity=+';
        case 'set':
            return 'set=+';
        case 'subtype':
            return 'subtype=+';
        case 'type':
            return 'type=+';
        default:
            return 'name=+';
    }
}

module.exports = {
    map: map
};