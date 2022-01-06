/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

function xgetDigit(number, place, longestNumber) {
  // number 1392
  // place 0
  // longestNumber 4
  // --> 2

  // number 1392
  // place 1
  // longestNumber 4
  // --> 9

  // number 1392
  // place 2
  // longestNumber 4
  // --> 3

  let factor = 1;
  for (let i = 0; i < place; i++) {
    factor = factor * 10;
  }
  // console.log('factor', factor)
  // console.log('longestNumber', longestNumber)
  // console.log('place', place)
  // console.log("factor", factor);

  const base = Math.floor(number / factor);
  // console.log('base', base)
  if (place - 1 === longestNumber) {
    return base;
  }
  return base % 10;
}

function getDigit(number, place, longestNumber) {
  const string = number.toString();
  const size = string.length;

  const mod = longestNumber - size;
  return string[place - mod] || 0;
}

function getLongestNumber(nums) {
  const max = nums.reduce((acc, curr) => {
    return acc > curr ? acc : curr;
  }, 0);
  // console.log('max', max)
  let divisor = 1000;
  let longestNumber = 4
  let factor = max / divisor;

  while (factor >= 10 || factor < 1) {
    // console.log('longestNumber', factor)
    if (factor > 10) {
      divisor = divisor * 10;
      factor = max / divisor;
      longestNumber = longestNumber + 1
    } else {
      divisor = divisor / 10;
      factor = max / divisor;
      longestNumber = longestNumber - 1
    }
  }
  return longestNumber

  // returns the number of radix for largest number
  // find the largest number
  // start with divide by 1000
  // if result is less than one, then to big - divide factor by 10
  // if result is greater than ten, then to small - muliply factor by 10
}

function radixSort(array) {
  // code goes here
  // find longest number
  const longestNumber = getLongestNumber(array);
  // console.log("buckets", JSON.stringify(buckets, null, 4));
  // console.log("longestNumber", longestNumber);

  // create how many buckets you need
  // an array of 10 arrays
  let buckets = new Array(10).fill().map(() => ([]));

  // for loop for how many iterations you need
  //   while loop
  //     enque the numbers into their buckets
  //
  //  for loop for each  bucket
  //  dequeue all of the items out of the bucket
  let output = array.slice()
  for (let i = 0; i < longestNumber; i++) {
    for (let j = 0; j < output.length; j++) {
      const number = output[j]
      const toBucket = getDigit(number, i, longestNumber)
      buckets[toBucket].push(number)
      // console.log(number, toBucket)
    }
    output = buckets.reduce((prev, curr) => prev.concat(curr), [])
    buckets = new Array(10).fill().map(() => ([]));
  }

  return output

  // array.forEach((item) => {
  //   console.log('item', item)
  //   console.log(getDigit(item, 0, getLongestNumber([item])))
  // })
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
