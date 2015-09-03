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
            res.send('There was an issue with your request. Please try again later.');
          } else {
            // For simplicity sake I am just grabbing the first card from the query,
            // and then using the image of the first print from the card's editions.

            var card = JSON.parse(body)[0];

            if (card) {
              var cardImage = card.editions[0].image_url;

              // If the object has an image send that back. Otherwise, send back the raw JSON.
              res.send(cardImage || card);
            } else {
              res.send('We could not find the card ' + cardName + '. Please try again.');
            }
          }
        });

  });
};
