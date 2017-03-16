"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author AgentX001 <ilya.buligin.agentx001@gmail.com>
 * @version 0.0.5
 */

var degsInRad = 180 / Math.PI,
    radsInDeg = Math.PI / 180,
    rad360 = Math.PI * 2;

Number.prototype.toDeg = function () {
    var deg = this * degsInRad % 360;
    if (deg < 0) {
        if (deg / 360 < -1) {
            deg += Math.floor(-deg / 360) * 360;
        } else {
            deg += 360;
        }
    }
    return deg;
};

Number.prototype.toRad = function () {
    var rad = this * radsInDeg % rad360;
    if (rad < 0) {
        if (rad / rad360 < -1) {
            rad += Math.floor(-rad / rad360) * rad360;
        } else {
            rad += rad360;
        }
    }
    return rad;
};

CanvasRenderingContext2D.prototype.drawPoint = function (point) {
    this.beginPath();
    this.moveTo(point.x - 10, point.y);
    this.lineTo(point.x + 10, point.y);
    this.moveTo(point.x, point.y - 10);
    this.lineTo(point.x, point.y + 10);
    this.closePath();
    this.stroke();
};

/** 
 * @class Point
 */

var Point = function () {
    /**
     * @param {number} x 
     * @param {number} y 
     */
    function Point(x, y) {
        _classCallCheck(this, Point);

        if (typeof x != "number" || typeof y != "number" || isNaN(x) || isNaN(y)) throw new TypeError("x and y must be a number!");

        this._x = x;
        this._y = y;
    }

    _createClass(Point, [{
        key: "distanceTo",


        /**
         * @param {Point} point 
         * @returns {number}
         */
        value: function distanceTo(point) {
            if (point instanceof Point) {
                var dx = this._x - point.x,
                    dy = this._y - point.y;
                return Math.sqrt(dx * dx + dy * dy);
            } else {
                throw new TypeError("argument must be a point!");
            }
        }

        /**
         * @param {Point} point 
         * @returns {number}
         */

    }, {
        key: "directionTo",
        value: function directionTo(point) {
            if (point instanceof Point) {
                var dx = point.x - this._x,
                    dy = point.y - this._y;
                var rad = Math.atan2(dy, dx) % rad360;
                rad += rad < 0 ? rad360 : 0;
                return rad;
            } else {
                throw new TypeError("argument must be a point!");
            }
        }

        /**
         * @returns {Point}
         */

    }, {
        key: "copy",
        value: function copy() {
            return new Point(this._x, this._y);
        }

        /**
         * @example 
         * // returns "{x: 3; y: 5}"
         * var point = new Point(3, 5);
         * point.toString();
         * @returns {string} 
         */

    }, {
        key: "toString",
        value: function toString() {
            return "x: " + String(this._x) + "; y: " + String(this._y);
        }

        /**
         * @example 
         * // returns {x: 3, y: 5}
         * var point = new Point(3, 5);
         * point.toObject();
         * @returns {object} 
         */

    }, {
        key: "toObject",
        value: function toObject() {
            var x = this._x;
            var y = this._y;
            return { "x": x, "y": y };
        }

        /**
         * @example 
         * // returns [3, 5]
         * var point = new Point(3, 5);
         * point.toArray();
         * @returns {array} 
         */

    }, {
        key: "toArray",
        value: function toArray() {
            var x = this._x;
            var y = this._y;
            return [x, y];
        }

        /**
         * @param {Point} point 
         * @returns {Point} - this
         */

    }, {
        key: "add",
        value: function add(point) {
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

    }, {
        key: "sub",
        value: function sub(point) {
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

    }, {
        key: "addVector",
        value: function addVector(vector) {
            if (vector instanceof Vector) {
                var point = vector.endPoint;
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

    }, {
        key: "subVector",
        value: function subVector(vector) {
            if (vector instanceof Vector) {
                var point = vector.endPoint;
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

    }, {
        key: "multi",
        value: function multi(factor) {
            if (typeof factor != "number" || isNaN(factor)) throw new TypeError("factor must be a number!");
            this._x *= factor;
            this._y *= factor;

            return this;
        }

        /**
         * @param {number} angle 
         * @param {Point} center 
         * @returns {Point} - this 
         */

    }, {
        key: "rotate",
        value: function rotate(angle, center) {
            if (typeof angle != "number" || isNaN(angle)) throw new TypeError("angle must be a number!");
            if (!(center instanceof Point)) {
                throw new TypeError("center must be a point!");
            }

            var c = this.copy();
            c.sub(center);
            var x = center.x + c.x * Math.cos(angle) - c.y * Math.sin(angle);
            var y = center.y + c.y * Math.cos(angle) + c.x * Math.sin(angle);
            this._x = x;
            this._y = y;

            return this;
        }

        /**
         * @returns {Point} - this 
         */

    }, {
        key: "round",
        value: function round() {
            var x = Math.round(this._x);
            var y = Math.round(this._y);
            this._x = x;
            this._y = y;

            return this;
        }
    }, {
        key: "x",
        set: function set(newX) {
            if (typeof newX != "number" || isNaN(newX)) throw new TypeError("x must be a number!");
            this._x = newX;
        },
        get: function get() {
            return this._x;
        }
    }, {
        key: "y",
        set: function set(newY) {
            if (typeof newY != "number" || isNaN(newY)) throw new TypeError("y must be a number!");
            this._y = newY;
        },
        get: function get() {
            return this._y;
        }
    }]);

    return Point;
}();

/**
 * @class Vector
 */


var Vector = function () {
    /**
     * @param {number} len 
     * @param {number} dir 
     */
    function Vector(len, dir) {
        _classCallCheck(this, Vector);

        if (typeof len != "number" || typeof dir != "number" || isNaN(len) || isNaN(dir)) throw new TypeError("length and direction must be a number!");

        this._len = len;
        this._dir = dir;
    }

    _createClass(Vector, [{
        key: "copy",


        /**
         * @returns {Vector}
         */
        value: function copy() {
            return new Vector(this._len, this._dir);
        }

        /**
         * @returns {string} 
         */

    }, {
        key: "toString",
        value: function toString() {
            return "length: " + String(this._len) + "; direction: " + String(this._dir);
        }

        /**
         * @param {number} factor 
         * @returns {Vector} - this
         */

    }, {
        key: "multi",
        value: function multi(factor) {
            if (typeof factor != "number" || isNaN(factor)) throw new TypeError("factor must be a number!");
            this._len *= factor;

            return this;
        }

        /**
         * @param {number} angle 
         * @returns {Vector} - this
         */

    }, {
        key: "rotate",
        value: function rotate(angle) {
            if (typeof angle != "number" || isNaN(angle)) throw new TypeError("angle must be a number!");
            var rad = (this._dir + angle) % rad360;
            if (rad < 0) {
                if (rad / rad360 < -1) {
                    rad += Math.floor(-rad / rad360) * rad360;
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

    }, {
        key: "length",
        set: function set(newLen) {
            if (typeof newLen != "number" || isNaN(newLen)) throw new TypeError("length must be a number!");
            this._len = newLen;
        },
        get: function get() {
            return this._len;
        }
    }, {
        key: "direction",
        set: function set(newDir) {
            if (typeof newDir != "number" || isNaN(newDir)) throw new TypeError("direction must be a number!");
            this._dir = newDir;
        },
        get: function get() {
            return this._dir;
        }

        /** 
         * @readonly
         */

    }, {
        key: "endPoint",
        get: function get() {
            return new Point(this._len * Math.cos(this._dir), this._len * Math.sin(this._dir));
        }
    }], [{
        key: "fromPoints",
        value: function fromPoints(point0, point1) {
            if (point0 instanceof Point && point1 instanceof Point) {
                var len = point0.distanceTo(point1),
                    dir = point0.directionTo(point1);
                return new Vector(len, dir);
            } else {
                throw new TypeError("arguments must be a points!");
            }
        }
    }]);

    return Vector;
}();