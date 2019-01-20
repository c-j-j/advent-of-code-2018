const fs = require("fs");

const r = fs.readFileSync(__dirname + "/input", "utf8");

const parseInstruction = text => {
  const regex = text.match(/([+-])(\d+)/);

  return {
    op: regex[1],
    value: parseInt(regex[2])
  };
};

let instructions = r.split("\n").map(parseInstruction);

const findRepeatingFreq = instructions => {
  let index = 0;
  let freqs = {};
  let freq = 0;

  while (true) {
    const { op, value } = instructions[index];
    freq = op === "+" ? freq + value : freq - value;
    if (freqs[freq]) {
      return freq;
    }
    freqs[freq] = true;

    if (index === instructions.length - 1) {
      index = 0;
    } else {
      index++;
    }
  }
};

const repeatingFreq = findRepeatingFreq(instructions);

console.log(repeatingFreq);
