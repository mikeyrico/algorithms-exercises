const breadthFirstTraverse = (queue, array) => {
  // recursive
  // if (!queue.length) return array;
  // const nextQueue = [];
  // for (let i = 0; i < queue.length; i++) {
  //   const target = queue[i];
  //   array.push(target.value);
  //   target.left && nextQueue.push(target.left);
  //   target.right && nextQueue.push(target.right);
  // }
  // return breadthFirstTraverse(nextQueue, array);

  // iterative solution
  let q = queue;
  while (q.length) {
    const target = q.shift();
    array.push(target.value);
    target.left && q.push(target.left);
    target.right && q.push(target.right);
  }
  return array;
};

// unit tests
// do not modify the below code
describe("breadth-first tree traversal", function () {
  const answer = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

  const tree = {
    value: "A",
    left: {
      value: "B",
      left: {
        value: "D",
        left: {
          value: "G",
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: "E",
        left: null,
        right: {
          value: "H",
          left: {
            value: "K",
            left: null,
            right: null,
          },
        },
      },
    },
    right: {
      value: "C",
      left: {
        value: "F",
        left: {
          value: "I",
          left: null,
          right: null,
        },
        right: {
          value: "J",
          left: null,
          right: null,
        },
      },
      right: null,
    },
  };

  test("breadthFirstTraverse", () => {
    expect(breadthFirstTraverse([tree], [])).toEqual(answer);
  });
});
