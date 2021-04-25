function CNot(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.left = null;
  this.right = null;

  this.run = function cnot(){
    if(this.left.constructor.name === 'Ball'){
      //Not first object if second object is white
      this.left.y += 2 * this.height;
      this.right.y += 2 * this.height;

      if(this.left.color === 0){
        this.right.color = Math.abs(this.right.color - 1);

        return [this.left, this.right];
      } else { //don't Not first object
        return [this.left, this.right];
      }
    } else if(this.left.constructor.name === 'Mist'){
      // TODO: handle mist
      return [this.left, this.right]
    } else {
      console.log("Else in CNot, something went wrong");
      console.log(this.left.toString() + this.right.toString());
      return [this.left, this.right];
    }
  };

  this.toString = function toString(){
    return 'CNot-Gate';
  };

  this.isRunnable = function () {
    return( true );
  }

  this.isComplete = function () {
    return( !(this.left === null) && !(this.right === null) );
  }
}
