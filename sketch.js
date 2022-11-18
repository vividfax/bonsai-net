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

    myAscii = new AsciiArt(this);
    createBackground();

    roots.push(new Root(0, 0, 0, 0, 0));

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

    roots.push(new Root(0, 0, 0, 0, 0));
}

function createBackground() {

    background("#FFB370");

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (y / height < random()) {
				set(x, y, color("#E38C9C"));
			}
		}
	}

    updatePixels();


    push();

    textAlign(CENTER, CENTER);
    textFont('Courier', 10/703*height);
    textStyle(NORMAL);
    noStroke();
    fill("#ffffff");

    asciiArray = myAscii.convert(treePng, width/10, height/10);
    myAscii.typeArray2d(asciiArray, canvas);

    pop();
}

function mousePressed() {

    if (!skipped) {
        skipped = true;

        while (flowers.length < Object.keys(json).length) {
            display();
        }
    }
}