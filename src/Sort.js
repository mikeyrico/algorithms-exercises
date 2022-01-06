import React from "react";
import { shuffle, range } from "lodash";
import { App, snapshot, done, clear } from "./sort-visualizer";

import "./sort.css";

function sort(array) {
  // do cool stuff here

  // call snapshot any time you do anything to the array
  // it's okay if you call it with duplicate value array,
  // it will deduplicate for you
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let j = 1; j < array.length; j++) {
      let shouldSwap = array[j + 1] < array[j];
      if (shouldSwap) {
        const temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
        swapped = true;
      }
      snapshot(array);
    }
  }
  return array;
}

export default function SortComponent() {
  clear();
  sort(shuffle(range(10)));
  done();
  return <App />;
}
