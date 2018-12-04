const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const parseClaim = (line) => {
  const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
  const result = line.match(regex);

  return {
    id: parseInt(result[1]),
    x: parseInt(result[2]),
    y: parseInt(result[3]),
    w: parseInt(result[4]),
    h: parseInt(result[5])
  }
  //#1 @ 1,3: 4x4""
};


const calculate = (claims) => {
  const fabric = {};

  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];
    for (let x = claim.x; x < claim.w + claim.x; x++) {
      for (let y = claim.y; y < claim.h + claim.y; y++) {
        const cell = fabric[`${x},${y}`];

        if (!cell) {
          fabric[`${x},${y}`] = {value: 1, ids: [claim.id]}
        } else {
          fabric[`${x},${y}`] = {value: cell.value+1, ids: cell.ids.concat(claim.id)};
        }
      }
    }
  }

  return Object.values(fabric).map(v => v.value).filter(number => number > 1).length;

};


const claims = input.split("\n").map(parseClaim);
const answer= calculate(claims);
console.log({answer})