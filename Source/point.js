/** 
 * @class Point
 */
class Point {
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        if (typeof x != "number" || typeof y != "number" || isNaN(x) || isNaN(y)) 
            throw new TypeError("x and y must be a number!");

        this._x = x;
        this._y = y;
    }

    set x(newX) {
        if (typeof newX != "number" || isNaN(newX)) 
            throw new TypeError("x must be a number!");
        this._x = newX;
    }

    set y(newY) {
        if (typeof newY != "number" || isNaN(newY)) 
            throw new TypeError("y must be a number!");
        this._y = newY;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    /**
     * @param {Point} point 
     * @returns {number}
     */
    distanceTo(point) {
        if (point instanceof Point) {
            let dx = this._x - point.x,
                dy = this._y - point.y;
            return Math.sqrt(dx*dx + dy*dy);            
        } else {
            throw new TypeError("argument must be a point!");
        }
    }

    /**
     * @param {Point} point 
     * @returns {number}
     */
    directionTo(point) {
        if (point instanceof Point) {
            let dx = point.x - this._x,
                dy = point.y - this._y;
            let rad =  Math.atan2(dy, dx) % rad360;
            rad += (rad < 0) ? rad360 : 0;
            return rad;      
        } else {
            throw new TypeError("argument must be a point!");
        }
    }

    /**
     * @returns {Point}
     */
    copy() {
        return new Point(this._x, this._y);
    }

    /**
     * @example 
     * // returns "{x: 3; y: 5}"
     * var point = new Point(3, 5);
     * point.toString();
     * @returns {string} 
     */ 
    toString() {
        return "x: " + String(this._x) + "; y: " + String(this._y);
    }

    /**
     * @example 
     * // returns {x: 3, y: 5}
     * var point = new Point(3, 5);
     * point.toObject();
     * @returns {object} 
     */ 
    toObject() {
        let x = this._x;
        let y = this._y;
        return {"x": x, "y": y};
    }

    /**
     * @example 
     * // returns [3, 5]
     * var point = new Point(3, 5);
     * point.toArray();
     * @returns {array} 
     */ 
    toArray() {
        let x = this._x;
        let y = this._y;
        return [x, y];
    }

    /**
     * @param {Point} point 
     * @returns {Point} - this
     */
    add(point) {
        if (point instanceof Point) {
            this._x += point.x;
            this._y += point.y;
        } else {
            throw new TypeError("argument must be a point!");
        }

        return this;
    }

    /**
     * @param {Point} point 
     * @returns {Point} - this
     */
    sub(point) {
        if (point instanceof Point) {
            this._x -= point.x;
            this._y -= point.y;
        } else {
            throw new TypeError("argument must be a point!");
        }

        return this;
    }

    /**
     * @param {Vector} vector 
     * @returns {Point} - this
     */
    addVector(vector) {
        if (vector instanceof Vector) {
            let point = vector.endPoint;
            this.add(point);
        } else {
            throw new TypeError("argument must be a vector!");
        }

        return this;
    }

    /**
     * @param {Vector} vector 
     * @returns {Point} - this
     */
    subVector(vector) {
        if (vector instanceof Vector) {
            let point = vector.endPoint;
            this.sub(point);
        } else {
            throw new TypeError("argument must be a vector!");
        }

        return this;
    }

    /**
     * @param {number} factor 
     * @returns {Point} - this
     */
    multi(factor) {
        if (typeof factor != "number" || isNaN(factor)) 
            throw new TypeError("factor must be a number!");
        this._x *= factor;
        this._y *= factor;

        return this;
    }

    /**
     * @param {number} angle 
     * @param {Point} center 
     * @returns {Point} - this 
     */
    rotate(angle, center) {
        if (typeof angle != "number" || isNaN(angle)) 
            throw new TypeError("angle must be a number!");
        if (!(center instanceof Point)) {
            throw new TypeError("center must be a point!");
        }
         
        let c = this.copy();
        c.sub(center);
        let x = center.x + c.x * Math.cos(angle) - c.y * Math.sin(angle);
        let y = center.y + c.y * Math.cos(angle) + c.x * Math.sin(angle);
        this._x = x;
        this._y = y;

        return this;
    }

    /**
     * @returns {Point} - this 
     */
    round() {
        let x = Math.round(this._x);
        let y = Math.round(this._y);
        this._x = x;
        this._y = y;

        return this;
    }
}