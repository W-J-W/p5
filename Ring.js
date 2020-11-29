var ringKey = 0;
class Ring {
    constructor(diameter, bodyColorRed, bodyColorGreen, bodyColorBlue, positionX, positionY) {
        this.key = ringKey;
        ringKey++;
        this.timeInMilliSeconds = 0;
        this.maxDiameter = diameter;
        this.diameter = diameter;
        this.bodyColor = {
            red: bodyColorRed,
            green: bodyColorGreen,
            blue: bodyColorBlue
        }
        this.position = createVector(positionX, positionY);
        this.speed = createVector(0, 0); // pixel per millisecond
    }

    setDiameter(diameter) {
        this.maxDiameter = diameter;
        this.diameter = diameter;
    }

    setDiameterByTime(milliSeconds) {
        var duration = milliSeconds / 10;
        this.diameter = duration % (this.maxDiameter * 2);
        if (this.diameter > this.maxDiameter) {
            this.diameter = (this.maxDiameter * 2) - this.diameter;
        }
    }

    diameter() {
        return this.diameter;
    }

    postion() {
        return this.position;
    }

    speed() {
        return this.speed;
    }

    setSpeed(speedX, speedY) {
        this.speed.set(speedX, speedY);
    }

    draw(milliSeconds) {
        let passedTime = milliSeconds - this.timeInMilliSeconds;
        this.timeInMilliSeconds = milliSeconds;
        this.position.x += passedTime / 100 * this.speed.x;
        this.position.y += passedTime / 100 * this.speed.y;
        fill(this.bodyColor.red, this.bodyColor.green, this.bodyColor.blue);
        stroke(0, 0, 0);

        circle(this.position.x, this.position.y, this.diameter);

        fill(220, 0, 200); // background

        if (this.diameter > 30) {
            circle(this.position.x, this.position.y, this.diameter - 30);
        }

        stroke(this.bodyColor.red, this.bodyColor.green, this.bodyColor.blue)
        line(this.position.x, this.position.y, this.position.x + 40 * this.speed.x, this.position.y + 40 * this.speed.y); 
    }
}