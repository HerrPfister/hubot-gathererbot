// Description:
//   A simple bot that queries the deckbrew service for specific cards.
//
// Commands:
//   hubot gatherer [card name] - queries the card service and returns the first card the query found
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   HerrPfister and wickerpopstar

module.exports = function (robot) {

  // As of right, now we are just capturing everything after the gatherer command.
  // However, later we can make it more customizable if we want.
  // i.e. getting subtypes, color, rarity, etc.
  robot.respond(/gatherer\s+(.*)/i, function (res) {

    // Grab the captured user's input
    var cardName = res.match[1];

    robot.http('https://api.deckbrew.com/mtg/cards?name=' + cardName)
      .header('Accept', 'application/json')
      .get()(function(error, response, body) {
          if (error) {
            res.send('There was an issue with your request. Please try again later.');
          } else {
            // For simplicity's sake I am just grabbing the first card from the query,
            // and then using the image from the first edition in that card's "editions" list.

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
