var map = {
    black: 'b',
    blue: 'u',
    green: 'g',
    red: 'r',
    white: 'w'
};

module.exports = {
    toGathererColor: function (value) {
        return map[value.toLowerCase()];
    }
};