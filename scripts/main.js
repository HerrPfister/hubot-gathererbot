// Description:
//   A simple bot that can look up mtg cards
//
// Dependencies:
//   "<module name>": "<module version>"
//
// Commands:
//   hubot <trigger> - <what the respond trigger does>
//   <trigger> - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   <github username of the original script author>
module.exports = function (robot) {
  //For now let's just try to get some cards

  robot.respond(/gatherer\s+(.*)/i, function (res) {
    var cardName = res.match[1];

    robot.http('https://api.deckbrew.com/mtg/cards?name=' + cardName)
      .header('Accept', 'application/json')
      .get()(function(error, response, body) {
          if (error) {
            //TODO: respond with error message
          } else {
            var card = JSON.parse(body)[0];
            res.send(JSON.stringify(card));
          }
        });
  });
};
