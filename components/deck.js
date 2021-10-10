const RNG = require('./rng');

/**
 * Simulates a deck of "cards" (JS primitives)
 */
 module.exports = class Deck {
    constructor(options = {}) {
        const { items, shuffle, rng } = options;
        this.RNG = rng || new RNG();
        this.items = [...items] || [];
        if (shuffle !== false) this.items = this.RNG.shuffle(items);
    }
    /**
     * Shuffle the items in place.
     * @returns {*[]} the shuffled items
     */
    shuffle() {
        this.items = this.RNG.shuffle(this.items);
    }
    /**
     * Inserts the new item at a random position in the deck.
     * @param {*} item - the item to insert
     * @param {number} max - the highest position the item should appear. 0 adds to bottom of the deck.
     */
    shuffleInItem(item, max) {
        const index = this.RNG.getNumberBetween(0, max || this.items.length);
        this.items.splice(index, 0, item);
    }
    /**
     * Inserts multiple items into random positions in the deck.
     * @param {*[]} items - array of items to insert
     * @param {*} max - the highest position any item should appear. 0 adds to bottom of the deck.
     */
    shuffleInItems(items, max) {
        items.forEach(item => this.shuffleInItem(item, max));
    }
    /**
     * Draw the top card. The item is returned and removed from the deck.
     * @returns {*} the item on top of the deck
     */
    draw() {
        return this.items.pop();
    }
    /**
     * Draw a "hand" of items from the top of the deck. The items are returned
     * and removed from the deck.
     * @param {number} cards - number of cards to draw
     * @returns {*[]} the hand of items drawn
     */
    drawHand(cards = 1) {
        if (cards !== undefined && (
            typeof cards !== 'number'
            || cards < 1
            || cards % 1 !== 0   
        )) throw new Error(`Cannot draw ${cards} cards (invalid amount)`);
        const index = this.items.length - cards;
        return this.items.splice(index < 0 ? 0 : index, cards);
    }
}