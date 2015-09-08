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
[bot] gatherer find [search param1]=[search value1], [search param2]=[search value2] ...

Example:
examplebot gatherer find oracle=haste, color=red ...

```

Either way will return the image of the card, unless the data returned does not contain an image. Then it will return the rules text of the card. If an exact match is not found, it will display a list of matches. If no cards are found it will output an error.

### Possible Search Parameters

Name |	Type |	Description
---- | ----- | ------------
color      |string| Select cards of the chosen color
format       |string| Only show cards allowed in a specific format. Legal values are vintage, legacy, modern, standard, and commander
multicolor   |bool| Only show cards that are multicolored. Legal values are true and false
multiverseid |string| Select cards of that have at least one edition with the given Multiverse ID
name       |string| A fuzzy match on a card's name
oracle       |string| A fuzzy match on a card's Oracle rules text
rarity       |string| Select cards printed at this rarity. Options are common, uncommon, rare and mythic
set          |string| A three letter identifier for a Magic set
status       |string| Only show cards with the given status. Legal values are legal, banned or restricted
subtype      |string| Any valid card subtype. Possible values include zombie and tribal.
supertype  |string| Any valid card supertype, such as legendary
type	     |string|	Any valid card type. Possible values include enchantment and

## Getting a random card

Simply type:

```
[bot] gatherer random
```

It will return the image of the card, unless the data returned does not contain an image. Then it will return the rules text of the card. If an error occurs it will output the cause.

## Settle a dispute with clash!

Simply type:

```
Format:
[bot] gatherer clash [@handler]

Example:
examplebot gatherer clash @Matt
```

## Notes

* All cards that are retrieved will also be printed with a link to Wizards of the Coast's gatherer web service.
* The advanced find command requires that all search params be seperated by a comma. If they are not, it will output an error.

## Testing

To test this script interactively, run:

```
npm run shell
```
