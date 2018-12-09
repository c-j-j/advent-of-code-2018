const R = require("ramda");

const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", "utf8");

const manhattenDistance = (a,b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
};

const findClosestCoord = (coords,x,y) => {
  const coordsWithDistances = coords.map(coord => ({
    ...coord,
    d: manhattenDistance(coord, {x,y})
  }));


  const sorted = R.sortBy(R.prop('d'), coordsWithDistances);

  if (sorted[0].d === sorted[1].d) {
    return null;
  } else {
    return sorted[0];
  }
};


const calculate = coords => {
  coords  = coords.map((coord, i) => ({
    ...coord,
    name: String.fromCharCode(i + 65)
  }));
  const minX = coords.reduce(
    (acc, {x}) => (x < acc ? x : acc),
    coords[0].x
  );
  const maxX = coords.reduce(
    (acc, {x}) => (x > acc ? x : acc),
    coords[0].x
  );
  const minY = coords.reduce(
    (acc, {y}) => (y < acc ? y : acc),
    coords[0].y
  );
  const maxY = coords.reduce(
    (acc, {y}) => (y > acc ? y : acc),
    coords[0].y
  );

  console.log({minX, maxX, minY, maxY});

  const h = maxY - minY;
  const w = maxX - minX;

  let grid = [];
  for (let i = 0; i <= h; i++) {
    grid[i] = [];
    for (let j = 0; j <= w; j++) {
      grid[i][j] = ".";
    }
  }

  for (let y = 0; y <= h; y++) {
    for(let x = 0; x <= w; x++) {
      const coord = findClosestCoord(coords, x, y);
      if (coord) {
        grid[y][x] = coord.name
      }
    }
  }

  let edgeAreas = [];
  for (let y = 0; y <= h; y++) {
    for(let x = 0; x <= w; x++) {
      if (x === 0 || y === 0 || x === w || y === h) {
        edgeAreas.push(grid[y][x])
      }
    }
  }

  let possibleAreas = [];
  for (let y = 0; y <= h; y++) {
    for(let x = 0; x <= w; x++) {
      const name = grid[y][x];
      if (!edgeAreas.includes(name)) {
        possibleAreas.push(name)
      }
    }
  }

  const sorts = possibleAreas.reduce((acc, next) => {
    acc[next] = acc[next] ? acc[next] + 1 : 1;
    return acc;
  }, {});

  console.log({sorts})
};

const coords = input.split("\n").map(line => {
  const match = line.match(/(\d+), (\d+)/);
  return {
    x: parseInt(match[1]),
    y: parseInt(match[2])
  };
});

calculate(coords);
