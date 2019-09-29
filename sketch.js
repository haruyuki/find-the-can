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
let lines = [];
let booksGenerated = false;
let bookshelfLocationGenerated = false;
let paintingSizeGenerated = false;
let paintingLinesGenerated = false;

function preload() {
  // load any assets (images, sounds etc.) here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  for (let i = 0; i < 60; i++) {
    bookColours.push(color(random(0, 255), random(0, 255), random(0, 255)));
  }
  background(wallColour);
  floorSeed = random(windowHeight - (windowHeight * 0.2), windowHeight - (windowHeight * 0.1));
  tableSeed = random(0, windowWidth - (windowWidth * 0.15));
}

function draw() {
  // put drawing code here
  livingRoom();
}

function livingRoom() {
  generatePainting();
  generateBookshelf();
  generateTable();
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
}

function generatePainting() {
  function DrawnLine(x1, y1, x2, y2, colour) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.colour = colour;
  }

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


  const colourChoices = ['#97f84a', '#f8e501', '#286490', '#f45552', '#8e559c', '#f36d29'];
  if (!paintingLinesGenerated) {
    paintingLinesGenerated = true;
    for (let i = 0; i < 6; i++) {
      const chosenColour = colourChoices[Math.floor(Math.random() * colourChoices.length)];
      const y1 = random(0, paintingHeight - (paintingFrameThickness * 2));
      const y2 = random(0, paintingHeight - (paintingFrameThickness * 2));
      lines.push(new DrawnLine(pictureX, pictureY + y1, pictureX + paintingWidth - (paintingFrameThickness * 2), pictureY + y2, chosenColour));
    }
  }

  lines.forEach(function (drawnLine) {
    strokeWeight(2);
    stroke(drawnLine.colour);
    line(drawnLine.x1, drawnLine.y1, drawnLine.x2, drawnLine.y2);
  });
}