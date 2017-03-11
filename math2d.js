var degsInRad = 180 / Math.PI;
var radsInDeg = Math.PI / 180;
var rad360 = Math.PI * 2;

/**
 * Переводит радианы в градусы
 * 
 * @example <caption>Пример использования Number.toDeg.</caption>
 * //returns 180
 * (Math.PI).toDeg();
 * 
 * @returns {number} Градусы
 */
Number.prototype.toDeg = function() {
    return this * degsInRad;
}

/**
 * Переводит градусы в радианы
 * 
 * @example <caption>Пример использования Number.toRad.</caption>
 * //returns 3.141592653589793
 * (180).toRad();
 * 
 * @returns {number} Градусы
 */
Number.prototype.toRad = function() {
    return this * radsInDeg;
}

/**
 * Создает новый экземпляр Point.
 * 
 * @constructor
 * @param {number} x Координата X
 * @param {number} y Координата Y
 */
var Point = function(arg0, arg1) {
    if (typeof arg0 == "number" && typeof arg1 == "number") {
        this.x = arg0;
        this.y = arg1;
    } else if (arg0 instanceof Point) {
        this.x = arg0.x;
        this.y = arg0.y;        
    }

    /**
     * Складывает координыты точек.
     * 
     * @param {Point} p То что прибавляем
     */
    this.add = function(object) {
        if (object instanceof Point) {
            this.x += object.x;
            this.y += object.y;
        } else if (object instanceof Vector) {
            this.add(object.getEndPoint());
        } else {
            throw new Error("Uncorrect arguments");
        }
    }

    /**
     * Вычитает координаты точек.
     * 
     * @param {Point} p То что вычитаем
     */
    this.sub = function(p) {
        if (object instanceof Point) {
            this.x -= object.x;
            this.y -= object.y;
        } else if (object instanceof Vector) {
            this.sub(object.getEndPoint());
        } else {
            throw new Error("Uncorrect arguments");
        }
    }

    /**
     * Определяет расстояние между двумя точками.
     * 
     * @param {Point} p Точка расстояние к которой требуется измерить
     * @returns {number} Расстояние
     */
    this.distanceTo = function(p) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    /**
     * Определяет угол между прямой, образованной двумя точками и осью X.
     * 
     * @param {Point} p Точка угол к которой нужно измерить.
     * @returns {number} Угол в радианах
     */
    this.directionTo = function(p) {
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        var rad =  Math.atan2(dy, dx) % rad360;
        rad += (rad < 0) ? rad360 : 0;
        return rad;
    }
}

var Vector = function(arg0, arg1) {
    if (typeof arg0 == "number" && typeof arg1 == "number") {
        this.length = arg0;
        this.direction = arg1;
    } else if (arg0 instanceof Point && arg1 instanceof Point) {
        this.length = arg0.distanceTo(arg1);
        this.direction = arg0.directionTo(arg1);
    } else if (arg0 instanceof Vector) {
        this.length = arg0.length;
        this.direction = arg0.direction;        
    }

    this.getEndPoint = function() {
        return new Point(this.length * Math.cos(this.direction), this.length * Math.sin(this.direction));
    }

    this.multi = function(k) {
        this.length *= k;
    }
}

var Polygon = function(vertices) {
    if (typeof vertices != "object") {
        throw new Error("Uncorrect arguments");
    }
    
    for (let i = 0; i < vertices.length; i++) {
        if (!(vertices[i] instanceof Point)) {
            throw new Error("Uncorrect arguments");
        }

    }

    this.vertices = vertices;
}
