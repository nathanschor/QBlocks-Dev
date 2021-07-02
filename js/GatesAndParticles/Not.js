function Not(x, y, width, height, id = 0){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.center = null;
  this.level = this.y + (this.height/2);
  this.elementType = "Gate";
  this.elementSize = 1;
  this.centerElementPosition = 0;
  this.alreadyRan = false;
  this.id = id;

  this.run = function not(multiplicity = 3){
    if(this.alreadyRan){
      return [this.center];
    } else if(this.center.elementType === 'Ball'){
      // console.log("NOT " + this.y + " Notting mult: " + multiplicity);
      this.center.color = Math.abs(this.center.color - 1);
      // console.log("Center: " + this.center.y);
      this.center.y += ((this.y + (multiplicity * this.height/2)) - this.center.y);
      // console.log("Center: " + this.center.y);

      this.center.updateLevel();
      this.alreadyRan = true;
      return [this.center];
    } else if(this.center.elementType === 'Mist'){
      // TODO: handle mist
      return [this.center];
    } else { //In this case we have a Gate
      this.center = this.center.run(1)[this.centerElementPosition];
      this.center.updateLevel();
      return this.run();
    }
  };

  this.toString = function toString(){
    return 'Not-Gate';
  };

  this.isComplete = function isComplete() {
    return( !(this.center === null) ? this.center.isComplete() : false);
  }

  this.updateLevel = function updateLevel() {
    this.level = this.y + (this.height/2);
  }

  /** This checks if the given center of an object is above
   *  x is the x coordinate of the center of the object.
   *  y is the y coordinate of the center of the object.
   */
  this.isBelow = function isBelow(otherX, otherY) {
    let x1 = parseInt(this.x);
    let x2 = parseInt(this.x + this.width);
    let y1 = parseInt(this.y - this.height);
    let y2 = parseInt(this.y);

    return (x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2);
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

  this.getID = function getID(){
    var ids = [this.id];

    if(!(this.center === null)){
      ids = ids.concat(this.center.getID());
    }

    return Array.from(new Set(ids));
  }

  this.getTopLeftCoordinates = function getTopLeftCoordinates(){
    return [parseInt(this.x), parseInt(this.y)];
  }
}
