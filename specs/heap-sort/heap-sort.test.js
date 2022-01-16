/*
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  You will probably need at least two more functions: heapify and createMaxHeap
*/

const heapSort = (array) => {
  // code
  // loof over array
  // move first index to end of array
  // heapify on index 0

  // console.log("heapify(array, index)", heapify(array, 0));
  // console.log("array", array);
  createMaxHeap(array);

  for (let i = 0; i < array.length - 2; i++) {
    const endIndex = array.length - 1 - i;
    console.log("endIndex", endIndex);
    let temp = array[endIndex];
    array[endIndex] = array[0];
    array[0] = temp;
    console.log("next", array);
    heapify(array, 0, array.length - i - 1);
    console.log("afterHeap", array);
  }

  console.log("done", array);
  return array;
};

const createMaxHeap = (array) => {
  // code
  // loop through half of the array
  // call heapSort on each index moving backward

  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, i);
  }

  console.log("maxHeap", array);
};

const leftI = (i) => 2 * i + 1;
const rightI = (i) => 2 * i + 2;

const heapify = (array, index, heapSize = array.length) => {
  // console.log("heapSize", heapSize);
  // heapSize is the total number of elements in the heap?
  // iterate from index to heapSize - 1
  // while swithces are made

  let leftIndex = leftI(index);
  let rightIndex = rightI(index);
  let left = array[leftIndex];
  let right = array[rightIndex];
  let target = array[index];

  console.log(
    leftIndex,
    " / ",
    left,
    " --- ",
    rightIndex,
    " / ",
    right,
    " ---- ",
    heapSize
  );
  // need to get the max
  if (leftIndex < heapSize && left > right && left > target) {
    temp = array[leftIndex];
    array[leftIndex] = array[index];
    array[index] = temp;
    heapify(array, leftIndex, heapSize);
  }
  if (rightIndex < heapSize && right > left && right > target) {
    temp = array[rightIndex];
    array[rightIndex] = array[index];
    array[index] = temp;
    heapify(array, rightIndex, heapSize);
  }
};

// unit tests
// do not modify the below code
test("heap sort", function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
