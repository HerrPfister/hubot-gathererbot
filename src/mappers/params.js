var map = {
    colors: 'colorIdentity',
    name: 'name',
    oracle: 'text',
    rarity: 'rarity',
    subTypes: 'subtypes',
    superTypes: 'supertypes',
    types: 'types'
};

module.exports = {
    toGathererParam: function (value) {
        return map[value];
    },
    toList: function () {
        return Object.keys(map);
    }
};