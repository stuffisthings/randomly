const RNG = require('../components/rng');

test('generates random numbers deterministically', () => {
    const rng = new RNG(123);
    expect(rng.random()).toBe(0.047035554534303387);
});

test('generates random integers with min and max', () => {
    const rng = new RNG();
    expect(rng.getIntBetween(1,10)).toBeGreaterThanOrEqual(1);
    expect(rng.getIntBetween(1,10)).toBeLessThanOrEqual(10);
    // Should be an integer
    expect(rng.getIntBetween(1,10) % 1).toBe(0);
    // Providing same min and max should give the same number
    expect(rng.getIntBetween(1,1)).toBe(1);
})

test('shuffles an array of items', () => {
    const rng = new RNG('random');
    const items = ['a','b','c','d'];
    expect(rng.shuffle([1,2,3])).toEqual([1,3,2]);
    expect(rng.shuffle(items)).toEqual(['b','a','d','c']);
    // should not mutate provided array
    expect(items).toEqual(['a','b','c','d']);
});

test('picks a random item from an array', () => {
    const rng = new RNG();
    const items = ['a','b','c','d'];
    expect(items).toContain(rng.pickFrom(items));
    // should not mutate provided array
    expect(items).toEqual(['a','b','c','d']);
});

test('picks multiple random item from an array', () => {
    const rng = new RNG(123);
    const items = ['a','b','c','d'];
    const result = rng.pickNFrom(items, 3);
    expect(result).toEqual(['a','d','c']);
    // should not mutate provided array
    expect(items).toEqual(['a','b','c','d']);
    // should return the array if n is longer than items
    expect(rng.pickNFrom(items, 10)).toEqual(['a','b','c','d']);
    expect(rng.pickNFrom(items, 4)).toEqual(['a','b','c','d']);
    // should throw if n is invalid
    expect(() => {rng.pickNFrom(items, -1)}).toThrow();
    expect(() => {rng.pickNFrom(items, 0)}).toThrow();
    expect(() => {rng.pickNFrom(items, 0.5)}).toThrow();
    expect(() => {rng.pickNFrom(items, 'all')}).toThrow();
});

test('can be reseeded with new seed', () => {
    const rng = new RNG('random');
    rng.reseed('morerandom');
    expect(rng.random()).toBeDefined();
});