# gathererbot

A simple bot that queries the [deckbrew](https://deckbrew.com/api/) service for specific cards.

## Searching for cards

Simply type:

```
[bot] gatherer [card name]
```

It will return the image of the first card it matches, unless the data returned does not have an image. Then it will return the JSON representation of the card.

## Testing

To test this script interactively, run:

```
npm run shell
```
