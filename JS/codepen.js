// this pen imports maatter.js from https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.min.js
// matter js
const { Engine, Events, Runner, Bodies, World, Constraint } = Matter;

// svg variables
const svg = document.querySelector("#svg");
const namespace = "http://www.w3.org/2000/svg";

// dimensions
const viewboxArray = svg.getAttribute("viewBox").split(" ");
const vbWidth = parseInt(viewboxArray[2]);
const vbHeight = parseInt(viewboxArray[3]);

// matterjs engine and runner
const engine = Engine.create();
const runner = Runner.create();

// ball graphic and matterjs body
const ballGraphic = document.getElementById("ballGraphic");
let ballBody;

const anchorGraphic = document.getElementById("anchorGraphic");
let anchorBody;
let anchorConstraint; // constraint
const anchorConstraintGraphic = document.querySelector("#chain");

// floor and walls
let floor, right_wall, left_wall;

// wall body thickness
const wallThickness = 50;

// pegs
const pegs = [];
const pegBodies = [];

// cup separators - the wals that separate the cups
const cup_separators = [];

// sensors
const sensors = [];

// spinners
const spinners = [];
const spinnerGraphics = [];

// ui elements
const dropSlider = document.querySelector("#drop_slider");
const dropButton = document.querySelector("#drop_button");

// scoreText
const scoreText = document.querySelector("#scoreText");

// state
let dropped = false;
let gameOver = true;

const initBallBody = () => {
  const xpos = parseInt(ballGraphic.getAttribute("cx"));
  const ypos = parseInt(ballGraphic.getAttribute("cy"));
  const r = parseInt(ballGraphic.getAttribute("r"));
  ballBody = Bodies.circle(0, 0, r, {
    id: `ball`,
    friction: 0,
    restitution: 0.6,
    isStatic: false,
  });
  Matter.Body.setPosition(ballBody, { x: xpos, y: ypos });
};

const initAnchorBody = () => {
  const xpos = parseInt(anchorGraphic.getAttribute("cx"));
  const ypos = parseInt(anchorGraphic.getAttribute("cy"));
  const r = parseInt(anchorGraphic.getAttribute("r"));
  anchorBody = Bodies.circle(0, 0, r, {
    id: `anchor`,
    friction: 0,
    restitution: 0.6,
    isStatic: true,
  });
  Matter.Body.setPosition(anchorBody, { x: xpos, y: ypos });
};

const initConstraint = () => {
  anchorConstraint = Constraint.create({
    bodyA: anchorBody,
    bodyB: ballBody,
    stiffness: 0.1,
    length: 60,
  });
};

const initFloor = () => {
  floor = Bodies.rectangle(0, 0, vbWidth, wallThickness, {
    id: `floor`,
    friction: 0,
    restitution: 0.5,
    isStatic: true,
  });

  Matter.Body.setPosition(floor, {
    x: vbWidth / 2,
    y: vbHeight + wallThickness / 2,
  });
};

const initWalls = () => {
  right_wall = Bodies.rectangle(0, 0, wallThickness, vbHeight, {
    id: `rightwall`,
    friction: 0,
    restitution: 0.5,
    isStatic: true,
  });

  Matter.Body.setPosition(right_wall, {
    x: -wallThickness / 2,
    y: vbHeight / 2,
  });

  left_wall = Bodies.rectangle(0, 0, wallThickness, vbHeight, {
    id: `leftwall`,
    friction: 0,
    restitution: 0.5,
    isStatic: true,
  });

  Matter.Body.setPosition(left_wall, {
    x: vbWidth + wallThickness / 2,
    y: vbHeight / 2,
  });
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
    const score = graphic.dataset.score;
    const idname = `sensor_${xpos}_${ypos}_${score}`;
    const body_x = parseInt(xpos) + w / 2;
    // move the sensor down a bit to avoid false positives
    const body_y = parseInt(ypos) + h / 2;

    // make sensors half as tall as the cup so you dont get collisions when the ball is bouncing around the top
    const sensorBody = Bodies.rectangle(0, 0, w, h / 2, {
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
        const score = id.substr(7).split("_")[2];
        console.log("score:", score);
        scoreText.textContent = `~ ${score} ~`;
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

const initSpinners = () => {
  const spinnerHolder = document.querySelector("#spinners");
  const sgs = spinnerHolder.getElementsByTagName("rect");

  for (spinnerGraphic of sgs) {
    const x = parseInt(spinnerGraphic.getAttribute("x"));
    const y = parseInt(spinnerGraphic.getAttribute("y"));
    const width = parseInt(spinnerGraphic.getAttribute("width"));
    const height = parseInt(spinnerGraphic.getAttribute("height"));
    const xpos = x + width / 2;
    const ypos = y + height / 2;
    spinnerGraphics.push(spinnerGraphic);

    const spinnerBody = Bodies.rectangle(0, 0, width, height, {
      id: `spinner_${x}_${y}`,
      friction: 0,
      restitution: 0.5,
      isStatic: true,
    });

    Matter.Body.setPosition(spinnerBody, { x: xpos, y: ypos });
    Matter.Body.rotate(
      spinnerBody,
      Math.random() * 2 * Math.PI,
      spinnerBody.position,
      true
    );
    spinners.push(spinnerBody);
  }
};

const spinSpinners = () => {
  for (spinner of spinners) {
    const bodyPos = spinner.position;
  }
  for (let i = 0; i < spinners.length; i++) {
    const spinner = spinners[i];
    const bodyPos = spinner.position;
    const spinnerGraphic = spinnerGraphics[i];
    Matter.Body.rotate(spinner, -0.1, bodyPos, true);
    const angle = (spinner.angle * 180) / Math.PI;
    spinnerGraphic.setAttribute(
      "transform",
      `rotate(${angle} ${bodyPos.x}, ${bodyPos.y})`
    );
  }
};

const initUI = () => {
  dropSlider.addEventListener("input", (e) => {
    if (dropped) return;
    Matter.Body.setPosition(anchorBody, { x: e.target.value, y: 25 });
    anchorGraphic.setAttribute("cx", e.target.value);
  });

  dropButton.addEventListener("click", () => {
    console.log("is sleeping: ", ballBody.isSleeping);
    if (!dropped) {
      dropped = true;
      gameOver = false;
      Matter.Composite.remove(engine.world, anchorConstraint);
      //Matter.Body.setStatic(ballBody, false);
      dropButton.innerText = "RESET";
    } else {
      dropped = false;
      gameOver = true;
      speedHistory = [];
      Matter.Body.setPosition(ballBody, { x: vbWidth / 2, y: 50 });
      Matter.Body.setPosition(anchorBody, {
        x: vbWidth / 2,
        y: anchorBody.position.y,
      });
      anchorGraphic.setAttribute("cx", vbWidth / 2);
      Matter.Composite.add(engine.world, anchorConstraint);
      dropButton.innerText = "DROP";
      dropSlider.value = vbWidth / 2;
    }
  });
};

const initWorld = () => {
  Matter.Composite.add(engine.world, [
    ballBody,
    anchorBody,
    anchorConstraint,
    floor,
    left_wall,
    right_wall,
    ...pegBodies,
    ...cup_separators,
    ...sensors,
    ...spinners,
  ]);
  Runner.run(runner, engine);
};

const update = () => {
  spinSpinners();
  const pos = ballBody.position;
  ballGraphic.setAttribute("cx", pos.x);
  ballGraphic.setAttribute("cy", pos.y);
  if (!dropped) {
    anchorConstraintGraphic.setAttribute(
      "d",
      `M${pos.x},${pos.y} L${anchorBody.position.x},${anchorBody.position.y}`
    );
  } else {
    anchorConstraintGraphic.setAttribute("d", "");
  }
  window.requestAnimationFrame(update);
};

initBallBody();
initAnchorBody();
initConstraint();
initFloor();
initWalls();
initPegs();
initSeparators();
initSensors();
initSpinners();
initUI();
initWorld();
update();
