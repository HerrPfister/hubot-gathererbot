// Description:
//   A simple bot that can look up mtg cards
//
// Commands:
//   hubot gatherer [card name] - queries the card service and returns the first card the query found
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   <github username of the original script author>

module.exports = function (robot) {
  robot.respond(/gatherer\s+(.*)/i, function (res) {
    var cardName = res.match[1];

    robot.http('https://api.deckbrew.com/mtg/cards?name=' + cardName)
      .header('Accept', 'application/json')
      .get()(function(error, response, body) {
          if (error) {
            // TODO: respond with error message
          } else {
            // For simplicity sake I am just grabbing the first card from the query,
            // and then using the image of the first print from the card's editions.
            // TODO: add in null checks
            var card = JSON.parse(body)[0];
            res.send(card.editions[0].image_url);
          }
        });

  });
};
