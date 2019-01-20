const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const calculate = input => {
  let i = 0;

  while(i < input.length - 1) {
    let cur = input[i];
    let next = input[i+1];
    let curChar = cur.charCodeAt(0);
    let nextChar = next.charCodeAt(0);
    if (Math.abs(curChar - nextChar) === 32) {
      input = input.slice(0, i) + input.slice(i+2, input.length);
      i = 0;
    } else {
      i++;
    }
  }
  console.log({input, l: input.length})
};

calculate(input);
