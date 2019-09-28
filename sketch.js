let floorSeed, tableSeed;

let transparent;
const wallColour = '#faf0dc';
const floorColour = '#cd9169';
const bookshelfColour = '#fbfaf8';
const tableColour = '#d5a16a';
let bookColours = [];
let books = [];
let booksGenerated = false;
let bookshelfLocationGenerated = false;

function preload() {
  // load any assets (images, sounds etc.) here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  transparent = color('rgba(0,0,0,0)');
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
  stroke('#ccc0a8');
  let bookshelfPlacement;
  const bookshelfLength = (windowWidth * 0.5);
  const bookshelfHeight = (windowHeight * 0.5);
  if (!bookshelfLocationGenerated) {
    bookshelfLocationGenerated = true;
    bookshelfPlacement = random(0, windowWidth - bookshelfLength);
  }
  const bookshelfThickness = 10;
  const outerX = bookshelfPlacement;
  const outerY = floorSeed - bookshelfHeight;
  const innerX = outerX + bookshelfThickness;
  const innerY = outerY + bookshelfThickness;
  rect(outerX, outerY, bookshelfLength + (bookshelfThickness * 2), bookshelfHeight);
  fill(transparent);
  rect(innerX, innerY, bookshelfLength, bookshelfHeight - 20);

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
    stroke('#ccc0a8');
    rect(shelfWidth - bookshelfThickness, innerY, 10, bookshelfHeight - 20);
    let bookHeightOffset = 0;
    const bookSelection = i * 15;
    for (let j = bookSelection; j < bookSelection + 15; j ++) {
      const book = books[j];
      bookHeightOffset += book.height;
      if (book.placementOffset === undefined) {
        book.placementOffset = shelfWidth + random(0, shelfLength - book.width);
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