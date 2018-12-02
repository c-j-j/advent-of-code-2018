const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const parseInstruction = text => {
  const regex = text.match(/([+-])(\d+)/);

  return {
    op: regex[1],
    value: parseInt(regex[2])
  };
};

const result = input
  .split("\n")
  .map(parseInstruction)
  .reduce((acc, { op, value }) => (op === "+" ? acc + value : acc - value), 0);

console.log({ result });
