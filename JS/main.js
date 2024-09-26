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

let conveyor = null;
let conveyorGraphic = null;

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
  buildWindmill(300, 300, 400, 15);
  buildWindmill(700, 300, 400, 15);
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
  buildWheel(500, 600, 100);
};

const buildWheel = (xpos, ypos, r) => {
  const b = getCircBody(xpos, ypos, r, 123, true);
  wheels.push(b);

  const w = new Wheel(xpos, ypos, r, b);
  w.init(holder);
  wheelGraphics.push(w);
};

const makeConveyor = (xpos, ypos, w) => {
  conveyor = Bodies.rectangle(xpos, ypos, w, 50, {
    id: `conveyor`,
    friction: 1,
    restitution: 0.6,
    isStatic: true,
    frictionStatic: 1,
  });

  conveyorGraphic = new ConveyorBelt(xpos, ypos, w, 50, conveyor);
  conveyorGraphic.init(holder);
};

const update = () => {
  balls.forEach((ball) => {
    if (ball.position.y > 1100) {
      Matter.Body.setPosition(ball, { x: 400 + Math.random() * 200, y: 0 });
      Matter.Body.setSpeed(ball, 0);
    }
  });

  ballGraphics.forEach((particle) => {
    particle.update();
  });

  windmillGraphics.forEach((windmill) => {
    windmill.update();
  });

  wheelGraphics.forEach((wheelGraphic) => {
    wheelGraphic.update();
  });

  conveyorGraphic.update();
  window.requestAnimationFrame(update);
};

const initWorld = () => {
  let runner = Runner.create();
  World.add(engine.world, [...balls, ...windmills, ...wheels, conveyor]);
  Runner.run(runner, engine);
};

initSlider();
makeParticles();
makeWindmills();

makeWheels();
makeConveyor(500, 800, 800);
initWorld();

update();
