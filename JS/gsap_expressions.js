// svg variables
const viewportWidth = 500;
const viewportHeight = 500;
const viewBoxWidth = 500;
const viewBoxHeight = 500;
const w = viewBoxWidth;
const h = viewBoxHeight;

// animation duration
dur = 0.333;

// tweens
let mouthTween = null;
let leftEBTween = null;
let rightEBTween = null;
let leftEyeTween = null;
let rightEyeTween = null;
let leftPupilTween = null;
let rightPupilTween = null;

//paths
const mouthPath = document.querySelector("#mouthPath");
const leftEBPath = document.querySelector("#leftEBPath");
const rightEBPath = document.querySelector("#rightEBPath");
const leftEye = document.querySelector("#leftEye");
const rightEye = document.querySelector("#rightEye");
const leftPupil = document.querySelector("#leftPupil");
const rightPupil = document.querySelector("#rightPupil");

// smile | frown | mad | smirk | surprised | blank

initSVG();

function smile() {
  changeExpression(
    smileMouth,
    lftEBSmile,
    rgtEBSmile,
    leftEyeSmile,
    rightEyeSmile
  );
}

function frown() {
  changeExpression(
    frownMouth,
    lftEBFrown,
    rgtEBFrown,
    leftEyeFrown,
    rightEyeFrown
  );
}

function mad() {
  changeExpression(madMouth, lftEBMad, rgtEBMad, leftEyeMad, rightEyeMad);
}

function smirk() {
  changeExpression(
    smirkMouth,
    lftEBSmirk,
    rgtEBSmirk,
    leftEyeSmirk,
    rightEyeSmirk
  );
}

function surprised() {
  changeExpression(
    surprisedMouth,
    lftEBSurprised,
    rgtEBSurprised,
    leftEyeSurprised,
    rightEyeSurprised
  );
}

function blank() {
  changeExpression(
    blankMouth,
    lftEBBlank,
    rgtEBBlank,
    leftEyeBlank,
    rightEyeBlank
  );
}

function evil() {
  changeExpression(evilMouth, lftEBMad, rgtEBMad, leftEyeMad, rightEyeMad);
}

function initSVG() {
  const svg = document.querySelector("svg");
  svg.setAttribute("width", `${viewportWidth}`);
  svg.setAttribute("height", `${viewportHeight}`);
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const bg = document.querySelector("#bg");
  bg.setAttribute("width", w);
  bg.setAttribute("height", h);
  bg.setAttribute("fill", "#212121");
}

function changeExpression(moutPTs, lftEBPTs, rgtEBPTs, lftEyePTs, rgtEyePTs) {
  animateMouthPoints(moutPTs);
  animateLeftEyebrowPoints(lftEBPTs);
  animateRightEyebrowPoints(rgtEBPTs);
  animateLeftEyePoints(lftEyePTs);
  animateRightEyePoints(rgtEyePTs);
  animateLeftPupilPoints(lftEyePTs);
  animateRightPupilPoints(rgtEyePTs);
}

// ANIMATE MOUTH POINTS
function animateMouthPoints(newPoints) {
  mouthTween = gsap.timeline({ onUpdate: updateMouth });
  mouthTween.to(mouthPoints, {
    leftX: newPoints.leftX,
    leftY: newPoints.leftY,
    midTopX: newPoints.midTopX,
    midTopY: newPoints.midTopY,
    rightX: newPoints.rightX,
    rightY: newPoints.rightY,
    midBottomX: newPoints.midBottomX,
    midBottomY: newPoints.midBottomY,
    duration: dur,
  });
}

// ANIMATE EYEBROW POINTS
function animateLeftEyebrowPoints(newPoints) {
  leftEBTween = gsap.timeline({ onUpdate: updateLeftEyebrow });
  leftEBTween.to(lftEBPoints, {
    leftX: newPoints.leftX,
    leftY: newPoints.leftY,
    midX: newPoints.midX,
    midY: newPoints.midY,
    rightX: newPoints.rightX,
    rightY: newPoints.rightY,
    duration: dur,
  });
}

function animateRightEyebrowPoints(newPoints) {
  rightEBTween = gsap.timeline({ onUpdate: updateRightEyebrow });
  rightEBTween.to(rgtEBPoints, {
    leftX: newPoints.leftX,
    leftY: newPoints.leftY,
    midX: newPoints.midX,
    midY: newPoints.midY,
    rightX: newPoints.rightX,
    rightY: newPoints.rightY,
    duration: dur,
  });
}

// ANIMATE EYE POINTS
function animateLeftEyePoints(newPoints) {
  leftEyeTween = gsap.timeline({ onUpdate: updateLeftEye });
  leftEyeTween.to(leftEyePoints.eye, {
    r: newPoints.eye.r,
    duration: dur,
  });
}

function animateRightEyePoints(newPoints) {
  rightEyeTween = gsap.timeline({ onUpdate: updateRightEye });
  rightEyeTween.to(rightEyePoints.eye, {
    r: newPoints.eye.r,
    duration: dur,
  });
}

function animateLeftPupilPoints(newPoints) {
  leftPupilTween = gsap.timeline({ onUpdate: updateLeftPupil });
  leftPupilTween.to(leftEyePoints.pupil, {
    r: newPoints.pupil.r,
    duration: dur,
  });
}

function animateRightPupilPoints(newPoints) {
  rightPupilTween = gsap.timeline({ onUpdate: updateRightPupil });
  rightPupilTween.to(rightEyePoints.pupil, {
    r: newPoints.pupil.r,
    duration: dur,
  });
}

// UPDATE SVG ELEMENTS
function updateMouth() {
  const pathString = `M${mouthPoints.leftX},${mouthPoints.leftY} Q${mouthPoints.midTopX},${mouthPoints.midTopY} ${mouthPoints.rightX},${mouthPoints.rightY} Q${mouthPoints.midBottomX},${mouthPoints.midBottomY} ${mouthPoints.leftX},${mouthPoints.leftY}`;
  mouthPath.setAttribute("d", pathString);
}

function updateLeftEyebrow() {
  const pathString = `M${lftEBPoints.leftX},${lftEBPoints.leftY} Q${lftEBPoints.midX},${lftEBPoints.midY} ${lftEBPoints.rightX},${lftEBPoints.rightY}`;
  leftEBPath.setAttribute("d", pathString);
}

function updateRightEyebrow() {
  const pathString = `M${rgtEBPoints.leftX},${rgtEBPoints.leftY} Q${rgtEBPoints.midX},${rgtEBPoints.midY} ${rgtEBPoints.rightX},${rgtEBPoints.rightY}`;
  rightEBPath.setAttribute("d", pathString);
}

function updateLeftEye() {
  leftEye.setAttribute("r", leftEyePoints.eye.r);
}

function updateRightEye() {
  rightEye.setAttribute("r", rightEyePoints.eye.r);
}

function updateLeftPupil() {
  leftPupil.setAttribute("r", leftEyePoints.pupil.r);
}

function updateRightPupil() {
  rightPupil.setAttribute("r", rightEyePoints.pupil.r);
}
