/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/
function merge(a, b) {
  let aIndex = 0;
  let bIndex = 0;
  const output = [];
  // console.log("a", a);
  // console.log("b", b);
  while (aIndex < a.length && bIndex < b.length) {
    if (a[aIndex] < b[bIndex]) {
      output.push(a[aIndex]);
      aIndex = aIndex + 1;
    } else {
      output.push(b[bIndex]);
      bIndex = bIndex + 1;
    }
  }

  while (bIndex < b.length) {
    output.push(b[bIndex]);
    bIndex = bIndex + 1;
  }
  while (aIndex < a.length) {
    output.push(a[aIndex]);
    aIndex = aIndex + 1;
  }
  // console.log("output", output);
  return output;
}

const mergeSort = (nums) => {
  if (nums.length < 2) {
    return nums;
  }
  const halfIndex = Math.ceil(nums.length / 2);
  // console.log("halfIndex", halfIndex);
  // console.log("nums", nums);

  return merge(
    mergeSort(nums.slice(0, halfIndex)),
    mergeSort(nums.slice(halfIndex))
  );
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
