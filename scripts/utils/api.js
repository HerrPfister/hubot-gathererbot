var Q = require('q'),

    consts = require('../../static/consts'),
    urlMap = consts.urlMap,
    responseErrorCodes = consts.responseErrorCodes;

function getRandomCard(robot, multiverseId) {
    var deferred = Q.defer();

    robot.http(urlMap.deckBrewPrefix + 'multiverseId=' + multiverseId)
        .header('Accept', 'application/json')
        .get()(function(err, res, body){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(JSON.parse(body));
            }
        });

    return deferred.promise;
}

function getRandomMultiverseId(robot) {
    var deferred = Q.defer();

    robot.http(urlMap.gathererRandom)
        .header('Accept', 'application/json')
        .get()(function(err, res){
            var location,
            multiverseId;

            if (err) {
                deferred.reject(err);
            } else {
                location = res.headers.location;
                multiverseId = location.split('=')[1];

                deferred.resolve(multiverseId);
            }
        });

    return deferred.promise;
}

function hasErrorCode(statusCode) {
    return _.find(responseErrorCodes, function (code) {
        return code === statusCode;
    });
}

module.exports = {
    getRandomMultiverseId: getRandomMultiverseId,
    getRandomCard: getRandomCard,
    hasErrorCode: hasErrorCode
};
