const seedrandom = require('seedrandom');

/**
 * A deterministic random number generator to provide
 * randomness for other classes.
 */
module.exports = class RNG {
  constructor(seed) {
    this.seed = seed;
    this.random = seedrandom(this.seed);
  }
  /**
   * Provide a random integer between min and max, inclusive.
   * @param {number} min
   * @param {number} max
   * @returns {number} a random integer between min and max
   */
  getIntBetween(min = 0, max = 1) {
    return Math.floor(this.random() * (max - min + 1) + min);
  }
  /**
   * Return a random single item based on different probabilities
   * @param {*object[]|*[]} array of objects like  [ { weight: 5, item: 'Foo' } ], or any type if using a weight function
   * @param {string|function} weightProp - property to get the weight from, or a function that takes the item and returns a weight
   * @returns {*} a randomly chosen item with probability based on weight
   */
  pickFromWeighted(array, weightProp = 'weight') {
    const flat = [];
    array.forEach((item) => {
      let weight =
        typeof weightProp === 'function'
          ? weightProp(item)
          : item[weightProp] || 1;
      parseInt(weight);
      if (weight < 1 || Number.isNaN(weight)) {
        console.log('Invalid weight', weight, 'defaulting to 1');
        weight = 1;
      }
      for (let i = 0; i < weight; i += 1) {
        flat.push(item);
      }
    });
    return this.pickFrom(flat);
  }
  /**
   * Return a random single item from an array. Does not mutate
   * the array.
   * @param {*[]} array - an array of items
   * @returns {*} a randomly chosen item from the array
   */
  pickFrom(array) {
    return array[this.getIntBetween(0, array.length - 1)];
  }
  /**
   * Return an array of n items randomly picked from an array. Does
   * not mutate the array.
   * @param {*[]} array
   * @param {number} n - number of items to get
   * @returns an array of items randomly picked from the source
   */
  pickNFrom(array, n = 1) {
    if (n !== undefined && (typeof n !== 'number' || n <= 0 || n % 1 !== 0))
      throw new Error(`Invalid number of items ${n}.`);
    if (n >= array.length) return array; // in this case it's just the same items
    const items = [...array];
    const result = [];
    while (result.length < n) {
      result.push(items.splice(this.getIntBetween(0, items.length - 1), 1)[0]);
    }
    return result;
  }
  /**
   * Shuffle an array of items. Does not mutate provided array.
   * @param {*[]} items - items to shuffle
   * @returns {*[]} the shuffled items
   */
  shuffle(items) {
    const useItems = [...items];
    let currentIndex = useItems.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(this.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [useItems[currentIndex], useItems[randomIndex]] = [
        useItems[randomIndex],
        useItems[currentIndex],
      ];
    }
    return useItems;
  }
  /**
   * Reinitialize the random number generator with a new seed.
   * @param {*} seed
   */
  reseed(seed) {
    this.random = seedrandom(seed);
  }
};
