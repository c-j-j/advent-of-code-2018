const R = require("ramda");
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

class Point {
  constructor(px, py, vx, vy) {
    this.px = px;
    this.py = py;
    this.vx = vx;
    this.vy = vy;
  }

  update() {
    this.px += this.vx;
    this.py += this.vy;
  }
}

const parse = line => {
  const regexMatch = line.match(
    /position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/
  );

  const [px, py, vx, vy] = regexMatch.slice(1).map(Number);
  return new Point(px, py, vx, vy);
};

const render = points => {
  let prevDifference = 100000000000000;
  for (let i = 0; i < 100000; i++) {
    const pxs = points.map(p => p.px);
    const pys = points.map(p => p.py);
    const minX = Math.min(...pxs);
    const maxX = Math.max(...pxs);
    const minY = Math.min(...pys);
    const maxY = Math.max(...pys);

    if (Math.abs(minY - maxY) < 19) {
      for (let y = minY-1; y < maxY+1; y++) {
        for (let x = minX-1; x < maxX+1; x++) {
          if (points.find(p => p.py === y && p.px === x)) {
            process.stdout.write("#");
          } else {
            process.stdout.write("-");
          }
        }
        process.stdout.write("\n");
      }
      console.log("seconds taken: ", i)
      break;
    }
    prevDifference = minY - maxY;

    points.forEach(p => p.update());
  }
};

const points = input.split("\n").map(parse);

render(points);
