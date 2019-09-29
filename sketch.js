let floorSeed, tableSeed;

const wallColour = '#faf0dc';
const floorColour = '#cd9169';
const bookshelfColour = '#fbfaf8';
const bookshelfOffsetColour = '#ccc0a8';
const tableColour = '#d5a16a';
const paintingFrameColour = '#eeeeee';
const paintingFrameOffsetColour = '#c8c8c8';
const pictureSkyColour = '#87ceeb';
let bookColours = [];
let booksGenerated = false;
let bookshelfLocationGenerated = false;
let paintingSizeGenerated = false;
let paintingLinesGenerated = false;
let tableObjectsGenerated = false;
let bookshelfObjectsGenerated = false;
let floorObjectsGenerated = false;
const canLocations = ['floor', 'table', 'bookshelf', 'painting'];
const canLocation = canLocations[Math.floor(Math.random() * canLocations.length)];

const tableObjects = ['box', 'box', 'box', 'bowl', 'sphere', 'sphere'];
const bookshelfObjects = ['box', 'sphere', 'triangle'];
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

function Can(x, y) {
  this.x = x;
  this.y = y;
  this.location = canLocation;
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
  Can.width = windowWidth * 0.02;
  Can.height = windowHeight * 0.02;
  background(wallColour);
  floorSeed = random(windowHeight - (windowHeight * 0.2), windowHeight - (windowHeight * 0.1));
  tableSeed = random(0, windowWidth - (windowWidth * 0.15));
}

function draw() {
  // put drawing code here
  livingRoom();
}

function livingRoom() {
  const paintingData = generatePainting();
  generatePaintingArtwork(paintingData[0], paintingData[1], paintingData[2], paintingData[3], paintingData[4]);
  const bookshelfData = generateBookshelf();
  const tableData = generateTable();
  generateTableObjects(tableData[0], tableData[1]);
  generateBookshelfObjects(bookshelfData[0], bookshelfData[1], bookshelfData[2]);
  generateFloorObjects();
  generateFloor();
}

function generateFloor() {
  noStroke();
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
  fill(bookshelfColour);
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
  noStroke();
  fill(tableColour);
  const tableLength = (windowWidth * 0.4);
  const tableHeight = (windowHeight * 0.25);
  const baseX = tableSeed;
  const baseY = floorSeed - tableHeight;
  const tableThickness = 30;
  rect(baseX, baseY, tableThickness, tableHeight);
  rect(baseX, baseY, tableLength, tableThickness);
  rect(baseX + tableLength - tableThickness, baseY, tableThickness, tableHeight);

  return [tableLength, tableHeight];
}

function generatePainting() {
  fill(paintingFrameColour);
  strokeWeight(5);
  stroke(paintingFrameOffsetColour);

  let paintingWidth, paintingHeight, paintingPlacementX, paintingPlacementY;
  if (!paintingSizeGenerated) {
    paintingSizeGenerated = true;
    paintingWidth = random(windowWidth * 0.05, windowWidth * 0.3);
    paintingHeight = random(windowWidth * 0.05, windowWidth * 0.15);
    paintingPlacementX = random(0, windowWidth - paintingWidth);
    paintingPlacementY = random(0, windowHeight * 0.2);
  }
  const paintingFrameThickness = 10;
  const pictureX = paintingPlacementX + paintingFrameThickness;
  const pictureY = paintingPlacementY + paintingFrameThickness;

  rect(paintingPlacementX, paintingPlacementY, paintingWidth, paintingHeight);

  fill(pictureSkyColour);
  noStroke();
  rect(pictureX, pictureY, paintingWidth - (paintingFrameThickness * 2), paintingHeight - (paintingFrameThickness * 2));
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

function generateTableObjects(tableLength, tableHeight) {
  const baseX = tableSeed;
  const baseY = floorSeed - tableHeight;

  if (!tableObjectsGenerated) {
    tableObjectsGenerated = true;
    strokeWeight(1.5);
    stroke('#000000');
    for (let i = 0; i < 20; i++) {
      const chosenObject = tableObjects[Math.floor(Math.random() * tableObjects.length)];
      fill(random(0, 255), random(0, 255), random(0, 255));
      if (chosenObject === 'box') {
        const box = new Box(random((windowWidth * 0.01), (windowWidth * 0.03)), random((windowHeight * 0.05), (windowHeight * 0.1)));
        const boxPlacement = random(baseX, baseX + tableLength - box.width);
        rect(boxPlacement, baseY - box.height, box.width, box.height);
      } else if (chosenObject === 'bowl') {
        const bowl = new Bowl(random((windowWidth * 0.03), (windowWidth * 0.06)), random((windowHeight * 0.01), (windowHeight * 0.1)));
        const bowlPlacement = random(baseX + bowl.width, baseX + tableLength - bowl.width);
        arc(bowlPlacement, baseY - (bowl.height / 2), bowl.width, bowl.height, 0, PI, CHORD);
      } else {  // sphere
        const sphere = new Sphere(random((windowWidth * 0.01), (windowWidth * 0.03)));
        const spherePlacement = random(baseX + (sphere.diameter / 2), baseX + tableLength - (sphere.diameter / 2));
        circle(spherePlacement, baseY - (sphere.diameter / 2), sphere.diameter);
      }
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
        const box = new Box(random((windowWidth * 0.01), (windowWidth * 0.03)), random((windowHeight * 0.05), (windowHeight * 0.1)));
        const boxPlacement = random(outerX, outerX + bookshelfLength - box.width);
        rect(boxPlacement, outerY - box.height, box.width, box.height);
      } else if (chosenObject === 'triangle') {
        const triangleShape = new Triangle(random((windowWidth * 0.01), (windowWidth * 0.03)), random((windowHeight * 0.05), (windowHeight * 0.1)));
        const trianglePlacement = random(outerX, outerX + bookshelfLength - triangleShape.width);
        triangle(trianglePlacement, outerY, trianglePlacement + triangleShape.width, outerY, trianglePlacement + (triangleShape.width / 2), outerY - triangleShape.height);
      } else { // sphere
        const sphere = new Sphere(random((windowWidth * 0.01), (windowWidth * 0.03)));
        const spherePlacement = random(outerX + (sphere.diameter / 2), outerX + bookshelfLength - (sphere.diameter / 2));
        circle(spherePlacement, outerY - (sphere.diameter / 2), sphere.diameter);
      }
    }
  }
}

function generateFloorObjects() {
  if (!floorObjectsGenerated) {
    floorObjectsGenerated = true;
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
        circle(spherePlacement, floorSeed - (sphere.diameter /2), sphere.diameter);
      }
    }
  }
}