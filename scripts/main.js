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
  robot.respond(/gatherer\s*(.*)/i, function (res) {
    //TODO: Use node's http or some other means to make the call to deckbrew
    //TODO: respond with the cards that were found
  });
};
