const DicePool = require('../components/dicePool');
const Die = require('../components/die');

test('can specify sides and number of dice', () => {
    // defaults to 2d6
    const defaultPool = new DicePool();
    expect(defaultPool.dice[0]).toBeInstanceOf(Die);
    expect(defaultPool.dice.length).toBe(2);
    expect(defaultPool.dice[0].sides).toBe(6);
    // should be able to set number and type of dice
    const pool = new DicePool({ sides: 10, number: 5 });
    expect(pool.dice.length).toBe(5);
    expect(pool.dice[0].sides).toBe(10);
});

test('can roll and get total', () => {
    const d10pool = new DicePool({ sides: 10, number: 5 });
    expect(d10pool.roll()).toBeGreaterThanOrEqual(5);
    expect(d10pool.roll()).toBeLessThanOrEqual(50);
    // total should match result
    const result = d10pool.roll();
    expect(d10pool.value).toBe(result);
    // component die should match total
    const pool = new DicePool();
    pool.roll();
    expect(pool.dice[0].value + pool.dice[1].value).toBe(pool.value);
});

test('can roll multiple times', () => {
    const pool = new DicePool();
    expect(pool.rollN(10).length).toBe(10);
    // value should match final result
    const results = pool.rollN(20);
    expect(pool.value).toBe(results[19]);
});