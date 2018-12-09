const R = require("ramda");

const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const manhattenDistance = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const distanceToAll = (coords, x, y) =>
  coords.reduce((acc, next) => acc + manhattenDistance(next, { x, y }), 0);

const calculate = coords => {
  coords = coords.map((coord, i) => ({
    ...coord,
    name: String.fromCharCode(i + 65)
  }));
  const minX = coords.reduce((acc, { x }) => (x < acc ? x : acc), coords[0].x);
  const maxX = coords.reduce((acc, { x }) => (x > acc ? x : acc), coords[0].x);
  const minY = coords.reduce((acc, { y }) => (y < acc ? y : acc), coords[0].y);
  const maxY = coords.reduce((acc, { y }) => (y > acc ? y : acc), coords[0].y);

  console.log({ minX, maxX, minY, maxY });

  const h = maxY;
  const w = maxX;

  let grid = [];
  for (let i = 0; i <= h; i++) {
    grid[i] = [];
    for (let j = 0; j <= w; j++) {
      grid[i][j] = ".";
    }
  }

  let area = 0;
  for (let y = 0; y <= h; y++) {
    for (let x = 0; x <= w; x++) {
      const d = distanceToAll(coords, x, y);
      if (d < 10000) {
        area++;
      }
    }
  }

  console.log({ area });
};

const coords = input.split("\n").map(line => {
  const match = line.match(/(\d+), (\d+)/);
  return {
    x: parseInt(match[1]),
    y: parseInt(match[2])
  };
});

calculate(coords);

// 39040 too low