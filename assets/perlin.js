// noisejs library: https://www.jsdelivr.com/package/npm/noisejs

const lineholder = document.querySelector("#lineholder");
// svg namespace just in case we're creating some graphics
const namespace = "http://www.w3.org/2000/svg";
const w = 500;
const h = 500;
var noise = new Noise(Math.random());

// number of lines. Performance starts to suffer a lot over 50 lines
const num = 20;

// variable properties
let smoothness = 100; // the bigger the smoothness the more gradual the shape changes. A low number produces a very jagged line.
let amp = 75;
let dist = 2; // space btwn lines
let startY = (h - num * dist) / 2; // just use this so lines are in the middle of the svg
let fidelity = 2; // the lower the number the more points in a line. The higher the number the more "jagged" the line. Lower numbers are bad for performance

const lines = [];
let lineThickness = 1;

// tickX variable is used in changing the noise value over time so we can animate the lines. The lower the tickXIncrement the more slowley the line changes
let tickX = 0;
let tickXIncrement = 0.003;

// tickY variable is used in changing the noise value over time so we can animate the lines. The lower the tickYIncrement the more slowley the line changes
let tickY = 0;
let tickYIncrement = 0.003;

// the posX variable is used to create the "flowing" illusion. It's added to the x when getting the noise value.
let posX = 0;
let posXIncrement = -1;

// the posY variable is used to create the "flowing" illusion. It's added to the x when getting the noise value.
let posY = 0;
let posYIncrement = -1;

// ui
const ampSlider = document.querySelector("#amplitude");
const waveSlider = document.querySelector("#waviness");
const spaceSlider = document.querySelector("#space");
const fidelitySlider = document.querySelector("#fidelity");
const speedSlider = document.querySelector("#speed");
const speedYSlider = document.querySelector("#speedY");
const randomColorButton = document.querySelector("#randomColor");
const dashSlider = document.querySelector("#dash");

function initUI() {
  ampSlider.addEventListener("input", (e) => {
    amp = parseFloat(e.target.value);
  });
  waveSlider.addEventListener("input", (e) => {
    smoothness = parseFloat(e.target.value);
  });
  spaceSlider.addEventListener("input", (e) => {
    dist = parseFloat(e.target.value);
    startY = (h - num * dist) / 2;
  });
  fidelitySlider.addEventListener("input", (e) => {
    fidelity = parseInt(e.target.value);
  });

  speedSlider.addEventListener("input", (e) => {
    tickXIncrement = parseFloat(e.target.value);
    posXIncrement = (-tickXIncrement * 1000) / 3;
  });

  speedYSliderpeedSlider.addEventListener("input", (e) => {
    tickYIncrement = parseFloat(e.target.value);
    posYIncrement = (-tickYIncrement * 1000) / 3;
  });

  tickYIncrement;

  dashSlider.addEventListener("input", (e) => {
    lines.forEach((line) => {
      line.setAttribute("stroke-dasharray", e.target.value);
    });
  });

  randomColorButton.addEventListener("click", () => {
    changeColor();
  });
}

function buildLineElements(color) {
  for (let i = 0; i < num; i++) {
    const pl = document.createElementNS(namespace, "polyline");
    pl.setAttribute("points", "");
    pl.setAttribute("fill", "none");
    pl.setAttribute("stroke-width", lineThickness);
    pl.setAttribute("stroke-opacity", 1);
    pl.setAttribute("stroke-dasharray", "100");
    pl.setAttribute("pathLength", "100");
    lineholder.setAttribute("stroke", color);
    lineholder.appendChild(pl);
    lines.push(pl);
  }
}

function updateLines() {
  lines.forEach((line, index) => {
    let str = `0,${startY}`;
    let ypos = startY + index * dist;
    for (let i = 0; i < w / fidelity; i++) {
      const x = i * fidelity;
      let value = noise.simplex3(
        (posX + x) / smoothness,
        (posY + ypos) / smoothness,
        tickX
      );
      const y = ypos + value * amp;
      str = `${str} ${x},${y}`;
    }
    str = `${str} ${w},${ypos}`;

    line.setAttribute("points", str);
  });
}

function getRandomColor() {
  return `hsl(${Math.round(Math.random() * 360)} 100% 50%)`;
}

function changeColor() {
  const newColor = getRandomColor();
  lineholder.setAttribute("stroke", newColor);
}

function update() {
  updateLines();
  tickX += tickXIncrement;
  tickY += tickYIncrement;
  if (tickX > 10000000) tickX = 0;
  if (tickY > 10000000) tickY = 0;
  posX += posXIncrement;
  posY += posYIncrement;
  window.requestAnimationFrame(update);
}

initUI();
buildLineElements(getRandomColor());
update();
