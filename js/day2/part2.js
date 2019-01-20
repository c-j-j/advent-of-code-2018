const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const areCommonByOne = (idA, idB) => {
  const lettersA = idA.split("");
  const lettersB = idB.split("");

  let numberOut = 0;
  for (let i = 0; i < lettersA.length; i++) {
    if (lettersA[i] !== lettersB[i]) {
      numberOut++;
    }
  }
  return numberOut === 1;
};

const findSubString = (idA, idB) => {
  const lettersA = idA.split("");
  const lettersB = idB.split("");

  for (let i = 0; i < lettersA.length; i++) {
    if (lettersA[i] !== lettersB[i]) {
      return lettersA
        .slice(0, i)
        .concat(lettersA.slice(i + 1, lettersA.length))
        .join("");
    }
  }
};

const findCommonIds = ids => {
  for (let i = 0; i < ids.length; i++) {
    const idA = ids[i];
    for (let j = i; j < ids.length; j++) {
      const idB = ids[j];

      if (areCommonByOne(idA, idB)) {
        return findSubString(idA, idB);
      }
    }
  }
};

const ids = input.split("\n");

const r = findCommonIds(ids);
console.log({ r });
