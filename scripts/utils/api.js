var Q = require('q');

var urlMap = require('../../static/consts').urlMap;

module.exports = {
  getRandomMultiverseId: function (robot) {
    var that = this;
    var deferred = Q.defer();

    robot.http(urlMap.gathererRandom)
      .header('Accept', 'application/json')
      .get()(function(err, res, body){
        if (err) {
          deferred.reject(err);
        } else {
          var location = res.headers.location;
          var multiverseId = location.split('=')[1];

          deferred.resolve(multiverseId);
        }
      });

    return deferred.promise;
  },

  getRandomCard: function (robot, multiverseId) {
    var deferred = Q.defer();

    robot.http(urlMap.deckBrewMultiverseId + multiverseId)
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
};
