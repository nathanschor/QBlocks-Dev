function Mist(colorLeft=0, signLeft='+', colorRight=0, signRight='+', x, y, width, height, id = 0){ //0 is black, 1 is white
  this.colorLeft = colorLeft;
  this.signLeft = signLeft;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.level = this.y + (this.height/2);
  this.elementType = "Mist";
  this.elementSize = 1;

  this.id = id;
 
  this.colorRight = colorRight;
  this.signRight = signRight;

  this.toString = function toString(){
    return  this.signLeft + ((this.colorcolorLeft === 1) ? 'White' : 'Black') +
            this.signRight + ((this.colorcolorRight === 1) ? 'White' : 'Black') + ' Mist';
  };

  this.equals = function equals(otherElement){
    return (this.toString() === otherElement.toString()) && (this.x === otherElement.x) && (this.y === otherElement.y);
  }

  this.isComplete = function isComplete() {
    return true;
  }

 
  this.updateLevel = function updateLevel() {
    this.level = this.y;
  }

  this.isBelow = function isBelow(x, y) {
    return false;
  }

  this.getCenter = function getCenter(x, y){
    return this;
  }

  this.getRefference = function getRefference() {
    return this;
  }

  this.getCenterCoordinates = function getCenterCoordinates(){
    return [[parseInt(this.x) + parseInt(this.width / 2),
      parseInt(this.y) + parseInt(this.height / 2)]];
  }

  this.addCenter = function addCenter(otherX, otherY, element, centerElementPositionNumber){
    this.centerElementPosition = centerElementPositionNumber;
    this.center = element;
  }

  this.getCenterPosition = function getCenterPosition(otherX, otherY){
    this.centerUsed = true;
    return 0;
  }

  this.isRunnable = function () {
    return( false );
  }

  this.getID = function getID(){
    return [this.id];
  }

  this.getTopLeftCoordinates = function getTopLeftCoordinates(){
    return [parseInt(this.x), parseInt(this.y)];
  }
}
