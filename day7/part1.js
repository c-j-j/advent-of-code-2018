const R = require('ramda');
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const allNodes = edges => {
  const all = edges.map(R.prop('from')).concat(edges.map(R.prop('to')));
  return R.uniq(all);
};

function isRoot(node, edges) {
  const a = edges.filter(e => e.to === node)
  return a.length === 0;
}

const calculate = edges => {
  let nodes = allNodes(edges)
  let ordered = [];
  while (nodes.length !== 0) {
    const root = nodes.filter(n => isRoot(n, edges)).sort((a,b) => a.localeCompare(b))[0];
    ordered.push(root);
    edges = edges.filter(({from}) => from !== root);
    nodes = nodes.filter(n => n !== root);
  }
  console.log(ordered.join(''))
};

const edges = input.split("\n").map(line => {
  const match = line.match(/Step (\w) must be finished before step (\w) can begin./);
  return {
    from: (match[1]),
    to: (match[2])
  };
});

calculate(edges);

// RTHZYSEABWCLVUOMPIJKFGQDXN is wrong
// RTHYSEZABPUOWCILVKGMJFQDXN is wrong
// RTHYSEZABPUOWCILJVKGMFQDXN is wrong