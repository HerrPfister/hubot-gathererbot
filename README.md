# gathererbot

A simple hubot that uses the [mtg-sdk](https://magicthegathering.io/) for Magic the Gathering cards.

## Searching for cards

**You can search for a specific card by name, like so:**

```
Format:
[bot] mtg find [card name]

Example
examplebot mtg find shatter
```

**Sample output:**

```
http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=185053&type=card
View it in the gatherer: http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=185053
```

**You can also search by a series of parameters, like so:**

```
Format:
[bot] mtg query [search param1]=[search value1] & [search param2]=[search value1],[search value2]|[search value3] ...

Example:
examplebot mtg query subTypes=elf&colors=g,r

Query:
search for all elf cards that are green OR green AND red

```

**Sample output:**

```
Bloodbraid Elf | {2}{R}{G} | Creature — Elf Berserker
Cylian Sunsinger | {1}{G} | Creature — Elf Shaman
Druid of the Anima | {1}{G} | Creature — Elf Druid
Godtracker of Jund | {1}{R}{G} | Creature — Elf Shaman
Knotvine Mystic | {R}{G}{W} | Creature — Elf Druid
View it in the gatherer: http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&subtype=%7C%5Belf%5D&color=%7C%5Bg%5D+%5Br%5D
```

__NOTE: To use an `OR` clause separate values with a `|`, to get an `AND` clause separate values with a `,`__
__NOTE: Colors use single letter representation: green = g, black = b, red = r, white = q, blue = u__

#### Possible Search Parameters

Name | Type  |	List? | Description
---- | ----- |  ----- | -----------
colors       |string| true|   Select cards with the chosen color.
cmc          |string| true|   Select cards with the chosen converted mana cost.
name         |string| false|  A fuzzy match on a card's name.
oracle       |string| false|  A fuzzy match on a card's Oracle rules text.
rarity       |string| false|  Select cards printed at this rarity. Options are common, uncommon, rare and mythic.
subTypes     |string| true|   Any valid card sub-type. such as zombie, goblin, and etc.
superTypes   |string| true|   Any valid card super-type, such as legendary, and etc.
types	     |string| true|   Any valid card type. such as enchantment, instant, and etc.

## Getting a random card

**Simply type:**

```
[bot] mtg random
```

**Sample output:**

```
http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=253653&type=card
View it in the gatherer: http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=253653
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

## Testing

To test this script interactively, run:

```
npm run shell
```
