var _ = require('lodash'),

    consts = require('../../static/consts'),

    urlMap = consts.urlMap,
    responseErrorCodes = consts.responseErrorCodes;

function getRandomCard(robot, multiverseId, callback) {
    robot.http(urlMap.gathererMultiverseId + multiverseId)
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

function getCard(robot, urlParams, callback) {
    robot.http(urlMap.deckBrewPrefix + urlParams)
        .header('Accept', 'application/json')
        .get()(callback);
}

function hasErrorCode(statusCode) {
    return _.includes(responseErrorCodes, statusCode);
}

module.exports = {
    getCard: getCard,
    getRandomCard: getRandomCard,
    getRandomMultiverseId: getRandomMultiverseId,
    hasErrorCode: hasErrorCode
};
