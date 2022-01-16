// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");

function getNeighbors(maze, { x, y }) {
  const neighbors = [];
  // left x - 1, y
  if (x - 1 >= 0 && !maze[y][x - 1].closed) {
    neighbors.push(maze[y][x - 1]);
  }

  // right x + 1, y
  if (x + 1 < maze[0].length && !maze[y][x + 1].closed) {
    neighbors.push(maze[y][x + 1]);
  }
  // up x, y - 1

  if (y - 1 >= 0 && !maze[y - 1][x].closed) {
    neighbors.push(maze[y - 1][x]);
  }
  // down x, y + 1

  if (y + 1 < maze.length && !maze[y + 1][x].closed) {
    neighbors.push(maze[y + 1][x]);
  }

  return neighbors;
  // y bound is maze.length
  // x bound is maze[0].length
  // check if in bounds and not closed
}

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  const BY_A = "BY_A";
  const BY_B = "BY_B";
  const NO_ONE = 0;
  const model = maze.map((row, y) =>
    row.map((kind, x) => ({
      x,
      y,
      visitedBy: NO_ONE,
      length: 0,
      closed: kind === 1,
    }))
  );

  model[yA][xA].visitedBy = BY_A;
  model[yB][xB].visitedBy = BY_B;
  // create model board
  // loop over maze
  // create nodes that look like { visitedBy, closed, length }
  // set A set B

  let aQ = [model[yA][xA]];
  let bQ = [model[yB][xB]];
  let iteration = 0;

  while (aQ.length && bQ.length) {
    iteration = iteration + 1;
    const aNeighbors = aQ.reduce((acc, elt) => {
      return [...acc, ...getNeighbors(model, elt)];
    }, []);
    aQ = [];

    for (let i = 0; i < aNeighbors.length; i++) {
      let bor = aNeighbors[i];
      if (bor.visitedBy === BY_B) {
        return bor.length + iteration;
      } else if (bor.visitedBy === NO_ONE) {
        bor.visitedBy = BY_A;
        bor.length = iteration;
        aQ.push(bor);
      }
    }

    const bNeighbors = bQ.reduce((acc, elt) => {
      return [...acc, ...getNeighbors(model, elt)];
    }, []);
    bQ = [];
    for (let i = 0; i < bNeighbors.length; i++) {
      let bor = bNeighbors[i];
      if (bor.visitedBy === BY_A) {
        return bor.length + iteration;
      } else if (bor.visitedBy === NO_ONE) {
        bor.visitedBy = BY_B;
        bor.length = iteration;
        bQ.push(bor);
      }
    }
  }

  return -1;
  // use 2 queues A & B
  // start at a, then alternate to b on each iteration
  // iteration is the depth, and indicates the length at that depth
  // for each node, get its neightbors
  // getNeightbors helper
  // for each neighbor, check if you have found by the alternate
  // otherwise add the length and visted by, and push to appropriate queue
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0],
  ];
  it("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2],
  ];
  it("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  it("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ];
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2],
  ];
  it("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
