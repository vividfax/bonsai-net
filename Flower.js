class Flower {

    constructor(x, y, originX, originY, id, root) {

        this.x = x;
        this.y = y;
        this.originX = originX;
        this.originY = originY;
        this.id = id-1;
        this.radius = 1;

        this.root = root;

        this.branch = false;
        this.colour = "#ffffff";
        this.maxRadius = 50;
        this.rotation = random(360);

        if (typeof(id) == "number") {
            this.label = Object.keys(json)[id-1];
            this.link = "#" + this.label;

            this.branch = true;
            this.colour = color(31, 68, random(25, 35));
            this.maxRadius = 25;
        } else {
            this.label = id.label;
            this.link = id.link;
        }

        this.button;

        if (typeof(id) != "number") {
            this.branch = false;
            this.button = createA(this.link, this.label, ["_blank"]);
        } else {
            this.button = createA(this.link, this.label, ["_self"]);
        }
        this.button.position(width/2 - this.x -5, height+100 - this.y -10);
        this.button.style("background-color", "#FFF2F2");

        this.button.mouseClicked(this.clicked);

        this.button.flower = this;

        this.interacted = false;
    }

    update() {

        if (this.radius < this.maxRadius) {
            this.radius++;
        }
    }

    display() {

        push();
        translate(width/2, height+100);
        rotate(180);

        fill("#4B5C2F");

        if (this.interacted) {
            fill(this.colour);
        }

        translate(this.x, this.y);
        rotate(this.rotation);

        if (!this.branch) {
            image(flowerPng, 0, 0, this.radius, this.radius);
        } else {
            ellipse(0, 0, this.radius);
        }

        pop();
    }

    hover() {

        if (dist(mouseX, mouseY, width/2 - this.x, height+100 - this.y) < this.radius/2) {
            return true;
        }
    }

    displayLink() {

        this.button.show();

    }

    hideLink() {

        this.button.hide();
    }

    clicked() {

        let label = this.elt.innerHTML;
        let flower = this.flower; //

        if (flower.root.grown || isNaN(flower.id)) {
            return;
        }

        flower.root.grown = true;
        flower.interacted = true;

        for (let i = 0; i < json[label].length; i++) {

            roots.push(new Root(flower.x, flower.y, flower.originX, flower.originY, json[flower.label][i]));
        }
    }
}