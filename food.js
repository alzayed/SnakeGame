function Food(x, y) {
    this.x = x;
    this.y = y;

    this.draw = function() {
        CTX.fillStyle = '#ffff00';
        CTX.fillRect(this.x, this.y, SCALE, SCALE);
    }
}