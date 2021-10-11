
const RNG = require('./components/rng');
const Die = require('./components/die');
const DicePool = require('./components/dicePool');
const Deck = require('./components/deck');

/**
 * This class provides all the RNG methods and acts as a factory for
 * Dice, Decks, etc. using the same deterministic PRNG and seed. This
 * keeps them deterministic without the consumer needing to worry 
 * about keeping a shared determinstic RNG available whenever a
 * component is used.
 */
 class Randomly extends RNG {
    createDie(options = {}) {
        return new Die({rng: this, ...options});
    }
    createDicePool(options = {}) {
        return new DicePool({rng: this, ...options});
    }
    createDeck(options = {}) {
        return new Deck({rng: this, ...options});
    }
}
module.exports = {
    Randomly,
    RNG,
    Die,
    DicePool,
    Deck,
    default: Randomly
};