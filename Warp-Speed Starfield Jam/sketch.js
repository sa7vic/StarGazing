// Warp-Speed Starfield 🚀
// Controls: sliders for speed & count. H = toggle trails, S = save screenshot.

let stars = [];
let speedSlider, countSlider, hyperspaceBtn;
let warpFlash = 0;
let useTrails = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  const ui = select('#ui');
  ui.child(createDiv('<b>Warp Speed Starfield</b>'));
  ui.child(createSpan('Speed '));
  speedSlider = createSlider(1, 50, 8, 1); ui.child(speedSlider);
  ui.child(createElement('br'));
  ui.child(createSpan('Star Count '));
  countSlider = createSlider(50, 1500, 400, 10); ui.child(countSlider);
  ui.child(createElement('br'));
  hyperspaceBtn = createButton('Engage Hyperspace');
  hyperspaceBtn.mousePressed(()=> warpFlash = 255);
  ui.child(hyperspaceBtn);
  resetStars();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetStars();
}

class Star {
  constructor() { this.reset(true); }
  reset(randomZ=false) {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = randomZ ? random(width) : width;
    this.pz = this.z;
  }
  update(spd) {
    this.pz = this.z;
    this.z -= spd;
    if (this.z < 1) this.reset();
  }
  show() {
    let sx = map(this.x/this.z, -1, 1, 0, width);
    let sy = map(this.y/this.z, -1, 1, 0, height);
    let r = map(this.z, 0, width, 6, 0.2);
    noStroke(); fill(255); circle(sx, sy, r);
    if (useTrails) {
      let px = map(this.x/this.pz, -1, 1, 0, width);
      let py = map(this.y/this.pz, -1, 1, 0, height);
      stroke(255, 180); line(px, py, sx, sy);
    }
  }
}

function resetStars() {
  stars = [];
  for (let i=0;i<countSlider.value();i++) stars.push(new Star());
  background(0);
}

function draw() {
  const spd = speedSlider.value();
  background(0, 80);
  translate(width/2, height/2);
  for (let s of stars) { s.update(spd); s.show(); }
  if (warpFlash > 0) {
    noStroke(); fill(255, warpFlash); rect(-width/2, -height/2, width, height);
    warpFlash -= 20;
  }
}

function keyPressed(){
  if(key === 'H') useTrails = !useTrails;
  if(key === 'S') saveCanvas('starfield', 'png');
}
