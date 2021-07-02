function Swap(x, y, width, height, id = 0){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.left = null;
  this.right = null;
  this.level = this.y + (this.height/2);
  this.elementType = "Gate";
  this.elementSize = 2;
  this.leftElementPosition = 0;
  this.rightElementPosition = 0;
  this.alreadyRan = false;
  this.id = id;

  this.run = function swap(multiplicity = 3){
    if(this.alreadyRan){
      // console.log("SWAP " + this.y + " Already Ran");
      return [this.left, this.right];
    } else if(this.left.constructor.name === 'Ball'){
      // console.log("SWAP " + this.y + " Swapping mult: " + multiplicity);
      // console.log("Left: " + this.left.y + " | Right: " + this.right.y);
      this.left.y +=  ((this.y + (multiplicity * this.height/2)) - this.left.y);
      this.right.y += ((this.y + (multiplicity * this.height/2)) - this.right.y);

      // console.log("Left: " + this.left.y + " | Right: " + this.right.y);

      this.left.updateLevel();
      this.right.updateLevel();
      this.alreadyRan = true;

      tmp = this.left.x;
      this.left.x = this.right.x;
      this.right.x = tmp;


      tmp = this.left;
      this.left = this.right;
      this.right = tmp;

      return [this.left, this.right];
    } else if(this.left.constructor.name === 'Mist'){
      // TODO: handle mist
      return [this.left, this.right]
    } else { //In this case we have a Gate
      // console.log("SWAP " + this.y + " Running inner");
      this.left = this.left.run(1)[this.leftElementPosition];
      this.right = this.right.run(1)[this.rightElementPosition];
      this.left.updateLevel();
      this.right.updateLevel();
      return this.run();
    }
  };

  this.toString = function toString(){
    return 'Swap-Gate';
  };

  this.isComplete = function isComplete() {
    return( (!(this.left === null) && !(this.right === null)) ? (this.left.isComplete() && this.right.isComplete()) : false);
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
    let x2 = parseInt(this.x + this.width/2);
    let x3 = parseInt(this.x + this.width);
    let y1 = parseInt(this.y - this.height);
    let y2 = parseInt(this.y);

    // console.log("Not Gate " + otherX + " | " + otherY);
    // console.log("(x1 <= x) && (x <= x2) && (y1 <= y) && (y <= y2)\n(" + x1 + " <= " + otherX + ") && (" + otherX + " <= " + x2 + ") && (" + y1 + " <= " + otherY + ") && (" + otherY + " <= " + y2 + ") === " + ((x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2)));
    return ((x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2)) ||
            ((x2 < otherX) && (otherX <= x3) && (y1 <= otherY) && (otherY <= y2));
  }

  this.getCenterCoordinates = function getCenterCoordinates(){
    return [[parseInt(this.x) + parseInt(this.width * 0.25),
              parseInt(this.y) + parseInt(this.height / 2)],
            [parseInt(this.x) + parseInt(this.width  * 0.75),
              parseInt(this.y) + parseInt(this.height / 2)]];
  }

  this.getCenterPosition = function getCenterPosition(otherX, otherY){
    let x1 = parseInt(this.x);
    let x2 = parseInt(this.x + this.width/2);
    let y1 = parseInt(this.y + this.height);
    let y2 = parseInt(this.y);
    // console.log("Not Gate " + otherX + " | " + otherY + "\n(x1 <= x) && (x <= x2) && (y1 <= y) && (y <= y2)\n(" + x1 + " <= " + otherX + ") && (" + otherX + " <= " + x2 + ") && (" + y1 + " <= " + otherY + ") && (" + otherY + " <= " + y2 + ") === " + ((x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2)));

    if((x1 <= otherX) && (otherX <= x2)){
      // console.log("left used");
      this.leftUsed = true;
      return 0;
    } else {
      // console.log("right used");
      this.rightUsed = true;
      return 1
    }
  }

  this.addCenter = function addCenter(otherX, otherY, element, elementPositionNumber){
    //

    let x1 = parseInt(this.x);
    let x2 = parseInt(this.x + this.width/2);
    let y1 = parseInt(this.y - this.height);
    let y2 = parseInt(this.y);

    if((x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2)){
      this.leftElementPosition = elementPositionNumber;
      this.left = element;
    } else {
      this.rightElementPosition = elementPositionNumber;
      this.right = element;
    }
  }

  this.getID = function getID(){
    var ids = [this.id];

    if(!(this.left === null)){
      ids = ids.concat(this.left.getID());
    }
    if(!(this.right === null)){
      ids = ids.concat(this.right.getID());
    }

    return Array.from(new Set(ids));
  }

  this.getTopLeftCoordinates = function getTopLeftCoordinates(){
    return [parseInt(this.x), parseInt(this.y)];
  }
}