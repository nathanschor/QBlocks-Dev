function Mist(colorLeft=0, signLeft='+', colorRight=0, signRight='+', x, y, width, height, id = 0){ //0 is black, 1 is white
  this.colorLeft = colorLeft;
  this.signLeft = signLeft;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.id = id;

  this.colorRight = colorRight;
  this.signRight = signRight;

  this.toString = function toString(){
    return  this.signLeft + ((this.colorcolorLeft === 1) ? 'White' : 'Black') +
            this.signRight + ((this.colorcolorRight === 1) ? 'White' : 'Black') + ' Mist';
  };


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
