function Swap(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.left = null;
  this.right = null;

  this.run = function swap(){
    if(this.left.constructor.name === 'Ball'){
      this.left.y += 2 * this.height;
      this.right.y += 2 * this.height;

      tmp = this.left.x ;
      this.left.x = this.right.x;
      this.right.x = tmp;

      return [this.left, this.right];
    } else if(this.left.constructor.name === 'Mist'){
      // TODO: handle mist
      return [this.left, this.right]
    } else {
      console.log("Else in Swap, something went wrong");
      console.log(this.left.toString() + this.right.toString());
      return [this.left, this.right];
    }
  };

  this.toString = function toString(){
    return 'Swap-Gate';
  };

  this.isRunnable = function () {
    return( true );
  }

  this.isComplete = function () {
    return( !(this.left === null) && !(this.right === null) );
  }
}
