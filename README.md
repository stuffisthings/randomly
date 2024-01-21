# Randomly

Randomly is a set of optionally deterministic random number utilities for games and other practical randomization needs.

Deterministic behavior is often useful in these settings, not only for testing but e.g. to prevent "save scumming" or for sharing procedural generation seeds.

## RNG

RNG is the core module. Initialize with:

```
import { RNG } from 'random-ly';

const rng = new RNG(seed);
rng.random(); // seedrandom rng
rng.getIntBetween(1,100);
```

### Working with arrays

Get a random item or items from an array (non destructively):

```
rng.pickFrom(['dog','cat','moose']);
rng.pickNFrom(['dog','cat','moose'], 2);
```

Shuffle an array (non destructive, returns the shuffled array):

```
rng.shuffle(['dog','cat','moose']);
```

Get a random item with a weighted distribution where each item is an object with a property representing its weight (defaults to `weight`).

```
rng.pickFromWeighted([{ animal: 'dog', weight: 10 }, { animal: 'cat', weight: 10 }, { animal: 'ferret', weight: 1 } ]);
rng.pickFromWeighted([{ animal: 'dog', chance: 10 }, { animal: 'cat', chance: 10 }, { animal: 'ferret', chance: 1 } ], 'chance');
```

You can also pass a function as the second argument that takes the item and returns a weight, in this case items need not be objects.

```
rng.pickFromWeighted(['dog','moose','capybara'], (item) => item.length);
```

## Die

Simulates an n-sided die.

```
const d8 = new Die({ sides: 8, initialValue: 4 });
d8.value; // 4
d8.roll() // returns rolled value
d8.value; // stores the last-rolled value
```

## DicePool

Simulates a pool of x n-sided dice.

```
const pool4d12 = new DicePool({ sides: 12, number: 4 });
pool4d12.roll(); // returns the total value of all rolled dice
pool4d12.dice[0].value; // to get the value of an individual die
pool4d12.dice[3].roll(); // (re)roll a single die in the pool
```

## Deck

Simulates a deck of cards (which can be anything, e.g. objects).

```
const deck = new Deck({ items: [ 'dog', 'cat', 'mouse', 'lizard' ]});
deck.shuffle();
deck.draw(); // draw the top card (it is removed from the deck)
deck.drawHand(3); // draw the top 3 cards (they are removed from the deck)
deck.shuffleInItem('monkey', 2); // shuffle an item randomly into the deck, second arg ensures it is at least x cards down
deck.shuffleInItems(['fish', 'hamster'], 2); // shuffle in multiple items
deck.items; // is just an array with all normal methods available
```

## Randomly

The default import provides all the same functionality as RNG, plus some factory methods for producing die, decks, etc. with the same underlying RNG. This makes it easier to keep everything deterministic.

```
import Randomly from 'randomly';
Randomly.getIntBetween(1,5); // works like RNG
Randomly.createDie({ sides: 5 }); // returns new Die with same RNG
Randomly.createDicePool({ sides: 6, number: 4 }); // returns new DicePool
Randomly.createDeck({ items: ['foo', 'bar']}); // returns new Deck
```
