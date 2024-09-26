const { Engine, Render, Runner, Bodies, Composite, World } = Matter;
let w = 1000;
let h = 1000;

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

const num = 200;
const maxRadius = 3;
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
  buildWindmill(275, 300, 425, 15);
  buildWindmill(725, 300, 425, 15);
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

const makeWheels = () => {
  //buildWheel(250, 600, 75);
  buildWheel(500, 550, 75);
  //buildWheel(750, 600, 75);
};

const buildWheel = (xpos, ypos, r) => {
  const b = getCircBody(xpos, ypos, r, 123, true);
  wheels.push(b);

  const w = new Wheel(xpos, ypos, r, b);
  w.init(holder);
  wheelGraphics.push(w);
};

const makeConveyor = (xpos, ypos, w) => {
  const conveyor = Bodies.rectangle(xpos, ypos, w, 50, {
    id: `conveyor_${xpos}${ypos}`,
    friction: 1,
    restitution: 0.6,
    isStatic: true,
    frictionStatic: 1,
  });

  conveyors.push(conveyor);

  const convGr = new ConveyorBelt(xpos, ypos, w, 50, conveyor);
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
  World.add(engine.world, [...balls, ...windmills, ...wheels, ...conveyors]);
  Runner.run(runner, engine);
};

initSlider();
makeParticles();
makeWindmills();

//makeWheels();
makeConveyor(325, 600, 600);
makeConveyor(675, 800, 600);
initWorld();

update();
