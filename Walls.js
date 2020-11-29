class Walls {
    constructor(widthX, widthY) {
        this.widthX = widthX;
        this.widthY = widthY;
        this.walls = [{ fromX: 0, fromY: 0, toX: widthX - 1, toY: 0 },
        { fromX: widthX - 1, fromY: 0, toX: widthX - 1, toY: widthY - 1 },
        { fromX: widthX - 1, fromY: widthY - 1, toX: 0, toY: widthY - 1 },
        { fromX: 0, fromY: widthY - 1, toX: 0, toY: 0 }];
    }

    impact(ring) {
        this.walls.forEach(function (item, index, array) {
        })       
    }

    draw() {
        fill(255, 255, 0);
        stroke(255, 255, 0);

        this.walls.forEach(function (item, index, array) {
            line(item.fromX, item.fromY, item.toX, item.toY);
        })
    }
}