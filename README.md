# gathererbot

A simple hubot that queries the [deckbrew](https://deckbrew.com/api/) service for Magic the Gathering cards.

## Searching for cards

Simply type:

```
[bot] gatherer find [card name]
```

It will return the image of the card, unless the data returned does not contain an image. Then it will return the rules text of the card. If an exact match is not found, it will display a list of matches. If no cards are found it will output an error.

## Getting a random card

Simply type:

```
[bot] gatherer random
```

It will return the image of the card, unless the data returned does not contain an image. Then it will return the rules text of the card.

## Notes

* All cards that are retrieved will also be printed with a link to Wizards of the Coast's gatherer web service.

## Testing

To test this script interactively, run:

```
npm run shell
```
