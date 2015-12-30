'use strict';

function map(key) {
    return {
        color: 'color=+',
        format: 'format=+',
        oracle: 'text=+',
        rarity: 'rarity=+',
        set: 'set=+',
        subtype: 'subtype=+',
        type: 'type=+'
    }[key];
}

module.exports = {
    map: map
};