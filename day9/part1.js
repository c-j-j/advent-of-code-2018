const R = require('ramda');

function insertToMarbles(marbles, marble, current) {
  const newIndex = (current + 2) % (marbles.length);

  if (newIndex === 0) {
    marbles.push(marble);
    return marbles.length - 1;
  } else {
    marbles.splice(newIndex, 0, marble);
    return newIndex;
  }
}

function getIndex7CCW(marbles, current) {
  const indexOfScore = current - 7;

  return indexOfScore < 0 ? marbles.length - Math.abs(indexOfScore) : indexOfScore;
}

const calculate = () => {
  let marbles = [0];
  let current = 0;
  let turn = 1;
  let players = [];
  for (let i = 0; i < 424; i++) {
    players[i] = 0;
  }

  while (turn < (71482)) {
    if ((turn % 23) === 0) {
      const indexOfScore = getIndex7CCW(marbles, current);
      players[turn % players.length] += turn + marbles[indexOfScore];

      marbles.splice(indexOfScore, 1);

      current = indexOfScore;
    } else {
      current= insertToMarbles(marbles, turn, current);
    }
    turn++;
  }

  console.log({players})
  console.log(Math.max(...players));

  // console.log(players)
};

//[7] 0 16  8 17  4 18 19  2 24 20(25)10 21  5 22 11  1 12  6 13  3 14  7 15
calculate();

// 0 1 2 3 4 5
//