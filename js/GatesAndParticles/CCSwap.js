function CCSwap(x, y, width, height, id = 0){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.left = null;
  this.center_left = null;
  this.center_right = null;
  this.right = null;
  this.level = this.y + (this.height/2);
  this.elementType = "Gate";
  this.elementSize = 4;
  this.leftElementPosition = 0;
  this.centerLeftElementPosition = 0;
  this.centerRightElementPosition = 0;
  this.rightElementPosition = 0;
  this.alreadyRan = false;
  this.id = id;


  this.run = function ccnot(multiplicity = 3){
    if(this.alreadyRan){
      // console.log("SWAP " + this.y + " Already Ran");
      return [this.left, this.center_left, this.center_right, this.right];
    } else if(this.center_left.elementType === 'Ball'){
      //Not first object if second object is white
      this.left.y +=  ((this.y + (multiplicity * this.height/2)) - this.left.y);
      this.center_left.y += ((this.y + (multiplicity * this.height/2)) - this.center_left.y);
      this.center_right.y += ((this.y + (multiplicity * this.height/2)) - this.center_right.y);
      this.right.y += ((this.y + (multiplicity * this.height/2)) - this.right.y);

      this.left.updateLevel();
      this.center_left.updateLevel();
      this.center_right.updateLevel();
      this.right.updateLevel();
      this.alreadyRan = true;

      if(this.left.color === 0 && this.center_left.color === 0){
        tmp = this.center_right.x;
        this.center_right.x = this.right.x;
        this.right.x = tmp;

        tmp = this.center_right;
        this.center_right = this.right;
        this.right = tmp;

        return [this.left, this.center_left, this.center_right, this.right];
      } else { //don't Not first object
        console.log("\n\nCSwap ELSE");
        return [this.left, this.center_left, this.center_right, this.right];
      }
    } else if(this.center_left.elementType === 'Mist'){
      // TODO: handle mist
      return [this.left, this.center_left, this.center_right, this.right];
    } else { //In this case we have a Gate
      // console.log("SWAP " + this.y + " Running inner");
      this.left = this.left.run(1)[this.leftElementPosition];
      this.center_left = this.center_left.run(1)[this.centerLeftElementPosition];
      this.center_right = this.center_right.run(1)[this.centerRightElementPosition];
      this.right = this.right.run(1)[this.rightElementPosition];

      this.left.updateLevel();
      this.center_left.updateLevel();
      this.center_right.updateLevel();
      this.right.updateLevel();

      return this.run();
    }
  };

  this.toString = function toString(){
    return 'CSwap-Gate';
  };

  this.isComplete = function isComplete() {
    return( (!(this.left === null) && !(this.center_left === null) && !(this.center_right === null) && !(this.right === null)) ?
        (this.left.isComplete() && this.center_left.isComplete() && this.center_right.isComplete() && this.right.isComplete()) : false);
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
    let x2 = parseInt(this.x + this.width/4);
    let x3 = parseInt(this.x + (this.width*2) /4);
    let x4 = parseInt(this.x + (this.width*3) /4);
    let x5 = parseInt(this.x + this.width);
    let y1 = parseInt(this.y - this.height);
    let y2 = parseInt(this.y);

    // console.log("Not Gate " + otherX + " | " + otherY);
    // console.log("(x1 <= x) && (x <= x2) && (y1 <= y) && (y <= y2)\n(" + x1 + " <= " + otherX + ") && (" + otherX + " <= " + x2 + ") && (" + y1 + " <= " + otherY + ") && (" + otherY + " <= " + y2 + ") === " + ((x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2)));
    return (((x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2)) ||
              ((x2 < otherX) && (otherX <= x3) && (y1 <= otherY) && (otherY <= y2)) ||
              ((x3 < otherX) && (otherX <= x4) && (y1 <= otherY) && (otherY <= y2)) ||
              ((x4 < otherX) && (otherX <= x5) && (y1 <= otherY) && (otherY <= y2)));
  }

  this.getCenterCoordinates = function getCenterCoordinates(){
    return [[parseInt(this.x) + parseInt(this.width * (1/8)),
              parseInt(this.y) + parseInt(this.height / 2)],
            [parseInt(this.x) + parseInt(this.width * (3/8)),
              parseInt(this.y) + parseInt(this.height / 2)],
            [parseInt(this.x) + parseInt(this.width * (5/8)),
              parseInt(this.y) + parseInt(this.height / 2)],
            [parseInt(this.x) + parseInt(this.width * (7/8)),
              parseInt(this.y) + parseInt(this.height / 2)]];
  }

  this.getCenterPosition = function getCenterPosition(otherX, otherY){
    let x1 = parseInt(this.x);
    let x2 = parseInt(this.x + this.width/4);
    let x3 = parseInt(this.x + (this.width*2) /4);
    let x4 = parseInt(this.x + (this.width*3) /4);
    // console.log("Not Gate " + otherX + " | " + otherY + "\n(x1 <= x) && (x <= x2) && (y1 <= y) && (y <= y2)\n(" + x1 + " <= " + otherX + ") && (" + otherX + " <= " + x2 + ") && (" + y1 + " <= " + otherY + ") && (" + otherY + " <= " + y2 + ") === " + ((x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2)));

    if((x1 <= otherX) && (otherX <= x2)){
      // console.log("left used");
      this.leftUsed = true;
      return 0;
    } else if((x2 <= otherX) && (otherX <= x3)){
      this.centerLeftUsed = true;
      return 1
    } else if((x3 <= otherX) && (otherX <= x4)){
      this.centerRightUsed = true;
      return 2
    } else {
      this.rightUsed = true;
      return 3
    }
  }

  this.addCenter = function addCenter(otherX, otherY, element, elementPositionNumber){
    let x1 = parseInt(this.x);
    let x2 = parseInt(this.x + this.width/4);
    let x3 = parseInt(this.x + (this.width*2) /4);
    let x4 = parseInt(this.x + (this.width*3) /4);
    let x5 = parseInt(this.x + this.width);
    let y1 = parseInt(this.y - this.height);
    let y2 = parseInt(this.y);

    if((x1 <= otherX) && (otherX <= x2) && (y1 <= otherY) && (otherY <= y2)){
      this.leftElementPosition = elementPositionNumber;
      this.left = element;
    } else if((x2 < otherX) && (otherX <= x3) && (y1 <= otherY) && (otherY <= y2)){
      this.centerLeftElementPosition = elementPositionNumber;
      this.center_left = element;
    } else if((x3 < otherX) && (otherX <= x4) && (y1 <= otherY) && (otherY <= y2)){
      this.centerRightElementPosition = elementPositionNumber;
      this.center_right = element;
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
    if(!(this.center_left === null)){
      ids = ids.concat(this.center_left.getID());
    }
    if(!(this.center_right === null)){
      ids = ids.concat(this.center_right.getID());
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
