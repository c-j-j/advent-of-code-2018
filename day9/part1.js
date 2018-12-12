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

const calculateSlow = () => {
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
};

class Node {
  constructor(marble) {
    this.marble = marble;
  }

  insert(marble) {
    const oldNext = this.next;
    const newMarble = new Node(marble);
    this.next = newMarble;

    if (this.prev === this) {
      this.prev = newMarble;
    }

    this.next.next = oldNext;
    this.next.prev = this;
    this.next.next.prev = newMarble;
    return newMarble;
  }

  remove() {
    const oldNext = this.next;
    const oldPrev = this.prev;
    this.prev.next = oldNext;
    this.next.prev = oldPrev;
  }
}

const calculate = () => {
  let first = new Node(0);
  first.next = first;
  first.prev = first;

  let current = first;
  let turn = 1;
  let players = [];
  for (let i = 0; i < 424; i++) {
    players[i] = 0;
  }

  while (turn < (71482 * 100)) {
    if (turn % 23 === 0) {
      const seventhMarbleBefore = current.prev.prev.prev.prev.prev.prev.prev;
      players[turn % players.length] += turn + seventhMarbleBefore.marble;

      current = seventhMarbleBefore.next;
      seventhMarbleBefore.remove();
    } else {
      current = current.next.insert(turn);
    }
    turn++;
  }


  console.log("***********")
  console.log({players})
  console.log(Math.max(...players));

};
calculate();