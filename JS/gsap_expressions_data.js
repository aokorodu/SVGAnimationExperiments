// mouth data

let mouthPoints = {
  leftX: -100,
  leftY: 0,
  midTopX: 0,
  midTopY: 0,
  rightX: 100,
  rightY: 0,
  midBottomX: 0,
  midBottomY: 0,
};

const mouthDefault = {
  leftX: -50,
  leftY: 0,
  midTopX: 0,
  midTopY: 0,
  rightX: -50,
  rightY: 0,
  midBottomX: 0,
  midBottomY: 0,
};

const smileMouth = {
  leftX: -100,
  leftY: -10,
  rightX: 100,
  rightY: -10,
  midTopX: 0,
  midTopY: 0,
  midBottomX: 0,
  midBottomY: 80,
};

const frownMouth = {
  leftX: -80,
  leftY: 50,
  rightX: 80,
  rightY: 50,
  midTopX: 0,
  midTopY: -50,
  midBottomX: 0,
  midBottomY: -40,
};

const madMouth = {
  leftX: -70,
  leftY: 50,
  rightX: 70,
  rightY: 50,
  midTopX: 0,
  midTopY: -50,
  midBottomX: 0,
  midBottomY: 0,
};

const smirkMouth = {
  leftX: -50,
  leftY: 0,
  rightX: 50,
  rightY: -20,
  midTopX: 0,
  midTopY: 20,
  midBottomX: 0,
  midBottomY: 40,
};

const surprisedMouth = {
  leftX: -20,
  leftY: 0,
  rightX: 20,
  rightY: 0,
  midTopX: 0,
  midTopY: -45,
  midBottomX: 0,
  midBottomY: 45,
};

const blankMouth = {
  leftX: -30,
  leftY: 0,
  rightX: 30,
  rightY: 0,
  midTopX: 0,
  midTopY: 0,
  midBottomX: 0,
  midBottomY: 0,
};

const evilMouth = {
  leftX: -100,
  leftY: -10,
  rightX: 100,
  rightY: -10,
  midTopX: 0,
  midTopY: 30,
  midBottomX: 0,
  midBottomY: 70,
};

// left eyebrow
let lftEBPoints = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: 0,
  rightX: 10,
  rightY: 0,
};

let lftEBDefault = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: 0,
  rightX: 10,
  rightY: 0,
};

const lftEBSmile = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: -5,
  rightX: 10,
  rightY: -10,
};

let lftEBFrown = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: -5,
  rightX: 10,
  rightY: -10,
};

let lftEBMad = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: 5,
  rightX: 15,
  rightY: 10,
};

let lftEBSmirk = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: 0,
  rightX: 10,
  rightY: -10,
};

let lftEBSurprised = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: -20,
  rightX: 10,
  rightY: 0,
};

let lftEBBlank = {
  leftX: -5,
  leftY: 0,
  midX: 0,
  midY: 0,
  rightX: 5,
  rightY: 0,
};

// right eyebrow
let rgtEBPoints = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: 0,
  rightX: 10,
  rightY: 0,
};

let rgtEBDefault = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: 0,
  rightX: 10,
  rightY: 0,
};

const rgtEBSmile = {
  leftX: -10,
  leftY: -10,
  midX: 0,
  midY: -5,
  rightX: 10,
  rightY: 0,
};

let rgtEBFrown = {
  leftX: -10,
  leftY: -10,
  midX: 0,
  midY: -5,
  rightX: 10,
  rightY: 0,
};

let rgtEBMad = {
  leftX: -15,
  leftY: 10,
  midX: 0,
  midY: 5,
  rightX: 10,
  rightY: 0,
};

let rgtEBSmirk = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: 0,
  rightX: 10,
  rightY: -5,
};

let rgtEBSurprised = {
  leftX: -10,
  leftY: 0,
  midX: 0,
  midY: -20,
  rightX: 10,
  rightY: 0,
};

let rgtEBBlank = {
  leftX: -5,
  leftY: 0,
  midX: 0,
  midY: 0,
  rightX: 5,
  rightY: 0,
};

// left eye
let leftEyePoints = {
  pupil: {
    r: 20,
  },
  eye: {
    r: 20,
  },
};

const leftEyeSmile = {
  pupil: {
    r: 15,
  },
  eye: {
    r: 20,
  },
};

const leftEyeFrown = {
  pupil: {
    r: 17,
  },
  eye: {
    r: 20,
  },
};

const leftEyeMad = {
  pupil: {
    r: 5,
  },
  eye: {
    r: 15,
  },
};

const leftEyeSmirk = {
  pupil: {
    r: 10,
  },
  eye: {
    r: 20,
  },
};

const leftEyeSurprised = {
  pupil: {
    r: 5,
  },
  eye: {
    r: 20,
  },
};

const leftEyeBlank = {
  pupil: {
    r: 20,
  },
  eye: {
    r: 20,
  },
};

// right eye
let rightEyePoints = {
  pupil: {
    r: 20,
  },
  eye: {
    r: 20,
  },
};

const rightEyeSmile = {
  pupil: {
    r: 15,
  },
  eye: {
    r: 20,
  },
};

const rightEyeFrown = {
  pupil: {
    r: 17,
  },
  eye: {
    r: 20,
  },
};

const rightEyeMad = {
  pupil: {
    r: 5,
  },
  eye: {
    r: 15,
  },
};

const rightEyeSmirk = {
  pupil: {
    r: 10,
  },
  eye: {
    r: 15,
  },
};

const rightEyeSurprised = {
  pupil: {
    r: 5,
  },
  eye: {
    r: 20,
  },
};

const rightEyeBlank = {
  pupil: {
    r: 20,
  },
  eye: {
    r: 20,
  },
};
