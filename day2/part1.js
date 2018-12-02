const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const checksum = ids => {
  let totalTwos = 0;
  let totalThrees = 0;

  for (let id of ids) {
    const countForId = id
      .split("")
      .reduce((acc, next) => {
        acc[next] = acc[next]  ? acc[next] + 1 : 1;
        return acc;
      }, {});

    const twos = Object.values(countForId).find(v => v === 2);
    const threes = Object.values(countForId).find(v => v === 3);
    totalTwos += twos ? 1 : 0;
    totalThrees += threes ? 1 : 0;
  }

  return totalTwos * totalThrees;
};

const ids = input.split("\n");

const r = checksum(ids);
console.log({ r });
