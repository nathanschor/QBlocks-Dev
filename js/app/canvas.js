shadowOffset = 20;
let blockSnapSize = 30;
let gridSnapSize = 60;
let timeout;
let lastTap = 0;
let hideResults = false;
let currentStep = 0;
let gridLinesColor = '#c6c6c6';

let width = Math.round(document.getElementById('canvas-div').clientWidth / gridSnapSize) * gridSnapSize;
let height =Math.round( document.getElementById('canvas-div').clientHeight / gridSnapSize) * gridSnapSize;

console.log("Height: " + height + " | Width: " + width);

/*############################################################################*/
/*####################### Gate Definition ####################################*/
/*############################################################################*/

function newGate(x, y, width, height, layer, stage, filepath, type, createdBy, shapetype = 'rectangle', hidden = false, level = 0) {
  let tempShadowShapeType = 'shadow' + shapetype;

  let shadowRectangle = new Konva.Rect({
    x: x,
    y: y,
    shapeType: tempShadowShapeType,
    type: type,
    id: createdBy,
    createdAtLevel: level,
    width: blockSnapSize * width,
    height: blockSnapSize * height,
    fill: '#FF7B17',
    opacity: 0.6,
    stroke: '#CF6412',
    strokeWidth: 3,
    dash: [20, 2]
  });
  shadowRectangle.hide();
  layer.add(shadowRectangle);

  Konva.Image.fromURL(filepath, function (rectangle) {
    rectangle.setAttrs({
      x: x,
      y: y,
      x_prev: x,
      y_prev: y,
      shapeType: shapetype,
      type: type,
      id: createdBy,
      createdAtLevel: level,
      width: blockSnapSize * width,
      height: blockSnapSize * height,
      shadowColor: 'black',
      shadowBlur: 2,
      shadowOffset: {x : 1, y : 1},
      shadowOpacity: 0.4,
      draggable: true
    });

    rectangle.on('dragstart', (e) => {
      shadowRectangle.show();
      shadowRectangle.moveToTop();
      rectangle.moveToTop();
      rectangle.position({
        x_prev: rectangle.x,
        y_prev: rectangle.y
      });
    });

    rectangle.on('dragend', (e) => {
      rectangle.position({
        x: Math.round(rectangle.x() / gridSnapSize) * gridSnapSize,
        y: Math.round(rectangle.y() / gridSnapSize) * gridSnapSize
      });
      stage.batchDraw();
      shadowRectangle.hide();
    });

    rectangle.on('dragmove', (e) => {
      shadowRectangle.position({
        x: Math.round(rectangle.x() / gridSnapSize) * gridSnapSize,
        y: Math.round(rectangle.y() / gridSnapSize) * gridSnapSize
      });
      stage.batchDraw();
    });

    layer.add(rectangle);

    layer.batchDraw();
    // do something else on right click
    rectangle.on('contextmenu', (e) => {
      rectangle.destroy();
      layer.draw();
      if(hidden){
        let color = (type.includes("white")) ? 'white' : 'black';
        newGate(x, y, width, height, layer, stage, 'img/' + color + '.png', type, "simulation", 'circle', false, level);
      }
    });

    rectangle.on('touchend', (e) => {
      let currentTime = new Date().getTime();
      let tapLength = currentTime - lastTap;
      clearTimeout(timeout);
      if (tapLength < 500 && tapLength > 0) {
        rectangle.destroy();
        layer.draw();
        if(hidden){
          let color = (type.includes("white")) ? 'white' : 'black';
          newGate(x, y, width, height, layer, stage, 'img/' + color + '.png', type, "simulation", 'circle', false, level);
        }
      }
      lastTap = currentTime;
    });

    // do something else on right click
    rectangle.on('stop-button', (e) => {
      // rectangle.destroy();
      // layer.draw();
    });
  });
}


/*############################################################################*/
/*####################### Creates Grid #######################################*/
/*############################################################################*/

let stage = new Konva.Stage({
  container: 'canvas',
  width: width,
  height: height
});

let gridLayer = new Konva.Layer();

for (let i = 1; i < width / gridSnapSize; i++) {
  gridLayer.add(new Konva.Line({
    points: [Math.round(i * gridSnapSize) + 0.5, 0, Math.round(i * gridSnapSize) + 0.5, height],
    stroke: gridLinesColor,
    strokeWidth: 1,
  }));
}

gridLayer.add(new Konva.Line({points: [0,0,10,10]}));
for (let j = 1; j < height / gridSnapSize; j++) {
  gridLayer.add(new Konva.Line({
    points: [0, Math.round(j * gridSnapSize), width, Math.round(j * gridSnapSize)],
    stroke: gridLinesColor,
    strokeWidth: 1,
  }));
}

let layer = new Konva.Layer();
stage.add(gridLayer);

// do not show context menu on right click
stage.on('contentContextmenu', (e) => {
  e.evt.preventDefault();
});

gridLayer.draw();

function fitStageIntoParentContainer() {
  let container = document.querySelector('#stage-parent');

// now we need to fit stage into parent
  let containerWidth = document.getElementById('canvas').clientWidth;
// to do this we need to scale the stage
  let scaleX = containerWidth / width;

// now we need to fit stage into parent
  let containerHeight = document.getElementById('canvas').clientHeight;
// to do this we need to scale the stage
  let scaleY = containerHeight / height;

// uncomment to enable "uniform stretch"
//scaleX = scaleY =Math.min(scaleX,scaleY);

  stage.width(width * scaleX);
  stage.height(height * scaleY);
  stage.scale({ x: scaleX, y: scaleY });
  stage.draw();
}

fitStageIntoParentContainer();
// adapt the stage on any window resize
window.addEventListener('resize', fitStageIntoParentContainer);

/*############################################################################*/
/*####################### Drag and Drop ######################################*/
/*############################################################################*/

// what is url of dragging element?
let type = '';
let listOfObjects = ['not', 'cnot', 'white', 'black', 'swap', 'cswap', 'ccswap', 'pete', 'pipe', 'wbmist', 'wnegbmist'];

for (i = 0; i < listOfObjects.length; i++) {
  let obj = listOfObjects[i];
  let id = 'drag-' + obj;
  document.getElementById(id).addEventListener('dragstart', function (e) {
    type = obj;
  });
  id = 'drag-' + obj + '-mobile';
  document.getElementById(id).addEventListener('dragstart', function (e) {
    type = obj;
  });
}

let con = stage.container();
con.addEventListener('dragover', function (e) {
  e.preventDefault(); // !important
});

con.addEventListener('drop', function (e) {
  e.preventDefault();
  // now we need to find pointer position
  // we can't use stage.getPointerPosition() here, because that event
  // is not registered by Konva.Stage
  // we can register it manually:
  stage.setPointersPositions(e);
  console.log("TYPE OF DROP: " + type);
  let x = stage.getPointerPosition().x;
  let y = stage.getPointerPosition().y;
  let gateY = 0;
  let gateX = 0;

  for (let i = 1; i < width / gridSnapSize; i++) {
    let temp = Math.round((x / gridSnapSize) * gridSnapSize) + 0.5
    if((Math.round((i-1) * gridSnapSize) + 0.5) < temp &&
        temp < (Math.round(i * gridSnapSize) + 0.5)){
      gateX = Math.round((i-1) * gridSnapSize) + 0.5;
    }
  }

  for (let j = 1; j < height / gridSnapSize; j++) {
    let temp = Math.round((y / gridSnapSize) * gridSnapSize)
    if((Math.round((j-1) * gridSnapSize)) < temp &&
        temp < (Math.round(j * gridSnapSize))){
      gateY = Math.round((j-1) * gridSnapSize);
    }
  }

  console.log("gateX: " + gateX + " | gateY: " + gateY);

  if(type === 'cnot'){
    newGate(gateX,  gateY, 4, 2, layer, stage, 'img/cnot.png', 'cnotGate', 'user', 'rectangle', false, currentStep);
  } else if(type === 'not'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/not.png', 'notGate', 'user', 'rectangle', false, currentStep);
  } else if(type === 'ccswap'){
    newGate(gateX,  gateY, 8, 2, layer, stage, 'img/ccswap.png', 'ccswapGate', 'user', 'rectangle', false, currentStep);
  } else if(type === 'cswap'){
    newGate(gateX,  gateY, 6, 2, layer, stage, 'img/cswap.png', 'cswapGate', 'user', 'rectangle', false, currentStep);
  } else if(type === 'swap'){
    newGate(gateX,  gateY, 4, 2, layer, stage, 'img/swap.png', 'swapGate', 'user', 'rectangle', false, currentStep);
  } else if(type === 'pete'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/pete.png', 'peteGate', 'user', 'rectangle', false, currentStep);
  } else if(type === 'pipe'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/pipe.png', 'pipeGate', 'user', 'rectangle', false, currentStep);
  } else if(type === 'white'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/white.png', 'whiteBall', 'user', 'circle', false, currentStep);
  } else if(type === 'black'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/black.png', 'blackBalls', 'user', 'circle', false, currentStep);
  } else if(type === 'wbmist'){
    newGate(gateX,  gateY, 4, 2, layer, stage, 'img/wb.png', 'wbMist', 'user', 'rectangle', false, currentStep);
  } else if(type === 'wnegbmist'){
    newGate(gateX,  gateY, 4, 2, layer, stage, 'img/wnegb.png', 'w-bMist', 'user', 'rectangle', false, currentStep);
  }

  stage.add(layer);
  type = '';
});

/*############################################################################*/
/*####################### Colision Detection #################################*/
/*############################################################################*/

function haveIntersection(r1, r2) {

  if(r1.attrs.shapeType.includes('shadow') || r2.attrs.shapeType.includes('shadow') ){
    return false;
  }

  y1 = r1.attrs.y
  h1 = r1.attrs.height;
  x1 = r1.attrs.x
  w1 = r1.attrs.width

  x2 = r2.attrs.x
  w2 = r2.attrs.width
  y2 = r2.attrs.y
  h2 = r2.attrs.height;


  let colision = !(
    x2 > x1 + w1/2 ||
    x2 + w2/2 < x1 ||
    y2 > y1 + h1/2 ||
    y2 + h2/2 < y1
  )

  return colision;
}

function calcNewY(r1, r2){
  y1 = r1.attrs.y
  h1 = r1.attrs.height;

  y2 = r2.attrs.y
  h2 = r2.attrs.height;

  if ((y1 + h1/2) > (y2 + h2/2) > y1){
    return y1 - h2;
  } else {
    return (y1 + h1);
  }
}

function calcNewX(r1, r2){
  x1 = r1.attrs.x
  w1 = r1.attrs.width;

  x2 = r2.attrs.x
  w2 = r2.attrs.width;

  if ((x1 + w1/2) > (x2 + w2/2) > x1){
    return (x1 - w2);
  } else {
    return (x1 + w1);
  }
}

layer.on('dragmove', function (e) {
  let target = e.target;

  layer.children.each(function (shape) {
    // do not check intersection with itself
    if (shape === target) {
      return;
    } else if (haveIntersection(shape, target)) {
      newX = calcNewX(shape, target)
      newY = calcNewY(shape, target)
      target.position({
        x: newX,
        y: newY
      });
    }
  });
});


