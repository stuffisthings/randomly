const Deck = require('../components/deck');
const RNG = require('../components/rng');

test('can specify initial items and whether to shuffle them', () => {
    const items = ['cat', 'dog', 'mouse', 'lizard'];
    const deck = new Deck({ items });
    // deck should not mutate provided array
    expect(items).toEqual(['cat', 'dog', 'mouse', 'lizard']);
    expect(deck.items.length).toBe(4);
    expect(deck.items).toContain('dog');
    // if shuffle is turned off, should keep ordering
    const unshuffled = new Deck({ items, shuffle: false });
    expect(unshuffled.items).toEqual(items);
});

test('can shuffle the items', () => {
    const items = ['cat', 'dog', 'mouse', 'lizard'];
    const deck = new Deck({ items, shuffle: false, rng: new RNG(123) });
    expect(deck.items).toEqual(items);
    deck.shuffle();
    expect(deck.items).not.toEqual(items);
    expect(deck.items.length).toBe(4);
    expect(deck.items).toContain('dog');
});

test('can draw top card', () => {
    const items = ['cat', 'dog'];
    const deck = new Deck({ items });
    const firstDraw = deck.draw();
    expect(items).toContain(firstDraw);
    expect(deck.items).not.toContain(firstDraw);
    const secondDraw = deck.draw();
    expect(secondDraw).not.toBe(firstDraw);
    // should return undefined when deck is empty
    expect(deck.draw()).not.toBeDefined();
});


test('can draw a hand of cards', () => {
    const items = ['cat', 'dog', 'mouse', 'lizard'];
    const deck = new Deck({ items, shuffle: false });
    expect(deck.drawHand(3)).toEqual(['dog', 'mouse', 'lizard']);
    // should handle when hand is larger than remaining cards
    expect(deck.drawHand(5)).toEqual(['cat']);
    // should throw if hand size is invalid
    expect(() => { deck.drawHand('five') }).toThrow();
    expect(() => { deck.drawHand(-1) }).toThrow();
    expect(() => { deck.drawHand(0) }).toThrow();
});