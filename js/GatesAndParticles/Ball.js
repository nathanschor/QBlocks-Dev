function Ball(color=0, sign='+', x, y, radius, id = 0){ //0 is black, 1 is white
  this.color = color;
  this.sign = sign;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.level = this.y;
  this.elementType = "Ball";
  this.elementSize = 1;
  this.id = id;

  this.toString = function toString(){
    return ((this.color === 1) ? 'White' : 'Black') + ' Ball with ' + this.sign + ' sign';
  };

  this.isComplete = function isComplete() {
    return true;
  }

  this.updateLevel = function updateLevel() {
    this.level = this.y;
  }

  this.isBelow = function isBelow(x, y) {
    return false;
  }

  this.getCenterCoordinates = function getCenterCoordinates(){
    return [[parseInt(this.x), parseInt(this.y)]];
  }

  this.getCenter = function getCenter(x, y){
    return this;
  }

  this.getRefference = function getRefference() {
    return this;
  }

  this.getCenterPosition = function getCenterPosition(otherX, otherY){
    return 0;
  }

  this.getID = function getID(){
    return [this.id];
  }

  this.getTopLeftCoordinates = function getTopLeftCoordinates(){
    return [parseInt(this.x - this.radius), parseInt(this.y - this.radius)];
  }
}
