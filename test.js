function setup() {

    let planes = new Array(5);
    // Right plane
    planes[0] = new Plane(createVector(399, 0, 0), createVector(0, 1, 0), createVector(0, 0, 1));
    // Bottom plane
    planes[1] = new Plane(createVector(0, 399, 0), createVector(1, 0, 0), createVector(0, 0, 1));
    // Left plane
    planes[2] = new Plane(createVector(0, 0, 0), createVector(0, 1, 0), createVector(0, 0, 1)); 
    // Top plane
    planes[3] = new Plane(createVector(0, 0, 0), createVector(1, 0, 0), createVector(0, 0, 1));
    // Diagonal plan
    planes[4] = new Plane(createVector(0, 0, 0), createVector(1, 1, 0), createVector(0, 0, 1));
 
    let point = createVector(200, 200, 0);
    let vector = createVector(-1, 0, 0);
    print('Point', point.x, point.y, point.z);
    print('Vector', vector.x, vector.y, vector.z);

    planes.forEach(plane => {
        var distance = plane.distanceOfPoint(point);
        print('Distance', distance);
        print('Normalvector', plane._normalVector.x, plane._normalVector.y, plane._normalVector.z);
        print('Length', plane._normalVectorLength);
        print('Angle between vector and normal vector', plane.angleToNormalVector(vector), '(',
              plane.angleToNormalVector(vector) * 360 / 2 / Math.PI, ')');
    })
}

function draw() {

}