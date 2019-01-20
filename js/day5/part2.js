const fs = require("fs");
const R = require("ramda");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const calculate = s => {
  let i = 0;

  const letterCharCodes = R.range(65, 91);
  console.log(letterCharCodes.length);
  let minLength = 1000;

  for (let letterCharCode of letterCharCodes) {
    let lowerCaseLetter = String.fromCharCode(letterCharCode);
    let upperCaseLetter = String.fromCharCode(letterCharCode + 32);

    let input = s
      .replace(new RegExp(lowerCaseLetter, "g"), "")
      .replace(new RegExp(upperCaseLetter, "g"), "");

    while (i < input.length - 1) {
      let cur = input[i];
      let next = input[i + 1];
      let curChar = cur.charCodeAt(0);
      let nextChar = next.charCodeAt(0);
      if (Math.abs(curChar - nextChar) === 32) {
        input = input.slice(0, i) + input.slice(i + 2, input.length);
        i = 0;
      } else {
        i++;
      }
    }

    console.log({ letter: lowerCaseLetter, l: input.length });
    if (input.length < minLength) {
      minLength = inputLength;
    }
  }

  console.log({ minLength });
};

calculate(input);
