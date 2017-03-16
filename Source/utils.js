/**
 * @author AgentX001 <ilya.buligin.agentx001@gmail.com>
 * @version 0.0.5
 */

const degsInRad = 180 / Math.PI,
      radsInDeg = Math.PI / 180,
      rad360 = Math.PI * 2;

Number.prototype.toDeg = function() {
    let deg = (this * degsInRad) % 360;
    if (deg < 0) {
        if (deg / 360 < -1) {
            deg += Math.floor((-deg) / 360) * 360
        } else {
            deg += 360;
        }
    }
    return deg;
}

Number.prototype.toRad = function() {
    let rad = (this * radsInDeg) % rad360;
    if (rad < 0) {
        if (rad / rad360 < -1) {
            rad += Math.floor((-rad) / rad360) * rad360
        } else {
            rad += rad360;
        }
    }
    return rad;
}

CanvasRenderingContext2D.prototype.drawPoint = function(point) {
    this.beginPath();
    this.moveTo(point.x - 10, point.y);
    this.lineTo(point.x + 10, point.y);
    this.moveTo(point.x, point.y - 10);
    this.lineTo(point.x, point.y + 10);
    this.closePath();
    this.stroke();
}