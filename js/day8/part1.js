const R = require('ramda');
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const calculate = (tokens) => {
  const childCount = tokens.shift();
  const metadataCount = tokens.shift();

  let totalForChild = 0;

  for (let i = 0; i < childCount; i++) {
    totalForChild += calculate(tokens);
  }

  for (let i = 0; i < metadataCount; i++) {
    const metadataNumber = tokens.shift();
    console.log({metadataNumber});
    totalForChild += metadataNumber;
  }

  return totalForChild;
};

const answer = calculate(input.split(' ').map(Number));
console.log({answer})