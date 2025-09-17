// Orbital Transfer (Earth to Mars) Simulation
let earth, mars, ship;
let G = 1;  // simplified gravitational constant
let sunPos, running = false;

function setup() {
  createCanvas(800, 800);
  sunPos = createVector(width/2, height/2);
  resetSim();

  document.getElementById("burnSlider").oninput = e => {
    document.getElementById("burnVal").innerText = e.target.value;
  };
  document.getElementById("angleSlider").oninput = e => {
    document.getElementById("angleVal").innerText = e.target.value;
  };
}

function resetSim(){
  earth = new Planet(150, 1, color(0,150,255));
  mars = new Planet(228, 0.53, color(255,100,0));
  ship = null;
  running = false;
}

function startTransfer(){
  let burnVel = parseFloat(document.getElementById("burnSlider").value);
  let angleDeg = parseFloat(document.getElementById("angleSlider").value);
  ship = new Ship(earth.pos.copy(), burnVel, angleDeg);
  running = true;
}

function draw(){
  background(20);
  
  // Sun
  fill(255,200,0);
  noStroke();
  ellipse(sunPos.x, sunPos.y, 40, 40);
  
  // Update planets
  earth.update();
  mars.update();
  earth.show();
  mars.show();
  
  // Ship
  if (ship && running){
    ship.update();
    ship.show();

    // Check "success" if near Mars orbit radius
    let r = p5.Vector.sub(ship.pos, sunPos).mag();
    if (abs(r - mars.radius) < 10){
      noLoop();
      fill(0,255,0);
      textSize(24);
      text("✅ Transfer Achieved!", width/2-120, 40);
    }
  }
}

// ----------------------------
// Planet Class
// ----------------------------
class Planet {
  constructor(radius, speed, c){
    this.radius = radius;
    this.angle = random(TWO_PI);
    this.speed = speed * 0.01; // scaled orbital speed
    this.c = c;
    this.pos = createVector();
  }
  
  update(){
    this.angle += this.speed;
    this.pos = p5.Vector.add(sunPos, createVector(this.radius*cos(this.angle), this.radius*sin(this.angle)));
  }
  
  show(){
    fill(this.c);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 20, 20);
  }
}

// ----------------------------
// Ship Class
// ----------------------------
class Ship {
  constructor(startPos, burnVel, angleDeg){
    this.pos = startPos.copy();
    let angle = radians(angleDeg);
    this.vel = createVector(burnVel*cos(angle), burnVel*sin(angle)).mult(0.5);
  }
  
  update(){
    let r = p5.Vector.sub(sunPos, this.pos);
    let acc = r.copy().normalize().mult(G / (r.magSq()));
    this.vel.add(acc);
    this.pos.add(this.vel);
  }
  
  show(){
    fill(200);
    ellipse(this.pos.x, this.pos.y, 8, 8);
  }
}
