// takes in a maze and outputs it to the console
// this logger requires your objects to be shaped like
// {
//  openedBy: number - represents who owns it, 0 meaning no one owns it yet
//                     1 means it's owned by point A and 2 means point B
//  closed: boolean  - if the node is an unpassable wall
// .length: number   - how far away the current node is from its origin
// }

const NO_ONE = 0;
const BY_A = 1;

module.exports = function logMaze(maze) {
  let toLog = [];
  // console.log("================");
  toLog.push("================");
  let header = "XX | ";
  let subheader = "-----";
  for (let i = 0; i < maze[0].length; i++) {
    const num = i >= 10 ? i : "0" + i;
    header += `${num} `;
    subheader += "---";
  }
  toLog.push(header);
  toLog.push(subheader);
  maze.forEach((row, i) => {
    const num = i >= 10 ? i : "0" + i;
    let buffer = `${num} | `;
    const colors = [];

    row.forEach((item) => {
      if (item.closed) {
        buffer += "XX ";
        colors.push("color: gray");
      } else if (item.openedBy === NO_ONE) {
        buffer += "•• ";
        colors.push("color: lightgray");
      } else {
        buffer += (item.length >= 10 ? item.length : "0" + item.length) + " ";
        colors.push(item.openedBy === BY_A ? "color: lime" : "color: hotpink");
      }
    });

    // console.log(buffer, ...colors);
    toLog = [...toLog, buffer];
    // console.log(buffer, ...colors);
  });
  console.log(toLog.join("\n", null, 4));
};
