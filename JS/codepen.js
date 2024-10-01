// https://cdnjs.com/libraries/matter-js

const { Engine, Events, Runner, Bodies, World } = Matter;

// dimensions
const width = 500;
const height = 1000;

// svg variables
const svg = document.querySelector("#svg");
const namespace = "http://www.w3.org/2000/svg";

// matterjs engine and runner
const engine = Engine.create();
const runner = Runner.create();

// ball graphic and matterjs body
let ballGraphic;
let ballBody;

// floor and walls
let floor;
let right_wall;
let left_wall;

// pegs
const pegs = [];
const pegBodies = [];

// cup separators - the wals that separate the cups
const cup_separators = [];

// sensors
const sensors = [];

// ui elements
const dropSlider = document.querySelector("#drop_slider");
const dropButton = document.querySelector("#drop_button");

// state
let dropped = false;
let gameOver = true;

// speed is zero array. When length = 10, game over!
let speedHistory = [];

const initBallGraphic = () => {
  ballGraphic = document.createElementNS(namespace, "circle");
  ballGraphic.setAttribute("cx", 250);
  ballGraphic.setAttribute("cy", 20);
  ballGraphic.setAttribute("r", 20);
  ballGraphic.setAttribute("fill", "red");
  svg.appendChild(ballGraphic);
};

const initBallBody = () => {
  ballBody = Bodies.circle(0, 0, 20, {
    id: `ball`,
    friction: 0,
    restitution: 0.7,
    isStatic: true,
  });
  Matter.Body.setPosition(ballBody, { x: 250, y: 22 });
};

const initFloor = () => {
  floor = Bodies.rectangle(0, 0, 500, 50, {
    id: `floor`,
    friction: 0,
    restitution: 0.5,
    isStatic: true,
  });

  Matter.Body.setPosition(floor, { x: 250, y: 1025 });
};

const initWalls = () => {
  right_wall = Bodies.rectangle(0, 0, 50, 1000, {
    id: `rightwall`,
    friction: 0,
    restitution: 0.5,
    isStatic: true,
  });

  Matter.Body.setPosition(right_wall, { x: -25, y: 500 });

  left_wall = Bodies.rectangle(0, 0, 50, 1000, {
    id: `leftwall`,
    friction: 0,
    restitution: 0.5,
    isStatic: true,
  });

  Matter.Body.setPosition(left_wall, { x: 525, y: 500 });
};

const initPegs = () => {
  const pegHolder = document.querySelector("#pegs");
  const pegs = pegHolder.getElementsByTagName("circle");
  for (peg of pegs) {
    const xpos = peg.getAttribute("cx");
    const ypos = peg.getAttribute("cy");
    const r = peg.getAttribute("r");
    const idname = `peg_${xpos}_${ypos}`;

    const pegBody = Bodies.circle(0, 0, r, {
      id: idname,
      friction: 0,
      restitution: 1,
      isStatic: true,
    });

    Matter.Body.setPosition(pegBody, { x: xpos, y: ypos });
    pegBodies.push(pegBody);
  }
};

const initSensors = () => {
  const sensorHolder = document.querySelector("#sensors");
  const sensorGrapghics = sensorHolder.getElementsByTagName("rect");
  for (graphic of sensorGrapghics) {
    const xpos = graphic.getAttribute("x");
    const ypos = graphic.getAttribute("y");
    const w = graphic.getAttribute("width");
    const h = graphic.getAttribute("height");
    const id = graphic.getAttribute("id");
    const idname = `sensor_${xpos}_${ypos}`;
    const body_x = parseInt(xpos) + w / 2;
    const body_y = parseInt(ypos) + h / 2;

    const sensorBody = Bodies.rectangle(0, 0, w, h, {
      id: idname,
      isSensor: true,
      isStatic: true,
    });

    Matter.Body.setPosition(sensorBody, { x: body_x, y: body_y });
    sensors.push(sensorBody);
  }

  Events.on(engine, "sleepStart", (event) => {
    console.log("sleepStart");
  });

  Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];
      if (
        pair.bodyA.id.includes("sensor") ||
        pair.bodyB.id.includes("sensor")
      ) {
        let id = pair.bodyA.id.includes("sensor")
          ? pair.bodyA.id
          : pair.bodyB.id;
        const index = id.substr(7);
        console.log("index:", index);
      }
    }
  });
};

const initSeparators = () => {
  const holder = document.querySelector("#cupwalls");
  const cupwalls = holder.getElementsByTagName("rect");

  for (cupwall of cupwalls) {
    const w = cupwall.getAttribute("width");
    const h = cupwall.getAttribute("height");
    const xpos = parseInt(cupwall.getAttribute("x"));
    const ypos = parseInt(cupwall.getAttribute("y"));

    const sep = Bodies.rectangle(0, 0, w, h, {
      id: `cupwall_${xpos}`,
      friction: 0,
      restitution: 0.5,
      isStatic: true,
    });

    Matter.Body.setPosition(sep, { x: xpos + w / 2, y: ypos + h / 2 });

    cup_separators.push(sep);
  }
};

const initUI = () => {
  dropSlider.addEventListener("input", (e) => {
    if (dropped) return;
    Matter.Body.setPosition(ballBody, { x: e.target.value, y: 25 });
  });

  dropButton.addEventListener("click", () => {
    console.log("is sleeping: ", ballBody.isSleeping);
    if (!dropped) {
      dropped = true;
      gameOver = false;
      Matter.Body.setStatic(ballBody, false);
      dropButton.innerText = "RESET";
    } else {
      dropped = false;
      gameOver = true;
      speedHistory = [];
      Matter.Body.setStatic(ballBody, true);
      Matter.Body.setPosition(ballBody, { x: 250, y: 25 });
      dropButton.innerText = "DROP";
      dropSlider.value = 250;
    }
  });
};

const initWorld = () => {
  World.add(engine.world, [
    ballBody,
    floor,
    left_wall,
    right_wall,
    ...pegBodies,
    ...cup_separators,
    ...sensors,
  ]);
  Runner.run(runner, engine);
};

const update = () => {
  const pos = ballBody.position;
  ballGraphic.setAttribute("cx", pos.x);
  ballGraphic.setAttribute("cy", pos.y);
  if (dropped && !gameOver) {
    const speed = Math.round(ballBody.speed);
    if (speed == 0) {
      speedHistory.push(speed);
      if (speedHistory.length > 10) {
        console.log("game over");
        gameOver = true;
      }
    } else {
      speedHistory = [];
    }
  }
  window.requestAnimationFrame(update);
};

initBallGraphic();
initBallBody();
initFloor();
initWalls();
initPegs();
initSeparators();
initSensors();
initUI();
initWorld();
update();
