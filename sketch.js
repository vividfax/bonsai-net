let roots = [];
let flowers = [];

let json;
let flowerPng;
let treePng;

let skipped = false;

let canvas;
let asciiCanvas;
let myAscii;
let asciiArray;

function preload() {

    json = loadJSON("./links.json");
    flowerPng = loadImage("./flower.png");
    treePng = loadImage("./tree.jpg");
}

function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    asciiCanvas = createGraphics(windowWidth, windowHeight)
    colorMode(HSB);
    noStroke();
    angleMode(DEGREES);
    imageMode(CENTER);

    // json = json.categories;

    myAscii = new AsciiArt(this);
    asciiArray = myAscii.convert(treePng, width/10, height/10);

    createBackground();

    roots.push(new Root(0, 0, 0, 0, json.categories));

    let resetButton = createButton("Reset");
    resetButton.position(10, 10);
    resetButton.mousePressed(reset);
}

function draw() {

    display();
}

function display() {

    for (let i = 0; i < roots.length; i++) {

        roots[i].update();
        roots[i].display();
        roots[i].update();
        roots[i].display();
        roots[i].update();
        roots[i].display();
        roots[i].update();
        roots[i].display();
    }

    for (let i = 0; i < flowers.length; i++) {

        flowers[i].update();
        flowers[i].display();

        if (flowers[i].hover()) {
            flowers[i].displayLink();
        } else {
            flowers[i].hideLink();
        }
    }
}

function reset() {

    roots = [];
    flowers = [];

    updatePixels();
    displayAscii();

    roots.push(new Root(0, 0, 0, 0, json.categories));
}

function createBackground() {

    background("#FFA85C");

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (y / height < random()) {
				set(x, y, color("#DF7C8E"));
			}
		}
	}

    updatePixels();
    displayAscii();
}

function mousePressed() {

    if (!skipped) {
        skipped = true;

        while (flowers.length < Object.keys(json).length) {
            display();
        }
    }
}

function displayAscii() {

    push();

    textAlign(CENTER, CENTER);
    textFont('Courier', 10/703*height);
    textStyle(NORMAL);
    noStroke();
    fill("#ffffff");

    myAscii.typeArray2d(asciiArray, canvas);

    pop();
}