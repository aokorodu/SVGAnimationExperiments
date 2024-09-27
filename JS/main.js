const { Engine, Render, Runner, Bodies, Composite, World } = Matter;
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

const num = 2;
const maxRadius = 8;
const wmbladeWidth = 600;
let spinSpeed = 0;
const spinSlider = document.querySelector("#spinSlider");

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
    restitution: 0.6,
    isStatic: static,
    frictionStatic: 1,
  });

  return b;
};

const getRectBody = (xpos, ypos, radius, index, static = false) => {
  const b = Bodies.rectangle(xpos, ypos, radius * 2, radius * 2, {
    id: `ball_${index}`,
    friction: 1,
    restitution: 0.6,
    isStatic: static,
    frictionStatic: 1,
  });

  return b;
};

const leftwall = Bodies.rectangle(-50, 500, 100, 1000, {
  isStatic: true,
  id: "leftwall",
});

const rightwall = Bodies.rectangle(1050, 500, 100, 1000, {
  isStatic: true,
  id: "righttwall",
});

const makeWindmills = () => {
  buildWindmill(750, 400, 300, 15);
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
  buildCups(500, 200, 400, 400);
};

const buildCups = (xpos, ypos, width, height) => {
  const thickness = 20;
  const h = Bodies.rectangle(0, height / 2 + thickness / 2, width, thickness, {
    id: `floor`,
    friction: 0,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });

  const l = Bodies.rectangle(-width / 2 - thickness / 2, 0, thickness, height, {
    id: `left_side`,
    friction: 0,
    restitution: 1,
    isStatic: true,
    // frictionStatic: 10,
  });

  const r = Bodies.rectangle(width / 2 + thickness / 2, 0, thickness, height, {
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
  Matter.Body.setPosition(b, { x: xpos, y: ypos });

  cups.push(b);
  const cup = new Cup(xpos, ypos, width, height, spinSpeed, b);
  cup.init(holder);
  cupGraphics.push(cup);
};

const makeWheels = () => {
  buildWheel(250, 800, 75);
  buildWheel(500, 800, 100);
  buildWheel(750, 800, 75);
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
    ...balls,
    ...windmills,
    ...wheels,
    ...conveyors,
    ...cups,
  ]);
  Runner.run(runner, engine);
};

initSlider();
makeParticles();
//makeWindmills();
makeCups();
makeWheels();
makeConveyor(1000, 1100, 1000, -1);
makeConveyor(420, 1400, 700, 1);
makeConveyor(1000, 1700, 1000, -1);
initWorld();

update();
