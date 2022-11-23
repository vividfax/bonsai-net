class Flower {

    constructor(x, y, originX, originY, data, root) {

        this.x = x;
        this.y = y;
        this.originX = originX;
        this.originY = originY;
        this.data = data;
        this.radius = 1;

        this.root = root;

        this.branch = false;
        this.colour = "#ffffff";
        this.maxRadius = 50;
        this.rotation = random(360);

        if (data.label) {
            this.label = data.label;
            this.link = data.link;
            this.button = createA(this.link, this.label, ["_blank"]);
        } else {
            this.label = Object.keys(data);
            this.link = "#" + this.label;
            this.button = createA(this.link, this.label, ["_self"]);

            this.branch = true;
            this.colour = color(31, 68, random(25, 35));
            this.maxRadius = 25;
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

        if (!flower.branch || flower.interacted) {
            return;
        }

        flower.root.grown = true;
        flower.interacted = true;

        for (let i = 0; i < flower.data[label].length; i++) {
            roots.push(new Root(flower.x, flower.y, flower.originX, flower.originY, flower.data[label][i]));
        }
    }
}