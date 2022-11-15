let roots = [];
let flowers = [];

let json;
let flowerPng;

let skipped = false;

function preload() {

    json = loadJSON("./links.json");
    flowerPng = loadImage("./flower.png");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    noStroke();
    angleMode(DEGREES);
    imageMode(CENTER);

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

    background("#FFBE85");

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (y / height < random()) {
				set(x, y, color("#e79dab"));
			}
		}
	}

    updatePixels();
}

function mousePressed() {

    if (!skipped) {
        skipped = true;

        while (flowers.length < Object.keys(json).length) {
            display();
        }
    }
}