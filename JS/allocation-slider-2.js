const svg = document.querySelector("#svg");
const sectionHolder = document.querySelector("#section-holder");
const draggerHolder = document.querySelector("#dragger-holder");

let totalSections = 4;
let totalDraggers = totalSections - 1;
let isDragging = false;
const colors = ["#511D43", "#901E3E", "#A53860", "#DC2525", "#F7B7A3"];
const w = 1000;
const sectionHeight = 200;
let sections = null;
let draggers = null;

const dragData = {
  mouseDownX: 0,
  dragger: null,
  startDraggerX: 0,
  currentDraggerIndex: null,
  dx: 0,
  min: 0,
  max: w,
};
init();

function init() {
  initSections();
  initDraggers();
  initSVGListener();
}

function initSections() {
  for (let i = 0; i < totalSections; i++) {
    const section = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    section.setAttribute("class", "section");
    section.setAttribute("x", i * (w / totalSections));
    section.setAttribute("y", 0);
    section.setAttribute("width", w / totalSections);
    section.setAttribute("height", sectionHeight);
    section.setAttribute("fill", colors[i]);
    sectionHolder.appendChild(section);
  }
  sections = document.querySelectorAll(".section");
}

function initDraggers() {
  for (let i = 0; i < totalDraggers; i++) {
    const dragger = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "use"
    );
    dragger.setAttribute("href", "#dragger");
    dragger.setAttribute("x", (i + 1) * (w / totalSections));
    dragger.setAttribute("y", 0);
    dragger.setAttribute("data-index", i);
    dragger.setAttribute("class", "dragger");
    draggerHolder.appendChild(dragger);
  }

  draggers = document.querySelectorAll(".dragger");
}

function initSVGListener() {
  svg.addEventListener("mousedown", onMouseDown);
  //   svg.addEventListener("touchstart", onTouchStart);

  //   svg.addEventListener("touchmove", onTouchMove);
  svg.addEventListener("mouseup", onMouseUp);
  svg.addEventListener("mouseout", onMouseUp);
  //   svg.addEventListener("touchend", onTouchEnd);
}

function onMouseDown(event) {
  svg.addEventListener("mousemove", onMouseMove);
  const x = event.clientX;
  const closestDragger = getClosestDragger(toSVGPoint(x).x);
  const index = parseInt(closestDragger.getAttribute("data-index"));
  // console.log("index: ", index);
  dragData.mouseDownX = toSVGPoint(x).x;
  dragData.dragger = closestDragger;
  dragData.currentDraggerIndex = index;
  dragData.startDraggerX = parseFloat(closestDragger.getAttribute("x"));
  dragData.min =
    index === 0 ? 0 : parseFloat(draggers[index - 1].getAttribute("x")) + 1;
  // console.log("dragData.min: ", dragData.min);
  dragData.max =
    index === totalDraggers - 1
      ? w
      : parseFloat(draggers[index + 1].getAttribute("x") - 1);
  // console.log("dragData: ", dragData);
}

function onMouseUp() {
  console.log("mouseup");
  svg.removeEventListener("mousemove", onMouseMove);
}

function onMouseMove(event) {
  const x = event.clientX;
  dragData.dx = toSVGPoint(x).x - dragData.mouseDownX;
  // console.log("dx: ", dragData.dx);

  //dragData.dragger.setAttribute("x", dragData.startDraggerX + dragData.dx);
  dragDragger();
  redrawSections();
}
function dragDragger() {
  let newX = dragData.startDraggerX + dragData.dx;
  //    console.log(
  //     "newX: ",
  //     newX,
  //     "dragData.min: ",
  //     dragData.min,
  //     "dragData.max: ",
  //     dragData.max
  //   );
  if (newX < dragData.min) newX = dragData.min;
  if (newX > dragData.max) newX = dragData.max;
  dragData.dragger.setAttribute("x", newX);
}

function redrawSections() {
  sections.forEach((section, index) => {
    const startX =
      index === 0 ? 0 : parseFloat(draggers[index - 1].getAttribute("x"));
    const endX =
      index == totalSections - 1
        ? 1000
        : parseFloat(draggers[index].getAttribute("x"));
    section.setAttribute("x", startX);
    section.setAttribute("width", endX - startX);
  });
  // Update the last section width to fill the remaining space
}

function getClosestDragger(x) {
  let closest = null; // TODO: make this an array so if multiple distances = 0 whe can select the first dragger if x < first dragger.x or last dragger if x > last dragger.x
  let closestDistance = Infinity;

  draggers.forEach((dragger) => {
    const draggerX = parseFloat(dragger.getAttribute("x"));
    const distance = Math.abs(draggerX - x);
    // console.log("x: ", x, "draggerX: ", draggerX, "distance: ", distance);

    if (distance <= closestDistance) {
      // console.log("distance < closestDistance", distance < closestDistance);
      closestDistance = distance;
      closest = dragger;
    }
  });

  return closest;
}

function toSVGPoint(x) {
  let p = new DOMPoint(x, 0);
  return p.matrixTransform(svg.getScreenCTM().inverse());
}
