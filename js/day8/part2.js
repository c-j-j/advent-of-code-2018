const R = require('ramda');
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

class Node {
  constructor() {
    this.metadata = [];
    this.children = [];
  }

  addMetadata(metadata) {
    this.metadata.push(metadata)
  }

  addChild(child) {
    this.children.push(child)
  }
}

const parse = (tokens) => {
  const node = new Node();
  const childCount = tokens.shift();
  const metadataCount = tokens.shift();

  for (let i = 0; i < childCount; i++) {
    node.addChild(parse(tokens))
  }

  for (let i = 0; i < metadataCount; i++) {
    const metadataNumber = tokens.shift();
    node.addMetadata(metadataNumber);
  }

  return node;
};

function sumMetadataEntries(node) {
  if (node.children.length === 0) {
    return R.sum(node.metadata);
  }

  const metadataIndices = node.metadata;
  let total = 0;

  for (let i = 0; i < metadataIndices.length; i++) {
    const next = metadataIndices[i];
    const nextChild = node.children[next - 1];
    if (nextChild) {
      total += sumMetadataEntries(nextChild)
    }
  }

  return total;
};

const root = parse(input.split(' ').map(Number));

const sum = sumMetadataEntries(root);
console.log(sum);