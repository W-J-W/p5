let rings = new Array(3);
let planes = new Array(4);

let walls = new Walls(400, 400);

var time = 0;
function milliTime() {
    return millis();
    //return time;
}

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('sketch-container');
    print("Hello");

    // Right plane
    planes[0] = new Plane(createVector(399, 0, 0), createVector(0, 1, 0), createVector(0, 0, 1));
    // Bottom plane
    planes[1] = new Plane(createVector(0, 399, 0), createVector(1, 0, 0), createVector(0, 0, 1));
    // Left plane
    planes[2] = new Plane(createVector(0, 0, 0), createVector(0, 1, 0), createVector(0, 0, 1));
    // Top plane
    planes[3] = new Plane(createVector(0, 0, 0), createVector(1, 0, 0), createVector(0, 0, 1));

    // Red circle (black border)
    rings[0] = new Ring(150, 255, 0, 0, 300, 300);
    rings[0].setSpeed(-1, 0);
    // Yellow circle
    rings[1] = new Ring(80, 255, 255, 0, 300, 200);
    rings[1].setSpeed(0, 1);
    // Greenish circle, )black border)
    rings[2] = new Ring(180, 100, 255, 0, 250, 200);
    rings[2].setSpeed(1, -1);
}

function draw() {

    document.getElementById("time").innerHTML = milliTime()
    
    var plane = new Plane(createVector(399, 0, 0), createVector(0, 1, 0), createVector(0, 0, 1));
    var nV = plane.normalVector();

    background(220, 0, 200);

    rings.forEach((ring) => {
        var ringId = "ring_" + ring.key;
        ring.setDiameterByTime(milliTime());
        ring.draw(milliTime());

        var currentCenterOfRing = createVector(ring.position.x, ring.position.y, 0);

        print('- - - -');
        print('Speed ring', ring.speed.x, ring.speed.y, ring.speed.z);
        planes.forEach((plane) => {
            var planeId = "plane_" + plane.key;
            var distance = plane.distanceOfPoint(currentCenterOfRing);
            print("Normalvector of'", plane.key, "'", plane._normalVector.x, plane._normalVector.y, plane._normalVector.z);
            print('Distance', distance);

            var angle = plane.angleToNormalVector(ring.speed);
            print('Angle between vector and normal vector', angle, '(', angle * 360 / 2 / Math.PI, ')');

            document.getElementById(ringId + "_dst_from_" + planeId).innerHTML = Math.round(distance);
            document.getElementById(ringId + "_angle_" + planeId).innerHTML = angle * 360 / 2 / Math.PI;

            if ( (plane.distanceOfPoint(currentCenterOfRing) > 0) && (angle > Math.PI / 2) ||
                 (plane.distanceOfPoint(currentCenterOfRing) < 0) && (angle < Math.PI / 2)   ) {

                if (Math.abs(plane.distanceOfPoint(currentCenterOfRing)) <= ring.diameter / 2) {
                    if (plane._normalVector.x != 0) {
                        ring.setSpeed(-ring.speed.x, ring.speed.y);
                    }
                    if (plane._normalVector.y != 0) {
                        ring.setSpeed(ring.speed.x, -ring.speed.y);
                    }
                }
            }

            document.getElementById(ringId + "_speed").innerHTML = "(" + ring.speed.x + "/" + ring.speed.y + "/" + ring.speed.z + ")";
       })
    })

    // Black Line that moves from corner to corner

    fill(255, 255);
    stroke(0);

    duration = floor(milliTime() / 10);
    remainder = duration % 3200;

    if (remainder < 400) {
        line(0, 0, 399, remainder - 0);               // top-left,                    top-right to bottom-right
    } else if (remainder < 800) {
        line(remainder - 400, 0, 399, 399);           // top-left to top-right,       bottom-right
    } else if (remainder < 1200) {
        line(399, 0, 399 - (remainder - 800), 399);   // top-right,                   bottom-right to bottom-left
    } else if (remainder < 1600) {
        line(399, remainder - 1200, 0, 399);          // top-right to bottom-right,   bottom-left
    } else if (remainder < 2000) {
        line(399, 399, 0, 399 - (remainder - 1600));  // bottom-right,                bottom-left to top-left
    } else if (remainder < 2400) {
        line(399 - (remainder - 2000), 399, 0, 0);    // bottom-right to bottom-left, top-left
    } else if (remainder < 2800) {
        line(0, 399, remainder - 2400, 0);            // bottom-left,                 top-left to top-right
    } else {
        line(0, 399 - (remainder - 2800), 399, 0);    // bottom-left to top-left,     top-right
    }

    // White rectanle (black border), opaque

    rect(30, 20, 55, 55);

    // Walls

    walls.draw();

    // Yellow rectanle (orange border), semit transparent

    fill(255, 255, 0, 125);
    stroke(255, 127, 0);

    rect(mouseX, mouseY, 100, 100);
    time = time + 1;
}