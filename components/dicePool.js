const Die = require('./die');

/**
 * Simulates a pool of x n-sided die
 */
 module.exports = class DicePool {
    constructor(options = {}) {
        const { sides, number, rng } = options;
        this.dice = [];
        for (let i = 0; i < (number || 2); i += 1) {
            this.dice.push(new Die({ sides, rng }))
        }
    }
    get value() {
        return this.dice.reduce((total, die) => total + die.value, 0);
    }
    /**
     * Roll the dice pool, updating its value (and the value of each die).
     * @returns {number} the new total value
     */
    roll() {
        this.dice.forEach(die => die.roll());
        return this.value;
    }
    /**
     * Rolls the dice pool multiple times. Die's value will remain
     * that of the final roll.
     * @param {number} times 
     * @returns {number[]} array containing the total results of each roll
     */
     rollN(times = 1) {
        const results = [];
        while (results.length < times) {
            results.push(this.roll());
        }
        return results;
    }
}