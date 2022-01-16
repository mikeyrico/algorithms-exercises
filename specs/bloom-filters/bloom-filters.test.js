// here are your hashing functions. it's not essential you know how they work
// a library called xxhashjs is being loaded (as XXH) and we're using three different
// instances of that as your hashing functions
const XXH = require("xxhashjs");
const h1 = (string) =>
  Math.abs(XXH.h32(0xabcd).update(string).digest().toNumber() % 100);
const h2 = (string) =>
  Math.abs(XXH.h32(0x1234).update(string).digest().toNumber() % 100);
const h3 = (string) =>
  Math.abs(XXH.h32(0x6789).update(string).digest().toNumber() % 100);

// fill out these two methods
// `add` adds a string to the bloom filter and returns void (nothing, undefined)
// `contains` takes a string and tells you if a string is maybe in the bloom filter

// rico: important to understand the `contains` test, to tell if an item is maybe in the filter then all hashes must be 1
class BloomFilter {
  constructor() {
    this._array = new Array(100).fill(0);
  }
  add(string) {
    this.updateFilter(this.hashes(string));
  }
  contains(string) {
    return this.hashes(string).reduce((acc, hash) => {
      return acc && this._array[hash] === 1;
    }, true);
  }
  updateFilter(hashes) {
    hashes.forEach((hash) => {
      this._array[hash] = 1;
    });
  }
  hashes(string) {
    return [h1(string), h2(string), h3(string)];
  }
}

// unit tests
// do not modify the below code
describe("BloomFilter", function () {
  let bf;
  beforeEach(() => {
    bf = new BloomFilter();
  });
  test("returns false when empty", () => {
    expect(bf.contains("Brian")).toBe(false);
    expect(bf.contains("Sarah")).toBe(false);
    expect(bf.contains("Simona")).toBe(false);
  });
  test("handles one item", () => {
    expect(bf.contains("Brian")).toBe(false);
    bf.add("Brian");
    expect(bf.contains("Brian")).toBe(true);
    expect(bf.contains("Sarah")).toBe(false);
    expect(bf.contains("Simona")).toBe(false);
  });
  test("handles many items", () => {
    const names = [
      "Brian",
      "Simona",
      "Sarah",
      "Asim",
      "John",
      "Sean",
      "Jessie",
      "Paige",
      "Ashley",
    ];
    names.forEach((item) => bf.add(item));
    names.forEach((item) => expect(bf.contains(item)).toBe(true));
    ["Sam", "Chris", "Taylor", "Florence"].forEach((item) =>
      expect(bf.contains(item)).toBe(false)
    );
  });
});
