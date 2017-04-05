var gathererParams = require('../constants/gatherer-params');

module.exports = {
    toGathererParam: function (value) {
        return gathererParams[value];
    },
    toList: function () {
        return Object.keys(gathererParams);
    }
};
