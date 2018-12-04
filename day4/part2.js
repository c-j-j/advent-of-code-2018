const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const parseRecord = line => {
  const regex = /\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (.*)/;
  const result = line.match(regex);

  const date = {
    year: parseInt(result[1]),
    month: parseInt(result[2]),
    day: parseInt(result[3]),
    hour: parseInt(result[4]),
    min: parseInt(result[5])
  };

  return {
    date,
    text: result[6]
  };
};


const records = input
  .split("\n")
  .map(parseRecord)
  .sort(({ date: a }, { date: b }) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    if (a.day !== b.day) return a.day - b.day;
    if (a.hour !== b.hour) return a.hour - b.hour;
    if (a.min !== b.min) return a.min - b.min;

    return 1;
  });

const calculate = records => {
  let events = [];

  let currentId;
  for (let i = 0; i < records.length; i++) {
    let record = records[i];
    const result = record.text.match(/^Guard #(\d+)/);
    if (result) {
      currentId = result[1];
    }

    if (record.text === "falls asleep") {
      events.push({ id: currentId, event: "asleep", min: record.date.min });
    }

    if (record.text === "wakes up") {
      events.push({ id: currentId, event: "awake", min: record.date.min });
    }
  }

  let sleepCounts = {};
  let index = 0;

  while (index < events.length) {
    let id = events[index].id;
    let from = events[index].min;
    let to = events[index + 1].min;

    if (sleepCounts[id]) {
      sleepCounts[id] += to - from;
    } else {
      sleepCounts[id] = to - from;
    }

    index += 2;
  }

  let minutesAsleep = {};

  for (let i = 0; i < events.length; i += 2) {
    let from = events[i].min;
    let to = events[i + 1].min;

    for (let j = from; j < to; j++) {
      if (minutesAsleep[j] && minutesAsleep[j].length) {
        minutesAsleep[j] = minutesAsleep[j].concat(events[i].id);
      } else {
        minutesAsleep[j] = [events[i].id];
      }
    }
  }

  let maxSleeper = {
    min: 0,
    id: 0,
    max: 0
  };

  for (let minute of Object.keys(minutesAsleep)) {
    let something = {};
    let sleepers = minutesAsleep[minute];

    for (let sleeper of sleepers) {
      something[sleeper] = something[sleeper] ? something[sleeper] + 1 : 1;
    }

    for (let s of Object.keys(something)) {
      if (something[s] > maxSleeper.max) {
        maxSleeper = {
          min: minute,
          id: s,
          max: something[s]
        };
      }
    }
  }
  console.log({maxSleeper, answer: maxSleeper.min * maxSleeper.id})
};

const answer = calculate(records);
// console.log({answer})
