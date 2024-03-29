let floorSeed, floorColour, canWidth, canHeight, canXPos, canYPos;

const wallColours = ['#faf0dc', '#d13202', '#6aa72e', '#c1c2c4', '#b995bd', '#3988c4'];
const floorColours = ['#8b5a2b', '#ffa54f', '#a0522d', '#cd8500', '#8b4513'];
const bookshelfColour = '#fbfaf8';
const bookshelfOffsetColour = '#ccc0a8';
const bookshelfShadingColour = '#dfd7c7';
const tableColour = '#d5a16a';
const paintingFrameColour = '#eeeeee';
const paintingFrameOffsetColour = '#c8c8c8';
const pictureSkyColour = '#87ceeb';
const canColour = '#f32100';
const otherCanColours = ['#3530db', '#248455', '#d6b40a', '#1f1d1e', '#f5941d'];
let bookColours = [];
let booksGenerated = false;
let bookshelfLocationGenerated = false;
let paintingFrameGenerated = false;
let paintingLinesGenerated = false;
let tableObjectsGenerated = false;
let bookshelfObjectsGenerated = false;
let floorObjectsGenerated = false;
let floorColourGenerated = false;
let tableGenerated = false;
let gameComplete = false;
let screenCleared = false;
let cansGenerated = false;
const canLocations = ['floor', 'table', 'bookshelf', 'painting'];
const canLocation = canLocations[Math.floor(Math.random() * canLocations.length)];
const tableObjects = ['can', 'can', 'can', 'bowl', 'sphere', 'sphere'];
const bookshelfObjects = ['can', 'box', 'sphere', 'triangle'];
const floorObjects = ['sphere', 'box', 'box', 'triangle', 'triangle'];
function Box(width, height) {
  this.width = width;
  this.height = height;
}

function Bowl(width, height) {
  this.width = width;
  this.height = height;
}

function Sphere(diameter) {
  this.diameter = diameter;
}

function Triangle(width, height) {
  this.width = width;
  this.height = height;
}

function Can(x, y, colour) {
  this.colour = colour;
  this.silver = '#b3b3b3';
  this.x = x;
  this.y = y;
  this.drawCan = function () {
    noStroke();
    fill(this.silver);
    triangle(this.x, this.y - (canHeight * 0.08), this.x + (canWidth * 0.1), this.y, this.x + (canWidth * 0.1), this.y - (canHeight * 0.08));
    rect(this.x + (canWidth * 0.1), this.y - (canHeight * 0.08), canWidth * 0.8, canHeight * 0.08);
    triangle(this.x + (canWidth * 0.9), this.y, this.x + (canWidth * 0.9), this.y - (canHeight * 0.08), this.x + canWidth, this.y - (canHeight * 0.08));

    fill(this.colour);
    rect(this.x, this.y - (canHeight * 0.92), canWidth, canHeight - (canHeight * 0.16));

    fill(this.silver);
    triangle(this.x, this.y - (canHeight * 0.92), this.x + (canWidth * 0.1), this.y - (canHeight * 0.92), this.x + (canWidth * 0.1), this.y - canHeight);
    rect(this.x +(canWidth * 0.1), this.y - canHeight, canWidth * 0.8, canHeight * 0.08);
    triangle(this.x + (canWidth * 0.9), this.y - (canHeight * 0.92), this.x + (canWidth * 0.9), this.y - canHeight, this.x + canWidth, this.y - (canHeight * 0.92));

    stroke(0);
    strokeWeight(0.5);
    line(this.x, this.y - (canHeight * 0.08), this.x + (canWidth * 0.1), this.y);
    line(this.x + (canWidth * 0.1), this.y, this.x + (canWidth * 0.9), this.y);
    line(this.x + (canWidth * 0.9), this.y, this.x + canWidth, this.y - (canHeight * 0.08));
    line(this.x + canWidth, this.y - (canHeight * 0.08), this.x + canWidth, this.y - (canHeight * 0.92));
    line(this.x + canWidth, this.y - (canHeight * 0.92), this.x + (canWidth * 0.9), this.y - canHeight);
    line(this.x + (canWidth * 0.9), this.y - canHeight, this.x + (canWidth * 0.1), this.y - canHeight);
    line(this.x + (canWidth * 0.1), this.y - canHeight, this.x, this.y - (canHeight * 0.92));
    line(this.x, this.y - (canHeight * 0.92), this.x, this.y - (canHeight * 0.08));
  };
}

function preload() {
  // load any assets (images, sounds etc.) here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  for (let i = 0; i < 60; i++) {
    bookColours.push(color(random(0, 255), random(0, 255), random(0, 255)));
  }
  background(wallColours[Math.floor(Math.random() * wallColours.length)]);
  floorSeed = random(windowHeight - (windowHeight * 0.2), windowHeight - (windowHeight * 0.1));
  canWidth = windowWidth  * 0.02;
  canHeight = windowHeight * 0.06;
}

function draw() {
  // put drawing code here
  if (!gameComplete) {
    noStroke();
    textSize(windowWidth * 0.04);
    textAlign(LEFT);
    fill(0);
    text("Click on the can.", windowWidth * 0.01, windowHeight * 0.1);
    livingRoom();
  } else {
    gameCompleteScreen();
  }
}

function livingRoom() {
  const paintingData = generatePainting();
  generatePaintingArtwork(paintingData[0], paintingData[1], paintingData[2], paintingData[3], paintingData[4]);
  const bookshelfData = generateBookshelf();
  const tableData = generateTable();
  generateTableObjects(tableData[0], tableData[1], tableData[2]);
  generateBookshelfObjects(bookshelfData[0], bookshelfData[1], bookshelfData[2]);
  generateFloorObjects();
  generateFloor();
}

function generateFloor() {
  noStroke();

  if (!floorColourGenerated) {
    floorColourGenerated = true;
    floorColour = color(floorColours[Math.floor(Math.random() * floorColours.length)]);
  }
  fill(floorColour);
  rect(0, floorSeed, windowWidth, windowHeight);
}

function generateBookshelf() {
  function Book(width, height, colour) {
    this.width = width;
    this.height = height;
    this.colour = colour;
  }

  fill(bookshelfColour);
  strokeWeight(3);
  stroke(bookshelfOffsetColour);
  let bookshelfPlacement;
  const bookshelfLength = (windowWidth * 0.5);
  const bookshelfHeight = (windowHeight * 0.4);
  if (!bookshelfLocationGenerated) {
    bookshelfLocationGenerated = true;
    bookshelfPlacement = random(0, windowWidth - bookshelfLength);
  }
  const bookshelfThickness = 10;
  const outerX = bookshelfPlacement;
  const outerY = floorSeed - bookshelfHeight;
  const innerX = outerX + bookshelfThickness;
  const innerY = outerY + bookshelfThickness;

  rect(outerX, outerY, bookshelfLength + bookshelfThickness, bookshelfHeight);
  fill(bookshelfShadingColour);
  rect(innerX, innerY, bookshelfLength - 10, bookshelfHeight - 20);

  const shelfLength = bookshelfLength / 4;
  for (let i = 0; i < 4; i++) {
    const shelfWidth = innerX + (i * shelfLength);
    fill(bookshelfColour);
    stroke(bookshelfOffsetColour);
    rect(shelfWidth - bookshelfThickness, innerY, 10, bookshelfHeight - 20);
  }

  let shelfWidthMultiplier = 0;
  if (!booksGenerated) {
    booksGenerated = true;
    let bookHeightOffset = 0;
    let bookCount = 0;
    for (let i = 0; i < 60; i++) {
      const bookHeight = random(5, 20);
      const bookLength = random(shelfLength * 0.5, shelfLength) - bookshelfThickness;
      const book = new Book(bookLength, bookHeight, bookColours.pop());

      if ((bookHeightOffset < bookshelfHeight) && (bookCount <= 15)) {
        noStroke();
        bookCount++;
        bookHeightOffset += book.height;
        const shelfX = innerX + (shelfWidthMultiplier * shelfLength);
        book.placementOffset = shelfX + random(0, shelfLength - book.width - bookshelfThickness);
        fill(book.colour);
        rect(book.placementOffset, floorSeed - bookshelfThickness - bookHeightOffset, book.width, book.height);

      } else {
        shelfWidthMultiplier++;
        bookHeightOffset = 0;
        bookCount = 0;
      }
    }
  }
  return [bookshelfLength, bookshelfHeight, bookshelfPlacement];
}

function generateTable() {
  let tableLength, tableHeight, tablePlacement;
  if (!tableGenerated) {
    tableGenerated = true;
    noStroke();
    fill(tableColour);
    tableLength = random(windowWidth * 0.2, windowWidth * 0.4);
    tableHeight = random(windowHeight * 0.2, windowHeight * 0.25);
    tablePlacement = random(0, windowWidth - tableLength);
    const baseY = floorSeed - tableHeight;
    const tableThickness = 30;
    rect(tablePlacement, baseY, tableThickness, tableHeight);
    rect(tablePlacement, baseY, tableLength, tableThickness);
    rect(tablePlacement + tableLength - tableThickness, baseY, tableThickness, tableHeight);
  }
  return [tableLength, tableHeight, tablePlacement];
}

function generatePainting() {
  fill(paintingFrameColour);
  strokeWeight(5);
  stroke(paintingFrameOffsetColour);

  let paintingWidth, paintingHeight, paintingPlacementX, paintingPlacementY, paintingFrameThickness, pictureX, pictureY;
  if (!paintingFrameGenerated) {
    paintingFrameGenerated = true;
    paintingWidth = random(windowWidth * 0.1, windowWidth * 0.3);
    paintingHeight = random(windowWidth * 0.075, windowWidth * 0.15);
    paintingPlacementX = random(0, windowWidth - paintingWidth);
    paintingPlacementY = random(0, windowHeight * 0.2);

    paintingFrameThickness = 10;
    pictureX = paintingPlacementX + paintingFrameThickness;
    pictureY = paintingPlacementY + paintingFrameThickness;

    rect(paintingPlacementX, paintingPlacementY, paintingWidth, paintingHeight);

    fill(pictureSkyColour);
    noStroke();
    rect(pictureX, pictureY, paintingWidth - (paintingFrameThickness * 2), paintingHeight - (paintingFrameThickness * 2));

    if (canLocation === 'painting') {
      canXPos = random(pictureX, pictureX + paintingWidth - (paintingFrameThickness * 2) - canWidth);
      canYPos = random(pictureY + canHeight, pictureY + paintingHeight - (paintingFrameThickness * 2));
      const can = new Can(canXPos, canYPos, canColour);
      can.drawCan();
    }
  }
  return [paintingWidth, paintingHeight, pictureX, pictureY, paintingFrameThickness];
}

function generatePaintingArtwork(paintingWidth, paintingHeight, pictureX, pictureY, paintingFrameThickness) {
  const colourChoices = ['#97f84a', '#f8e501', '#286490', '#f45552', '#8e559c', '#f36d29'];

  if (!paintingLinesGenerated) {
    paintingLinesGenerated = true;

    for (let i = 0; i < 6; i++) {
      const chosenColour = colourChoices[Math.floor(Math.random() * colourChoices.length)];
      const y1 = random(0, paintingHeight - (paintingFrameThickness * 2));
      const y2 = random(0, paintingHeight - (paintingFrameThickness * 2));
      strokeWeight(2);
      stroke(chosenColour);
      line(pictureX, pictureY + y1, pictureX + paintingWidth - (paintingFrameThickness * 2), pictureY + y2);
    }
  }
}

function generateTableObjects(tableLength, tableHeight, tablePlacement) {
  const baseY = floorSeed - tableHeight;

  if (!tableObjectsGenerated) {
    tableObjectsGenerated = true;
    strokeWeight(1.5);
    stroke('#000000');
    for (let i = 0; i < 20; i++) {
      const chosenObject = tableObjects[Math.floor(Math.random() * tableObjects.length)];
      fill(random(0, 255), random(0, 255), random(0, 255));
      if (chosenObject === 'can') {
        const canColour = otherCanColours[Math.floor(Math.random() * otherCanColours.length)];
        const canPlacement = random(tablePlacement, tablePlacement + tableLength - canWidth);
        const can = new Can(canPlacement, baseY, canColour);
        can.drawCan();
      } else if (chosenObject === 'bowl') {
        const bowl = new Bowl(random((windowWidth * 0.03), (windowWidth * 0.06)), random((windowHeight * 0.01), (windowHeight * 0.1)));
        const bowlPlacement = random(tablePlacement + bowl.width, tablePlacement + tableLength - bowl.width);
        arc(bowlPlacement, baseY - (bowl.height / 2), bowl.width, bowl.height, 0, PI, CHORD);
      } else {  // sphere
        const sphere = new Sphere(random((windowWidth * 0.01), (windowWidth * 0.03)));
        const spherePlacement = random(tablePlacement + (sphere.diameter / 2), tablePlacement + tableLength - (sphere.diameter / 2));
        circle(spherePlacement, baseY - (sphere.diameter / 2), sphere.diameter);
      }
    }
    if (canLocation === 'table') {
      canXPos = random(tablePlacement, tablePlacement + tableLength - canWidth);
      canYPos = baseY;
      const can = new Can(canXPos, canYPos, canColour);
      can.drawCan();
    }
  }
}

function generateBookshelfObjects(bookshelfLength, bookshelfHeight, bookshelfPlacement) {
  const outerX = bookshelfPlacement;
  const outerY = floorSeed - bookshelfHeight;

  if (!bookshelfObjectsGenerated) {
    bookshelfObjectsGenerated = true;
    strokeWeight(1.5);
    stroke('#000000');
    for (let i = 0; i < 15; i++) {
      const chosenObject = bookshelfObjects[Math.floor(Math.random() * bookshelfObjects.length)];
      fill(random(0, 255), random(0, 255), random(0, 255));
      if (chosenObject === 'box') {
        const box = new Box(random((windowWidth * 0.01), (windowWidth * 0.04)), random((windowHeight * 0.02), (windowHeight * 0.05)));
        const boxPlacement = random(outerX, outerX + bookshelfLength - box.width);
        rect(boxPlacement, outerY - box.height, box.width, box.height);
      } else if (chosenObject === 'triangle') {
        const triangleShape = new Triangle(random((windowWidth * 0.01), (windowWidth * 0.03)), random((windowHeight * 0.05), (windowHeight * 0.1)));
        const trianglePlacement = random(outerX, outerX + bookshelfLength - triangleShape.width);
        triangle(trianglePlacement, outerY, trianglePlacement + triangleShape.width, outerY, trianglePlacement + (triangleShape.width / 2), outerY - triangleShape.height);
      } else if (chosenObject === 'can') {
        const canColour = otherCanColours[Math.floor(Math.random() * otherCanColours.length)];
        const canPlacement = random(outerX, outerX + bookshelfLength - canWidth);
        const can = new Can(canPlacement, outerY, canColour);
        can.drawCan();
      } else { // sphere
        const sphere = new Sphere(random((windowWidth * 0.01), (windowWidth * 0.03)));
        const spherePlacement = random(outerX + (sphere.diameter / 2), outerX + bookshelfLength - (sphere.diameter / 2));
        circle(spherePlacement, outerY - (sphere.diameter / 2), sphere.diameter);
      }
    }
    if (canLocation === 'bookshelf') {
      canXPos = random(bookshelfPlacement, bookshelfPlacement + bookshelfLength - canWidth);
      canYPos = floorSeed - bookshelfHeight;
      const can = new Can(canXPos, canYPos, canColour);
      can.drawCan();
    }
  }
}

function generateFloorObjects() {
  if (!floorObjectsGenerated) {
    floorObjectsGenerated = true;
    stroke(0);
    for (let i = 0; i < 30; i++) {
      const chosenObject = floorObjects[Math.floor(Math.random() * floorObjects.length)];
      fill(random(0, 255), random(0, 255), random(0, 255));
      if (chosenObject === 'box') {
        const box = new Box(random((windowWidth * 0.05), (windowWidth * 0.1)), random((windowHeight * 0.03), (windowHeight * 0.05)));
        const boxPlacement = random(0, windowWidth - box.width);
        rect(boxPlacement, floorSeed - box.height, box.width, box.height);
      } else if (chosenObject === 'triangle') {
        const triangleShape = new Triangle(random((windowWidth * 0.01), (windowWidth * 0.08)), random((windowHeight * 0.03), (windowHeight * 0.05)));
        const trianglePlacement = random(0, windowWidth - triangleShape.width);
        triangle(trianglePlacement, floorSeed, trianglePlacement + triangleShape.width, floorSeed, trianglePlacement + (triangleShape.width / 2), floorSeed - triangleShape.height);
      } else { // sphere
        const sphere = new Sphere(random((windowWidth * 0.03), (windowWidth * 0.06)));
        const spherePlacement = random(sphere.diameter / 2, windowWidth - (sphere.diameter / 2));
        circle(spherePlacement, floorSeed - (sphere.diameter / 2), sphere.diameter);
      }
    }
    if (canLocation === 'floor') {
      canXPos = random(0, windowWidth - canWidth);
      canYPos = floorSeed;
      const can = new Can(canXPos, canYPos, canColour);
      can.drawCan();
    }
  }
}

function gameCompleteScreen() {
  if (!screenCleared) {
    screenCleared = true;
    clear();
  }
  canWidth = windowWidth  * 0.2;
  canHeight = windowHeight * 0.5;
  const canPlacementX = (windowWidth / 2) - (canWidth / 2);
  const canPlacementY = (windowHeight / 2) + (canHeight / 2) - (windowHeight * 0.2);
  const can = new Can(canPlacementX, canPlacementY, canColour);
  can.drawCan();
  fill(0);
  textSize(windowWidth * 0.04);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  text("You found the red can!", windowWidth / 2, windowHeight / 2 + (windowHeight * 0.1));
  text("Never trust any can, except for the Red Can", windowWidth / 2, windowHeight / 2 + (windowHeight * 0.2));


  if (!cansGenerated) {
    cansGenerated = true;
    canWidth = windowWidth  * 0.1;
    canHeight = windowHeight * 0.3;
    for (let i = 0; i < 50; i++) {
      const placementX = random(0, windowWidth);
      const placementY = random(windowHeight + (canHeight * 0.1), windowHeight + canHeight/2/2);
      const canColour = otherCanColours[Math.floor(Math.random() * otherCanColours.length)];
      const canRotation = random(0, 2 * PI);
      translate(placementX, placementY);
      rotate(canRotation);
      const can = new Can(0, 0, canColour);
      can.drawCan();
      rotate(-canRotation);
      translate(-placementX, -placementY);
    }
  }
}

function mouseClicked() {
  if (!gameComplete && (mouseX >= canXPos && mouseX <= (canXPos + canWidth)) && (mouseY <= canYPos && mouseY >= (canYPos - canHeight))) {
    gameComplete = true;
  }
}