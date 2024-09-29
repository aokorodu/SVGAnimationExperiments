const { Engine, Events, Render, Runner, Bodies, Composite, World } = Matter;
let w = 1000;
let h = 2000;

const engine = Engine.create();
const holder = document.querySelector("#holder");
const balls = [];
const ballGraphics = [];
const windmills = [];
const windmillGraphics = [];
const wheels = [];
const wheelGraphics = [];
const conveyors = [];
const conveyorGraphics = [];
const cups = [];
const cupGraphics = [];

let collider;

const num = 200;
const maxRadius = 7;
const wmbladeWidth = 600;
const spinSlider = document.querySelector("#spinSlider");
let spinSpeed = parseFloat(spinSlider.value);
const initSlider = () => {
  spinSlider.addEventListener("input", (e) => {
    const val = e.target.value;
    spinSpeed = parseFloat(val) / 20;
    windmillGraphics.forEach((windmill) => {
      windmill.changeSpeed(spinSpeed);
    });
  });
};

const makeParticles = () => {
  for (let i = 0; i < num; i++) {
    const radius = 5 + Math.round(Math.random() * maxRadius);
    const xpos = 500 + (Math.random() * 100 - 50);
    const ypos = i * -radius;
    const type = Math.random() > 0.5 ? "circle" : "rect";

    const b =
      type == "circle"
        ? getCircBody(xpos, ypos, radius, i)
        : getRectBody(xpos, ypos, radius, i);
    const p = new Particle(xpos, ypos, radius, b, type);
    p.init(holder);
    balls.push(b);
    ballGraphics.push(p);
  }
};

const getCircBody = (xpos, ypos, radius, index, static = false) => {
  const b = Bodies.circle(xpos, ypos, radius, {
    id: `ball_${index}`,
    friction: 1,
    restitution: 0.5,
    isStatic: static,
    frictionStatic: 1,
  });

  return b;
};

const getRectBody = (xpos, ypos, radius, index, static = false) => {
  const b = Bodies.rectangle(xpos, ypos, radius * 2, radius * 2, {
    id: `ball_${index}`,
    friction: 1,
    restitution: 0.5,
    isStatic: static,
    frictionStatic: 1,
  });

  return b;
};

const leftwall = Bodies.rectangle(-50, 500, 100, 1000, {
  isStatic: true,
  id: "leftwall",
});

const rightwall = Bodies.rectangle(1025, 500, 50, 1900, {
  isStatic: true,
  id: "righttwall",
});

const makeWindmills = () => {
  buildWindmill(500, 1250, 500, 15);
};

const buildWindmill = (xpos, ypos, bladeWidth, bladeThickness) => {
  const h = Bodies.rectangle(0, 0, bladeWidth, bladeThickness, {
    id: `horiz_blade`,
    friction: 1,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });

  const v = Bodies.rectangle(0, 0, bladeThickness, bladeWidth, {
    id: `vert_blade`,
    friction: 1,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });

  const b = Matter.Body.create({
    id: `b`,
    friction: 0,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });
  Matter.Body.setParts(b, [h, v]);
  Matter.Body.setPosition(b, { x: xpos, y: ypos });

  windmills.push(b);
  const wm = new Windmill(xpos, ypos, bladeWidth, bladeThickness, spinSpeed, b); //new Windmill(500, 500, bladeWidth,);
  wm.init(holder);
  windmillGraphics.push(wm);
};

makeCups = () => {
  buildCups(1500, 1880, 350, 200);
};

const buildCups = (xpos, ypos, width, height) => {
  const thickness = 20;
  const h = Bodies.rectangle(0, 0, width, thickness, {
    id: `floor`,
    friction: 0,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });

  const l = Bodies.rectangle(0, 0, thickness, height, {
    id: `left_side`,
    friction: 0,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });

  const r = Bodies.rectangle(0, 0, thickness, height, {
    id: `right_side`,
    friction: 0,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });

  const b = Matter.Body.create({
    id: `cup_body`,
    friction: 0,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });
  Matter.Body.setParts(b, [l, r, h]);
  Matter.Body.setPosition(l, { x: -width / 2, y: 0 });
  Matter.Body.setPosition(r, { x: width / 2, y: 0 });
  Matter.Body.setPosition(h, { x: 0, y: height / 2 });

  Matter.Body.setPosition(b, { x: xpos, y: ypos });

  cups.push(b);
  const cup = new Cup(xpos, ypos, width, height, spinSpeed, b);
  cup.init(holder);
  cupGraphics.push(cup);
};

const makeWheels = () => {
  buildWheel(300, 250, 50);
  buildWheel(500, 250, 50);
  buildWheel(700, 250, 50);
  buildWheel(200, 400, 50);
  buildWheel(400, 400, 50);
  buildWheel(600, 400, 50);
  buildWheel(800, 400, 50);
  buildWheel(300, 550, 50);
  buildWheel(500, 550, 50);
  buildWheel(700, 550, 50);
};

const buildWheel = (xpos, ypos, r) => {
  const b = getCircBody(xpos, ypos, r, 123, true);
  wheels.push(b);

  const w = new Wheel(xpos, ypos, r, b);
  w.init(holder);
  wheelGraphics.push(w);
};

const makeConveyor = (xpos, ypos, w, speed) => {
  const conveyor = Bodies.rectangle(xpos, ypos, w, 50, {
    id: `conveyor_${xpos}${ypos}`,
    friction: 1,
    restitution: 0.6,
    isStatic: true,
    frictionStatic: 1,
  });

  const stable = Bodies.rectangle(xpos, ypos + 1, w + 25, 50, {
    id: `stable_${xpos}${ypos}`,
    friction: 0,
    restitution: 0,
    isStatic: true,
    frictionStatic: 0,
  });

  conveyors.push(conveyor);
  conveyors.push(stable);

  const convGr = new ConveyorBelt(xpos, ypos, w, 50, conveyor, speed);
  convGr.init(holder);
  conveyorGraphics.push(convGr);
};

const makeSensor = () => {
  const sensorGraphic = document.querySelector("#sensorGraphic");
  const xpos = parseFloat(sensorGraphic.getAttribute("x"));
  const ypos = parseFloat(sensorGraphic.getAttribute("y"));
  const sw = parseFloat(sensorGraphic.getAttribute("width"));
  const sh = parseFloat(sensorGraphic.getAttribute("height"));

  collider = Bodies.rectangle(xpos + sw / 2 + 10, ypos + sh / 2, sw, sh, {
    id: `collider`,
    isSensor: true,
    isStatic: true,
  });

  Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];
      if (pair.bodyA.id === "collider" || pair.bodyB.id === "collider") {
        let id = pair.bodyA.id == "collider" ? pair.bodyB.id : pair.bodyA.id;
        const index = parseInt(id.substr(5));
        ballGraphics[index].changecolor();
      }
    }
  });
};

const update = () => {
  ballGraphics.forEach((particle) => {
    particle.update();
  });

  windmillGraphics.forEach((windmill) => {
    windmill.update();
  });

  wheelGraphics.forEach((wheelGraphic) => {
    wheelGraphic.update();
  });

  conveyorGraphics.forEach((cGraphic) => {
    cGraphic.update();
  });

  //conveyorGraphic.update();
  window.requestAnimationFrame(update);
};

const initWorld = () => {
  let runner = Runner.create();
  World.add(engine.world, [
    collider,
    ...balls,
    ...windmills,
    ...wheels,
    ...conveyors,
    ...cups,
    rightwall,
  ]);
  Runner.run(runner, engine);
};

initSlider();
makeParticles();
makeWheels();
makeWindmills();
//makeCups();

makeConveyor(225, 800, 350, 1);
makeConveyor(765, 800, 350, -1);
makeConveyor(1000, 1750, 1900, 2);
makeSensor();
initWorld();

update();
