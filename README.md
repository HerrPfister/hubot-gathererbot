# gathererbot

A simple bot that queries the [deckbrew](https://deckbrew.com/api/) service for specific Magic the Gathering cards.

## Searching for cards

Simply type:

```
[bot] gatherer [card name]
```

It will return the image of the first card it matches. Unless, the data returned does not have an image. Then it will return the JSON representation of the card. If an exact match is not found, it will display a list of matches.

## Testing

To test this script interactively, run:

```
npm run shell
```
