var planeKey = 0;
class Plane {
    /**
     * @param {p5.Vector} initVecor         One point of the plan (Aufvektor)
     * @param {p5.Vector} directionVector1  First directional vector of the plane
     * @param {p5.Vector} directionVector2  Second drectional vector of the plane
     */
    constructor(initVector, directionVector1, directionVector2) {
        this.key = planeKey;
        planeKey++;        
        this._initVektor = initVector;
        this._directionVector1 = directionVector1;
        this._directionVector2 = directionVector2;
    }

    _calculateNormalVector() {
            // cross product
            this._yz = this._directionVector1.y * this._directionVector2.z - this._directionVector1.z * this._directionVector2.y;
            this._xz = this._directionVector1.z * this._directionVector2.x - this._directionVector1.x * this._directionVector2.z;
            this._xy = this._directionVector1.x * this._directionVector2.y - this._directionVector1.y * this._directionVector2.x;

            this._normalVector = createVector(this._yz, this._xz, this._xy);

            // length of normalVector
            this._normalVectorLength = Math.sqrt(this._yz * this._yz +
                                                 this._xz * this._xz +
                                                 this._xy * this._xy);
    }

    normalVector() {
        if (!this._normalVector) {
            this._calculateNormalVector();
        }
        return this._normalVector;
    }

    angleToNormalVector(vector) {
        if (!this._normalVector) {
            this._calculateNormalVector();
        }

        let scalarProduct = vector.x * this._normalVector.x + vector.y * this._normalVector.y + vector.z * this._normalVector.z;
        let vectorLength = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
        let cosinusVecorNormalVecor = scalarProduct / (vectorLength * this._normalVectorLength);
        let angle = Math.acos(cosinusVecorNormalVecor);

        return angle;
    }

    distanceOfPoint(point) {
        if (!this._normalVector) {
            this._calculateNormalVector();
        }

        if (!this._yz_xz_xy_norm) {
            this._yz_norm = this._yz / this._normalVectorLength;
            this._xz_norm = this._xz / this._normalVectorLength;
            this._xy_norm = this._xy / this._normalVectorLength;
            this._yz_xz_xy_norm = this._initVektor.x * this._yz_norm 
                                + this._initVektor.y * this._xz_norm
                                + this._initVektor.z * this._xy_norm;
        }

        return(point.x * this._yz_norm + point.y * this._xz_norm + point.z * this._xy_norm - this._yz_xz_xy_norm);

    }
}