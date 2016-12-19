# gathererbot

A simple hubot that queries the [deckbrew](https://deckbrew.com/api/) service for Magic the Gathering cards.

## Searching for cards

**You can search by just the card's name, like so:**

```
Format:
[bot] mtg find [card name]

Example
examplebot mtg find shatter
```

**Sample output:**

```
https://image.deckbrew.com/mtg/multiverseid/83257.jpg
View in Gatherer: http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=83257
```

**You can also search by a series of parameters, like so:**

```
Format:
[bot] mtg find [search param1]=[search value1]; [search param2]=[search value2] ...

Example:
examplebot mtg find oracle="haste"

```

**Sample output:**

```
Displaying 5 out of 100 cards:
Accelerate | red | instant
"Ach! Hans, Run!" | green red | enchantment
Act of Aggression | red | instant
Act of Treason | red | sorcery
Aeon Chronicler | blue | creature - avatar
View in Gatherer: http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&text=+%5B%22haste%22%5D
```

**If you want to search by multiple values of a given parameter, you can do it like so:**

```
Format:
[bot] mtg find [search param1]=[search value1],[search value2] ...

Example:
examplebot mtg find color=red,green
```

**Sample output:**

```
Displaying 5 out of 19 cards:
Accelerate | red | instant
Act of Aggression | red | instant
Blind with Anger | red | instant - arcane
Cauldron Dance | black red | instant
Chaos Charm | red | instant
View in Gatherer: http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&type=+%5Binstant%5D&color=+%5BR%5D&color=+%5BG%5D&text=+%5Bhaste%5D
```

_**Note:** When you search this way the given parameter will equate to an **OR** clause. So the above would be "All cards that are red **OR** green"_

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
[bot] mtg random
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
[bot] mtg clash [@handler]

Example:
examplebot mtg clash @Matt
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
