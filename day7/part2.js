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

class Worker {
  constructor(id) {
    this.id = id;
  }

  tick() {
    this.timeBusy--;
    if (this.timeBusy === 0) {
      this.task = null;
    }
  }

  assign(task) {
    this.timeBusy = task.charCodeAt(0) - 64 + 60;
    console.log(`Worker ${this.id} assigned task ${task} and will take ${this.timeBusy}`);
    this.task = task;
  }

  working() {
    return this.timeBusy > 0;
  }

  currentTask() {
    return this.task;
  }
}

class WorkerPool {
  constructor(edges) {
    this.workers = [];
    this.edges = edges;
    for (let i = 0; i < 5; i++) {
      this.workers[i] = new Worker(i)
    }
  }

  hasCapacity() {
    return this.workers.find(w => !w.working());
  }

  assign(task) {
    this.workers.find(w => !w.working()).assign(task)
  }

  tick() {
    this.workers.forEach(w => w.tick())
  }

  taskIsBlocked(task) {
    const dependentTasks = this.edges.filter(({to}) => to === task).map(({from}) => from);
    return this.workers.find(w => dependentTasks.includes(w.currentTask()));
  }

  hasActiveWorkers() {
    return this.workers.find(w => w.working())
  }
}

const calculate = edges => {
  let nodes = allNodes(edges)

  const workerPool = new WorkerPool(edges);

  let ticks = 0;
  while (nodes.length !== 0) {
    if (workerPool.hasCapacity()) {
      const nextTasks = nodes.filter(n => isRoot(n, edges)).sort((a,b) => a.localeCompare(b));

      let nextTaskIndex = 0;
      while(workerPool.hasCapacity() && nextTaskIndex < nextTasks.length) {
        const nextTask = nextTasks[nextTaskIndex];
        if (!workerPool.taskIsBlocked(nextTask)) {
          workerPool.assign(nextTask);
          edges = edges.filter(({from}) => from !== nextTask);
          nodes = nodes.filter(n => n !== nextTask);
        }
        nextTaskIndex++;
      }
    }
    workerPool.tick();
    ticks++;
  }

  while (workerPool.hasActiveWorkers()) {
    workerPool.tick();
    ticks++;
  }

  console.log(ticks)
};

const edges = input.split("\n").map(line => {
  const match = line.match(/Step (\w) must be finished before step (\w) can begin./);
  return {
    from: (match[1]),
    to: (match[2])
  };
});

calculate(edges);

// 350 is too low
// 886 is too low