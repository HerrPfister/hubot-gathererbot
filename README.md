# gathererbot

A simple hubot that queries the [deckbrew](https://deckbrew.com/api/) service for Magic the Gathering cards.

## Searching for cards

**You can search by just the cards name, like so:**

```
Format:
[bot] gatherer find [card name]

Example
examplebot gatherer find shatter
```

**Sample output:**

```
https://image.deckbrew.com/mtg/multiverseid/83257.jpg
View in Gatherer: http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=83257
```

**You can also search by a series of parameters, like so:**

```
Format:
[bot] gatherer find [search param1]=[search value1], [search param2]=[search value2] ...

Example:
examplebot gatherer find oracle=intimidate, color=red ...

```
**Sample output:**

```
Displaying 5 out of 7 cards:
Academy Raider
Akroan Line Breaker
Bladetusk Boar
Cyclops Tyrant
Heirs of Stromkirk
```

#### Possible Search Parameters

Name |	Type |	Description
---- | ----- | ------------
color      |string| Select cards with the chosen color.
format       |string| Only show cards allowed in a specific format. Legal values are vintage, legacy, modern, standard, and commander
multicolor   |bool| Only show cards that are multicolored. Legal values are true and false.
multiverseid |string| Select cards that have at least one edition with the given Multiverse ID.
name       |string| A fuzzy match on a card's name.
oracle       |string| A fuzzy match on a card's Oracle rules text.
rarity       |string| Select cards printed at this rarity. Options are common, uncommon, rare and mythic.
set          |string| A three letter identifier for a Magic set, such as "ZEN" for the send Zendikar set.
status       |string| Only show cards with the given status. Legal values are legal, banned or restricted.
subtype      |string| Any valid card subtype. Possible values include zombie, goblin, or other tribal subtypes.
supertype  |string| Any valid card supertype, such as legendary.
type	     |string|	Any valid card type. Possible options include enchantment, instant, sorcery, creature, and artifact.

## Getting a random card

**Simply type:**

```
[bot] gatherer random
```

**Sample output:**

```
https://image.deckbrew.com/mtg/multiverseid/34244.jpg
View in Gatherer: http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=34244
```

## Settle a dispute with clash!

**Simply type:**

```
Format:
[bot] gatherer clash [@handler]

Example:
examplebot gatherer clash @Matt
```
**Sample output with a winner:**

```
@patrick challenges @matt to a mtg clash!
@patrick drew Wind Dancer, which has a converted mana cost of 2.
@matt drew Butcher of Malakir, which has a converted mana cost of 7.
Clash resolved! @matt is the winner!
```
**Sample output when there is a tie:**

```
@patrick challenges @matt to a mtg clash!
@patrick drew Mountain, which has a converted mana cost of 0.
@matt drew Island, which has a converted mana cost of 0.
It's a draw!
```

## Notes

* All cards that are retrieved will also be printed with a link to Wizards of the Coast's gatherer web service.
* The advanced find command requires that all search params be separated by a comma. If they are not, it will output an error.

## Testing

To test this script interactively, run:

```
npm run shell
```
