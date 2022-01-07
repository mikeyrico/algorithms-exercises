/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

function getDigit(number, place, longestNumber) {
  const numString = Number(number).toString(10);
  const diff = longestNumber - numString.length;
  const zeros = new Array(diff).fill().map(() => "0");
  const digit = [...zeros, ...numString][place];

  // console.log([
  //   `number: ${number}`,
  //   `place: ${place}`,
  //   `longestNumber: ${longestNumber}`,
  //   `digit: ${digit}`,
  // ].join('\n'))
  return +digit; // coerce to number
}

function getLongestNumber(nums) {
  const max = nums.reduce((acc, curr) => {
    return curr > acc ? curr : acc;
  }, 0);
  const longestNumber = max.toString(10).length;
  // console.log('longestNumber', longestNumber)
  return longestNumber;
}

function radixSort(array) {
  // code goes here
  // find longest number
  const longestNumber = getLongestNumber(array);
  const buckets = new Array(10).fill().map(() => []);

  // create how many buckets you need
  // an array of 10 arrays

  for (let i = longestNumber - 1; i >= 0; i--) {
    while (array.length) {
      const number = array.shift();
      const digit = getDigit(number, i, longestNumber);
      buckets[digit].push(number);
    }

    for (let j = 0; j < 10; j++) {
      let bucket = buckets[j];
      while (bucket.length) {
        array.push(bucket.shift());
      }
    }
  }

  return array;
  // for loop for how many iterations you need
  //   while loop
  //     enque the numbers into their buckets
  //
  //  for loop for each  bucket
  //  dequeue all of the items out of the bucket
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
