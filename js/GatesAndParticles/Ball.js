function Ball(color=0, sign='+', x, y, radius){ //0 is black, 1 is white
  this.color = color;
  this.sign = sign;
  this.x = x;
  this.y = y;
  this.radius = radius;

  this.toString = function toString(){
    return ((this.color === 1) ? 'White' : 'Black') + ' Ball with ' + this.sign + ' sign';
  };


  this.isRunnable = function () {
    return( false );
  }

}
