const Die = require('../components/die');
const RNG = require('../components/rng');

test('can generate random numbers', () => {
    const rng = new RNG(123);
    const die = new Die({ rng });
    expect(die.RNG.random()).toBe(0.848563925739746);
    // generates its own RNG if one is not provided
    const dieB = new Die();
    expect(dieB.RNG.random()).toBeDefined();
});

test('can have any number of sides', () => {
    const d10 = new Die({ sides: 10 });
    expect (d10.sides).toBe(10);
    const d6 = new Die();
    // defaults to 6
    expect(d6.sides).toBe(6);
    // should throw if sides is not a number
    expect(() => { new Die({ sides: 'lots'}) }).toThrow();
    // should throw if sides is negative
    expect(() => { new Die({ sides: -1 }) }).toThrow();
    // should throw if sides are fractional
    expect(() => { new Die({ sides: 0.33 }) }).toThrow();
});

test('can set an initial value', () => {
    const die = new Die({ initialValue: 3 });
    expect(die.value).toBe(3);
    // generates a random one if not specified
    const dieRandom = new Die();
    expect(dieRandom.sides).toBeLessThanOrEqual(dieRandom.sides);
    // should throw if intialvalue is invalid
    expect(() => { new Die({initialValue: 100})}).toThrow();
    expect(() => { new Die({initialValue: -1})}).toThrow();
    expect(() => { new Die({initialValue: 0.1})}).toThrow();
    expect(() => { new Die({initialValue: 'four'})}).toThrow();
});

test('can roll the die', () => {
    const die = new Die();
    expect(die.roll()).toBeGreaterThan(0);
    expect(die.roll()).toBeLessThanOrEqual(die.sides);
    // value should be set by rolling
    const roll = die.roll();
    expect(die.value).toEqual(roll);
});

test('can roll the die multiple times', () => {
    const die = new Die();
    expect(die.rollN(3).length).toBe(3);
    // value should match last result
    const results = die.rollN(10);
    expect(die.value).toBe(results[9]);
});