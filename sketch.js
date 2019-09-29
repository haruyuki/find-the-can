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
let books = [];
let booksGenerated = false;
let bookshelfLocationGenerated = false;
let paintingSizeGenerated = false;
let paintingLinesGenerated = false;
let tableObjectsGenerated = false;
const canLocations = ['floor', 'table', 'bookshelf', 'painting'];
const canLocation = canLocations[Math.floor(Math.random() * canLocations.length)];

const objects = ['box', 'box', 'box', 'bowl', 'sphere', 'sphere'];
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
  generateBookshelf();
  const tableData = generateTable();
  generateFloor();
  generateTableObjects(tableData[0], tableData[1]);
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
  if (!booksGenerated) {
    booksGenerated = true;
    for (let i = 0; i < 60; i++) {
      const bookHeight = random(5, 20);
      const bookLength = random(shelfLength * 0.5, shelfLength) - bookshelfThickness;
      const book = new Book(bookLength, bookHeight, bookColours.pop());
      books.push(book);
    }
  }

  for (let i = 0; i < 4; i++) {
    const shelfWidth = innerX + (i * shelfLength);
    fill(bookshelfColour);
    stroke(bookshelfOffsetColour);
    rect(shelfWidth - bookshelfThickness, innerY, 10, bookshelfHeight - 20);
    let bookHeightOffset = 0;
    const bookSelection = i * 15;
    for (let j = bookSelection; j < bookSelection + 15; j ++) {
      noStroke();
      const book = books[j];
      bookHeightOffset += book.height;
      if (book.placementOffset === undefined) {
        book.placementOffset = shelfWidth + random(0, shelfLength - book.width - bookshelfThickness);
      }
      fill(book.colour);
      rect(book.placementOffset, floorSeed - bookshelfThickness - bookHeightOffset, book.width, book.height);
    }
  }
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
    stroke('#000000');
    for (i = 0; i < 20; i++) {
      const chosenObject = objects[Math.floor(Math.random() * objects.length)];
      if (chosenObject === 'box') {
        fill(random(0, 255), random(0, 255), random(0, 255));
        const box = new Box(random((windowWidth * 0.01), (windowWidth * 0.03)), random((windowHeight * 0.05), (windowHeight * 0.1)));
        const boxPlacement = random(baseX, baseX + tableLength - box.width);
        rect(boxPlacement, baseY - box.height, box.width, box.height);
      } else if (chosenObject === 'bowl') {
        fill(random(0, 255), random(0, 255), random(0, 255));
        const bowl = new Bowl(random((windowWidth * 0.03), (windowWidth * 0.06)), random((windowHeight * 0.01), (windowHeight * 0.1)));
        const bowlPlacement = random(baseX + bowl.width, baseX + tableLength - bowl.width);
        arc(bowlPlacement, baseY - (bowl.height / 2), bowl.width, bowl.height, 0, PI, CHORD);
      } else {  // sphere
        fill(random(0, 255), random(0, 255), random(0, 255));
        const sphere = new Sphere(random((windowWidth * 0.01), (windowWidth * 0.03)));
        const spherePlacement = random(baseX + (sphere.diameter / 2), baseX + tableLength - (sphere.diameter / 2));
        circle(spherePlacement, baseY - (sphere.diameter / 2), sphere.diameter);

      }
    }
  }
}