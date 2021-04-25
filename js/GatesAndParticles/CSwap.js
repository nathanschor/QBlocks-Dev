function CSwap(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.left = null;
  this.center = null;
  this.right = null;


  this.run = function cnot(){
    console.log("left: " + ((this.left.color === 1) ? 'White' : 'Black'));
    console.log("center: " + ((this.center.color === 1) ? 'White' : 'Black'));
    console.log("right: " + ((this.right.color === 1) ? 'White' : 'Black'));

    if(this.left.constructor.name === 'Ball'){
      //Not first object if second object is white
      this.left.y += 2 * this.height;
      this.center.y += 2 * this.height;
      this.right.y += 2 * this.height;

      if(this.left.color === 0){
        console.log("\n\nCSwap IF");
        tmp = this.center.x;
        this.center.x = this.right.x;
        this.right.x = tmp;

        return [this.left, this.center, this.right];
      } else { //don't Not first object
        console.log("\n\nCSwap ELSE");
        return [this.left, this.center, this.right];
      }
    } else if(this.left.constructor.name === 'Mist'){
      // TODO: handle mist
      return [this.left, this.center, this.right]
    } else {
      console.log("Else in CNot, something went wrong");
      console.log(this.left.toString() + this.center.toString() + this.right.toString());
      return [this.left, this.center, this.right];
    }
  };

  this.toString = function toString(){
    return 'CSwap-Gate';
  };

  this.isRunnable = function () {
    return( true );
  }

  this.isComplete = function () {
    return( !(this.left === null) && !(this.center === null) && !(this.right === null) );
  }
}
