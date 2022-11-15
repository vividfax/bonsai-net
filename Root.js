class Root {

    constructor(x, y, originX, originY, id) {

        this.originX = originX;
        this.originY = originY;

        this.x = x;
        this.y = y;

        this.dirX = random(-1, 1);
        this.dirY = random(0, 1);

        this.id = id;

        this.age = 0;
        this.dead = false;
        this.grown = false;
    }

    update() {

        if (this.dead) return;

        if (this.y > height) {

            flowers.push(new Flower(this.x, this.y, this.originX, this.originY, this.id, this));
            this.dead = true;
        }

        if (!this.dead) {

            if (this.x > width/2 -width/17 || this.x < -width/2 +width/17) {
                this.dirX *= -1;
            }

            this.x += this.dirX*2;
            this.y += this.dirY;

            if (random() < 0.01) {
                this.dirX = random(-1, 1);
                this.dirY = random(0.5, 1);
            }
        }

        if (roots[0] == this && this.y > 200) {

            while (roots.length < Object.keys(json).length+1) {
                roots.push(new Root(this.x, this.y, this.originX, this.originY, roots.length));
            }

            this.dead = true;
        }

        if (roots[0] != this && this.age > 200 && random() < 0.007) {

            if (!this.dead) {

                flowers.push(new Flower(this.x, this.y, this.originX, this.originY, this.id, this));
            }

            this.dead = true;
        }

        if (!this.dead) {
            this.age++;
        }
    }

    display() {

        push();
        translate(width/2, height+100);
        rotate(180);

        let size = 200/(this.y-this.originY+10);

        if (!this.dead && size*20 < 50) {
            fill(31, 68, random(25, 35));
            noStroke();
            ellipse(this.x, this.y, size * 29);
        }

        pop();
    }
}
