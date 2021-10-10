const RNG = require('./rng');

/**
 * Simulates a single n-sided die.
 */
 module.exports = class Die {
    constructor(options = {}) {
        const { sides, rng, initialValue } = options;
        this.RNG = rng || new RNG();
        if (sides !== undefined && (
            typeof sides !== 'number'
            || sides < 1
            || sides % 1 !== 0
        )) throw new Error(`Invalid amount of sides ${sides}`);
        this.sides = sides || 6;
        if (initialValue !== undefined && 
            (typeof initialValue !== 'number'
            || initialValue < 1
            || initialValue > this.sides
            || initialValue % 1 !== 0)
        ) throw new Error(`Invalid initialValue ${initialValue} for ${this.sides}-sided Die`);
        this.value = initialValue || this.RNG.getIntBetween(1, this.sides);
    }
    /**
     * Roll the die, updating its value.
     * @returns {number} the new value
     */
    roll() {
        this.value = this.RNG.getIntBetween(1, this.sides);
        return this.value;
    }
    /**
     * Rolls the die multiple times. Die's value will remain
     * that of the final roll.
     * @param {number} times 
     * @returns {number[]} array containing the results of each roll
     */
    rollN(times = 1) {
        const results = [];
        while (results.length < times) {
            results.push(this.roll());
        }
        return results;
    }
}