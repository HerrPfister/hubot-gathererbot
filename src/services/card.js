var _ = require('lodash'),

    consts = require('../../static/consts'),
    urlMap = consts.urlMap,
    responseErrorCodes = consts.responseErrorCodes;

function getRandomCard(robot, multiverseId, callback) {
    robot.http(urlMap.deckBrewPrefix + 'multiverseId=' + multiverseId)
        .header('Accept', 'application/json')
        .get()(function (err, res, body) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, JSON.parse(body));
            }
        });
}

function getRandomMultiverseId(robot, callback) {
    robot.http(urlMap.gathererRandom)
        .header('Accept', 'application/json')
        .get()(function (err, res) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, res.headers.location.split('=')[1]);
            }
        });
}

function hasErrorCode(statusCode) {
    return _.includes(responseErrorCodes, statusCode);
}

module.exports = {
    getRandomCard: getRandomCard,
    getRandomMultiverseId: getRandomMultiverseId,
    hasErrorCode: hasErrorCode
};
