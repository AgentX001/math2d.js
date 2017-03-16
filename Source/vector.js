/**
 * @class Vector
 */
class Vector {
    /**
     * @param {number} len 
     * @param {number} dir 
     */
    constructor(len, dir) {
        if (typeof len != "number" || typeof dir != "number" || isNaN(len) || isNaN(dir)) 
            throw new TypeError("length and direction must be a number!");
        
        this._len = len;
        this._dir = dir;
    }

    set length(newLen) {
        if (typeof newLen != "number" || isNaN(newLen)) 
            throw new TypeError("length must be a number!");
        this._len = newLen;   
    }

    set direction(newDir) {
        if (typeof newDir != "number" || isNaN(newDir)) 
            throw new TypeError("direction must be a number!");
        this._dir = newDir;
    }

    get length() {
        return this._len;
    }

    get direction() {
        return this._dir;
    }

    /** 
     * @readonly
     */
    get endPoint() {
        return new Point(this._len * Math.cos(this._dir), this._len * Math.sin(this._dir));
    }

    /**
     * @returns {Vector}
     */
    copy() {
        return new Vector(this._len, this._dir);
    }

    /**
     * @returns {string} 
     */ 
    toString() {
        return "length: " + String(this._len) + "; direction: " + String(this._dir);
    }

    /**
     * @param {number} factor 
     * @returns {Vector} - this
     */
    multi(factor) {
        if (typeof factor != "number" || isNaN(factor)) 
            throw new TypeError("factor must be a number!");
        this._len *= factor;

        return this;
    }

    /**
     * @param {number} angle 
     * @returns {Vector} - this
     */
    rotate(angle) {
        if (typeof angle != "number" || isNaN(angle)) 
            throw new TypeError("angle must be a number!");
        let rad = (this._dir + angle) % rad360;
        if (rad < 0) {
            if (rad / rad360 < -1) {
                rad += Math.floor((-rad) / rad360) * rad360
            } else {
                rad += rad360;
            }
        }
        this._dir = rad;

        return this;
    }

    /**
     * @static
     * @param {Point} point0 
     * @param {Point} point1 
     * @returns {Point}
     */
    static fromPoints(point0, point1) {
        if (point0 instanceof Point && point1 instanceof Point) {
            let len = point0.distanceTo(point1),
                dir = point0.directionTo(point1);
            return new Vector(len, dir);
        } else {
            throw new TypeError("arguments must be a points!");
        }
    }
}