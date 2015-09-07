# gathererbot

A simple hubot that queries the [deckbrew](https://deckbrew.com/api/) service for Magic the Gathering cards.

## Searching for cards

You can either search by the cards name, like so:

```
Format:
[bot] gatherer find [card name]

Example
examplebot gatherer find shatter
```

or you can search by a series of parameters, like so:

```
Format:
[bot] gatherer find [search param1]=[search value1] [search param2]=[search value2] ...

Example:
examplebot gatherer find name=shatter color=red ...

```

Either way will return the image of the card, unless the data returned does not contain an image. Then it will return the rules text of the card. If an exact match is not found, it will display a list of matches. If no cards are found it will output an error.

## Getting a random card

Simply type:

```
[bot] gatherer random
```

It will return the image of the card, unless the data returned does not contain an image. Then it will return the rules text of the card.

## Settle disputes with clash!

Simply type:

```
Format:
[bot] gatherer clash [@handler]

Example:
examplebot gatherer clash @Matt
```

## Notes

* All cards that are retrieved will also be printed with a link to Wizards of the Coast's gatherer web service.

## Testing

To test this script interactively, run:

```
npm run shell
```
