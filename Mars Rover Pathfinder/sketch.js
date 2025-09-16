// Mars Rover Pathfinder (BFS demo)
let cols = 20, rows = 15, grid = [];
let start, goal, queue = [], visited = new Set(), path = [];
let cellSize = 40, running = false, found = false;

function setup(){
  createCanvas(cols*cellSize, rows*cellSize);
  initGrid();
}

function initGrid(){
  grid = Array.from({length:rows}, (_, y) =>
    Array.from({length:cols}, (_, x) => ({ x, y, wall:false, parent:null }))
  );
  start = grid[rows-2][1];
  goal = grid[1][cols-2];
  queue = [start];
  visited.clear();
  path = [];
  running = false;
  found = false;
}

function draw(){
  background(20);
  drawGrid();

  if (running && queue.length > 0 && !found){
    stepBFS();
  }

  if (found) drawPath();
}

function drawGrid(){
  for (let y=0;y<rows;y++){
    for (let x=0;x<cols;x++){
      let cell = grid[y][x];
      stroke(60); noFill();
      rect(x*cellSize, y*cellSize, cellSize, cellSize);

      if (cell.wall){ fill(150,50,50); rect(x*cellSize, y*cellSize, cellSize, cellSize); }
      else if (visited.has(cellKey(cell))){ fill(80,120,200,120); rect(x*cellSize, y*cellSize, cellSize, cellSize); }
    }
  }
  // Start/Goal
  fill(0,200,100); rect(start.x*cellSize, start.y*cellSize, cellSize, cellSize);
  fill(200,200,0); rect(goal.x*cellSize, goal.y*cellSize, cellSize, cellSize);
}

function mousePressed(){
  let gx = floor(mouseX/cellSize), gy = floor(mouseY/cellSize);
  if (gx>=0 && gx<cols && gy>=0 && gy<rows){
    let c = grid[gy][gx];
    if (c !== start && c !== goal){
      c.wall = !c.wall;
    }
  }
}

function keyPressed(){
  if (key === ' '){ running = true; }
  if (key === 'R'){ initGrid(); }
}

function stepBFS(){
  let current = queue.shift();
  visited.add(cellKey(current));
  if (current === goal){
    found = true;
    tracePath(current);
    return;
  }
  for (let n of neighbors(current)){
    if (!visited.has(cellKey(n)) && !n.wall){
      visited.add(cellKey(n));
      n.parent = current;
      queue.push(n);
    }
  }
}

function neighbors(cell){
  let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let result = [];
  for (let [dx,dy] of dirs){
    let nx = cell.x+dx, ny = cell.y+dy;
    if (nx>=0 && nx<cols && ny>=0 && ny<rows){
      result.push(grid[ny][nx]);
    }
  }
  return result;
}

function tracePath(end){
  let c = end;
  while(c){
    path.push(c);
    c = c.parent;
  }
}

function drawPath(){
  noStroke();
  fill(0,255,200,180);
  for (let c of path){
    rect(c.x*cellSize, c.y*cellSize, cellSize, cellSize);
  }
}

function cellKey(c){ return `${c.x},${c.y}`; }
