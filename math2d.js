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
var Point = function(x, y) {
    this.x = x;
    this.y = y;

    /**
     * Складывает координыты точек.
     * 
     * @param {Point} p То что прибавляем
     */
    this.add = function(p) {
        this.x += p.x;
        this.y += p.y;
    }

    /**
     * Вычитает координаты точек.
     * 
     * @param {Point} p То что вычитаем
     */
    this.sub = function(p) {
        this.x -= p.x;
        this.y -= p.y;
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

    /**
     * Вычисляет координаты точки, которая являлась бы вершиной заданного вектора.
     * 
     * @param {number} len Длина вектора
     * @param {number} dir Направление вектора, заданное в радианах
     */
    this.setLenDir = function(len, dir) {
        this.x = len * Math.cos(dir);
        this.y = len * Math.sin(dir)
    }
}