shadowOffset = 20;
let blockSnapSize = 30;
let gridY = 25
let gridX = 25

// creates an empty canvas for the computer to perform calculations
let pseudoGrid = Array(gridY).fill(new Cell("-")).map(x => Array(gridX).fill(new Cell("-")));
let cellsToCalc = [];


// double blockSnapSize
let gridSnapSize = blockSnapSize * 2;
let timeout;
let lastTap = 0;
let hideResults = false;
let currentStep = 0;
let gridLinesColor = '#c6c6c6';

let width = Math.round(document.getElementById('canvas-div').clientWidth / gridSnapSize) * gridSnapSize;
let height = Math.round( document.getElementById('canvas-div').clientHeight / gridSnapSize) * gridSnapSize;

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
      console.log("THIS IS CALLED")
    });

    rectangle.on('dragmove', (e) => {
      shadowRectangle.position({
        x: Math.round(rectangle.x() / gridSnapSize) * gridSnapSize,
        y: Math.round(rectangle.y() / gridSnapSize) * gridSnapSize
      });
      stage.batchDraw();
      console.log("THIS IS CALLED")
    });

    layer.add(rectangle);

    layer.batchDraw();
    // do something else on right click
    rectangle.on('contextmenu', (e) => {
      rectangle.destroy();
      shadowRectangle.destroy();
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

  let overlapping = willOverlap(gateX, gateY);

  console.log("gateX: " + gateX + " | gateY: " + gateY + " | overlapping: " + overlapping);

  if(!overlapping) {
    if (type === 'cnot') {
      newGate(gateX, gateY, 4, 2, layer, stage, 'img/cnot.png', 'cnotGate', 'user', 'rectangle', false, currentStep);
    } else if (type === 'not') {
      newGate(gateX, gateY, 2, 2, layer, stage, 'img/not.png', 'notGate', 'user', 'rectangle', false, currentStep);
    } else if (type === 'ccswap') {
      newGate(gateX, gateY, 8, 2, layer, stage, 'img/ccswap.png', 'ccswapGate', 'user', 'rectangle', false, currentStep);
    } else if (type === 'cswap') {
      newGate(gateX, gateY, 6, 2, layer, stage, 'img/cswap.png', 'cswapGate', 'user', 'rectangle', false, currentStep);
    } else if (type === 'swap') {
      newGate(gateX, gateY, 4, 2, layer, stage, 'img/swap.png', 'swapGate', 'user', 'rectangle', false, currentStep);
    } else if (type === 'pete') {
      newGate(gateX, gateY, 2, 2, layer, stage, 'img/pete.png', 'peteGate', 'user', 'rectangle', false, currentStep);
    } else if (type === 'pipe') {
      newGate(gateX, gateY, 2, 2, layer, stage, 'img/pipe.png', 'pipeGate', 'user', 'rectangle', false, currentStep);
    } else if (type === 'white') {
      newGate(gateX, gateY, 2, 2, layer, stage, 'img/white.png', 'whiteBall', 'user', 'circle', false, currentStep);
    } else if (type === 'black') {
      newGate(gateX, gateY, 2, 2, layer, stage, 'img/black.png', 'blackBalls', 'user', 'circle', false, currentStep);
    }else if (type === 'wbmist') {
      // TODO changing size of mists
      newGate(gateX, gateY, 2, 2, layer, stage, 'img/wb.png', 'wbMist', 'user', 'rectangle', false, currentStep);
    } else if (type === 'wnegbmist') {
      // this one too
      newGate(gateX, gateY, 2, 2, layer, stage, 'img/wnegb.png', 'w-bMist', 'user', 'rectangle', false, currentStep);
    }

    stage.add(layer);
    type = '';
  }
});3

function willOverlap(gateX, gateY) {
  let overlapping = false;
  let shapes = ["Image", "Rect", "Circle"];

  shapes.forEach((shape, i) => {
    let shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      if( !(object.attrs.shapeType.includes("shadow"))){
        let coordinates = [[parseInt(object.attrs.x), parseInt(object.attrs.y)]];
        let objectType = object.attrs.type;

        if(objectType.includes("ccswap")){
          coordinates.push([parseInt(object.attrs.x + 60), parseInt(object.attrs.y)]);
          coordinates.push([parseInt(object.attrs.x + 120), parseInt(object.attrs.y)]);
          coordinates.push([parseInt(object.attrs.x + 180), parseInt(object.attrs.y)]);
        } else if(objectType.includes("cswap")){
          coordinates.push([parseInt(object.attrs.x + 60), parseInt(object.attrs.y)]);
          coordinates.push([parseInt(object.attrs.x + 120), parseInt(object.attrs.y)]);
        } else if(objectType.includes("swap") || objectType.includes("cnot")){
          coordinates.push([parseInt(object.attrs.x + 60), parseInt(object.attrs.y)]);
        }

        for(var i = 0; i < coordinates.length; i++ && !overlapping) {
          let coordinate = coordinates[i];
          let tempBool = (((coordinate[0]|0) === (gateX|0)) && ((coordinate[1]|0) === (gateY|0)));

          if (tempBool){
            overlapping = true;
          }
        }
      }
    });
  });

  return overlapping;
}

/*############################################################################*/
/*####################### Colision Detection #################################*/
/*############################################################################*/

function haveIntersection(r1, r2) {

  if(r1.attrs.shapeType.includes('shadow') || r2.attrs.shapeType.includes('shadow') ){
    return false;
  }

  let y1 = r1.attrs.y;
  let h1 = r1.attrs.height;
  let x1 = r1.attrs.x;
  let w1 = r1.attrs.width

  let x2 = r2.attrs.x;
  let w2 = r2.attrs.width;
  let y2 = r2.attrs.y;
  let h2 = r2.attrs.height;


  let colision = !(
    x2 > (x1 + w1) * 0.95 ||
    (x2 + w2) * 0.95 < x1 ||
    y2 > y1 + h1/2 ||
    y2 + h2/2 < y1
  )

  return colision;
}

function hasLeftCanvas(r1) {

  if(r1.attrs.shapeType.includes('shadow') ){
    return false;
  }

  let y1 = r1.attrs.y;
  let h1 = r1.attrs.height;
  let x1 = r1.attrs.x;
  let w1 = r1.attrs.width;

  let left = 0;
  let right = width;
  let top = 0;
  let bottom = height;

  let colision = (
      y1 < top ||
      y1 + h1 > bottom ||
      x1 < left ||
      x1 + w1 > right
  )

  return colision;
}

function calcNewDepartureFromCanvasY(r1){
  y1 = r1.attrs.y
  h1 = r1.attrs.height;

  let top = 0;
  let bottom = height;

  console.log("y1 < top\n" + y1 + " < " + top +
              "\ny1 + h1 > bottom\n" + (y1 + h1) + " > " + bottom);

  if (y1 < top){
    return top;
  } else if((y1+h1) > bottom) {
    return (bottom - h1);
  } else {
    return y1;
  }
}

function calcNewDepartureFromCanvasX(r1){
  x1 = r1.attrs.x
  w1 = r1.attrs.width;

  let left = 0;
  let right = width;

  if (x1 < left){
    return left;
  } else if((x1+w1) > right) {
    return (right - w1);
  } else {
    return x1;
  }
}

function calcNewCollisionY(r1, r2){
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

function calcNewCollisionX(r1, r2){
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

/*############################################################################*/
/*####################### Canvas Operations ##################################*/
/*############################################################################*/

layer.on('dragmove', function (e) {
  let target = e.target;

  layer.children.each(function (shape) {
    // do not check intersection with itself

    // checks if image has left grid
    if (hasLeftCanvas(target)){
      newX = calcNewDepartureFromCanvasX(target)
      newY = calcNewDepartureFromCanvasY(target)
      target.position({
        x: newX,
        y: newY
      });
    } else if (shape === target) {
      return;
    } else if (haveIntersection(shape, target)) {
      newX = calcNewCollisionX(shape, target)
      newY = calcNewCollisionY(shape, target)
      target.position({
        x: newX,
        y: newY
      });
    }
  });
});

function clearBallsAndMists() {
  // select shapes by name
  let shapes = ["Image", "Circle", "Square", "Rect"];

  currentStep = 0;

  shapes.forEach((shape, i) => {
    let shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      if(isNotObjectShadow(object.attrs.shapeType.toLowerCase()) &&
          isBallMistOrBoth(object.attrs.type.toLowerCase())){
        object.destroy();
        layer.draw();
      }
    });
  });
};

function clearSimulations() {
  // select shapes by name
  let objects = stage.find('#simulation');

  currentStep = 0;

  objects.each(function (object) {
    object.destroy();
    layer.draw();
  });
};

function clearAllObjects(){
  // select shapes by name

  let shapes = ["Image", "Rect", "Circle"];

  currentStep = 0;

  shapes.forEach((shape, i) => {
    let shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      console.log(shape);
      object.destroy();
    });
  });

  layer.draw();
};

function undoLastSimulation(){
  // select shapes by name
  let lastLevel = '' + currentStep;
  console.log("lastLevel: " + lastLevel);

  let objects = stage.find('#simulation');

  objects.each(function (object) {
    if(object.attrs.createdAtLevel === currentStep){
      object.destroy();
      layer.draw();
    }
  });

  currentStep = (currentStep > 0) ? currentStep - 1 : 1;
}

// retrieve elements from canvas GUI and create the object in pseudoGrid
function getElementsFromCanvas(){
  let shapes = ["Image", "Circle", "Rectangle", "Square"];

  shapes.forEach((shape, i) => {
    let shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      if(isNotObjectShadow(object.attrs.shapeType.toLowerCase())) {
        // retrieves all elements from canvas and pushes onto an array
        cellsToCalc.push(createObject(object));
      }
    });
  });
  // returns the array of coords containing gates that need to be run
}


// makes the GUI canvas display what is shown on the pseudoGrid (after simulation has run)
function drawObjects(){
  console.log("drawing new objects");
  //TODO
  clearSimulations();
  for(let i = 0; i < gridY; i++){
    for(let j = 0; j < gridX; j++){
      // if a cell is blank but has an input, display
      //console.log("Curr Y" + )

      // if the cell is not below a gate do not udraw it again
      if(i === 0 || pseudoGrid[i - 1][j].code === "-" || pseudoGrid[i - 1][j].code === "0"){
        continue;
      }
      if(pseudoGrid[i][j].code === "8" || pseudoGrid[i][j].code === "9"){
        let imgFilePath = hideResults ? 'img/square.png' : ('img/' + ((pseudoGrid[i][j].code === "9") ? 'white' : 'black') + '.png');
        let objectType = ((pseudoGrid === "9") ? 'white' : 'black') + 'Ball';
  
        console.log("Current x in draw obj " + j + " curr y in draw obj" + i);
        newGate(j * 2 * blockSnapSize + .5, i * 2 * blockSnapSize, 2, 2, layer, stage, imgFilePath, objectType, "simulation", 'circle', hideResults, currentStep);
      }else if(pseudoGrid[i][j].code === "a" || pseudoGrid[i][j].code === "b"){
        let imgFilePath = "";
        if(pseudoGrid[i][j].code === "a"){
          imgFilePath = "img/wb.png";
          objectType = 'wbMist';
        }else{
          imgFilePath = "img/wnegb.png";
          objectType = 'w-bMist';
        }
        newGate(j * 2 * blockSnapSize + .5, i * 2 * blockSnapSize, 2, 2, layer, stage, imgFilePath, objectType, "simulation", 'rectangle', hideResults, currentStep);
      }
      stage.add(layer);
  }
      
  }
}

// TODO split up from here

/*############################################################################*/
/*####################### Canvas Operations ##################################*/
/*############################################################################*/

function toggleHideOutput() {
  //TODO
  let checkBox = document.getElementById("checkIfHidden");
  hideResults = (checkBox.checked === true);
}


// function that is called when run button is clicked
function run(allLevels = false) {
  resetGrid();

  // retrieves elements from canvas and puts on pseudoGrid
  getElementsFromCanvas();
  // elements is an array of all objects on canvas
  let success = false;

  printGrid();

  // throws popup if error occurs
  try{
    calcGrid();
    success = true;
  }catch(error){
    resetGrid();
    swal("Oops, something is wrong.", "It's likely one or more inputs to a gate has not been given. Please check and try again.");
  }

  if(success){
    drawObjects();
  }
  printGrid();

  return true;
}

function makeid(length) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
  }
  return result;
} 


// take in an object (ball, mist or gate) and put in pesudoGrid
function createObject(object) {

  // takes pixel coords and calculates grid coords
  let xCoord = Math.round((object.attrs.x - .5) / gridSnapSize);
  let yCoord = Math.round(object.attrs.y / gridSnapSize);

  let code = "-1";
  let gatePorts = 0;

  if(object.attrs.id === "simulation"){
    return [yCoord, xCoord];
  }

  //debugging
  console.log("here is the object id" + object.attrs.id);
  console.log("in create object func", object.attrs.type.toLowerCase());
  console.log(yCoord + " " + xCoord);

  // goes through each possible object (can swith to switch case)
  if(object.attrs.type.toLowerCase().includes("ccswap")){
    code = "1";
    gatePorts = 4
    pseudoGrid[yCoord][xCoord + 1] = new Cell("1.1");
    pseudoGrid[yCoord][xCoord + 2] = new Cell("1.2");
    pseudoGrid[yCoord][xCoord + 3] = new Cell("1.3")
  } else if(object.attrs.type.toLowerCase().includes("cswap")){
    code = "2";
    gatePorts = 3;
    pseudoGrid[yCoord][xCoord + 1] = new Cell("2.1");
    pseudoGrid[yCoord][xCoord + 2] = new Cell("2.2");
  } else if(object.attrs.type.toLowerCase().includes("cnot")){
    code = "3";
    gatePorts = 2
    pseudoGrid[yCoord][xCoord + 1] = new Cell("3.1");
  } else if(object.attrs.type.toLowerCase().includes("swap")){
    code = "4";
    gatePorts = 2
    pseudoGrid[yCoord][xCoord + 1] = new Cell("4.1");

  } else if(object.attrs.type.toLowerCase().includes("not")){
    code = "5";
    gatePorts = 1
  } else if(object.attrs.type.toLowerCase().includes("pipe")){
    code = "6";
    gatePorts = 1;
  } else if(object.attrs.type.toLowerCase().includes("pete")){
    code = "7";
    gatePorts = 1;
  } else if(object.attrs.type.toLowerCase().includes("black")){
    code = "8";
  } else if(object.attrs.type.toLowerCase().includes("white")){
    code = "9";
  } else if(object.attrs.type.toLowerCase().includes("wb")){
    code = "a";
  } else if(object.attrs.type.toLowerCase().includes("w-b")){
    code = "b"
  } else {
    console.log("Unexpected outcome")
    //return null;
  }
  //initializes new cell at the location of the coords
  pseudoGrid[yCoord][xCoord] = new Cell(code);

  // initializes new cell for each additional input the cell takes
  for(let i = 0; i < gatePorts; i++){
    pseudoGrid[yCoord + 1][xCoord + i] = new Cell("0");
  }
 
  // returns the coordinates to be passed on to the calculation function
  return [yCoord, xCoord];
}

function customSort(a, b){
  return a[0] - b[0];
}

function calcGrid(){
  let gatePorts = 0;

  cellsToCalc.sort(customSort);

  for(let cells = 0; cells < cellsToCalc.length; cells++){
    console.log("this is cells to calc" + cellsToCalc);
    yCoord = cellsToCalc[cells][0];
    xCoord = cellsToCalc[cells][1];
    if(yCoord < 0){
      continue;
    }

    gatePorts = 0;
    let input = [];
    let currCode = pseudoGrid[yCoord][xCoord].code;
    console.log("calculating these coords" + yCoord + " " + xCoord);
    console.log("curr Code " + currCode);


    if(currCode === "1"){
      code = "1";
      gatePorts = 4
      input.push(pseudoGrid[yCoord - 1][xCoord].output);
      input.push(pseudoGrid[yCoord - 1][xCoord + 1].output);
      input.push(pseudoGrid[yCoord - 1][xCoord + 2].output);
      input.push(pseudoGrid[yCoord - 1][xCoord + 3].output);
      pseudoGrid[yCoord][xCoord + 1].run(input);
      pseudoGrid[yCoord][xCoord + 2].run(input);
      pseudoGrid[yCoord][xCoord + 3].run(input);
    } else if(currCode === "2"){
      code = "2";
      gatePorts = 3;
      input.push(pseudoGrid[yCoord - 1][xCoord].output);
      input.push(pseudoGrid[yCoord - 1][xCoord + 1].output);
      input.push(pseudoGrid[yCoord - 1][xCoord + 2].output);
      pseudoGrid[yCoord][xCoord + 1].run(input);
      pseudoGrid[yCoord][xCoord + 2].run(input);
    } else if(currCode == "3"){
      code = "3";
      gatePorts = 2
      input.push(pseudoGrid[yCoord - 1][xCoord].output);
      input.push(pseudoGrid[yCoord - 1][xCoord + 1].output);
      pseudoGrid[yCoord][xCoord + 1].run(input);
    } else if(currCode == "4"){
      code = "4";
      gatePorts = 2
      input.push(pseudoGrid[yCoord - 1][xCoord].output);
      input.push(pseudoGrid[yCoord - 1][xCoord + 1].output);
      pseudoGrid[yCoord][xCoord + 1].run(input);

    } else if(currCode == "5"){
      code = "5";
      gatePorts = 1
      console.log("this is from cell above" + pseudoGrid[yCoord - 1][xCoord].output);
      input.push(pseudoGrid[yCoord - 1][xCoord].output);
    } else if(currCode == "6"){
      code = "6";
      input.push(pseudoGrid[yCoord - 1][xCoord].output);
      gatePorts = 1;
    } else if(currCode == "7"){
      code = "7";
      gatePorts = 1;
      input.push(pseudoGrid[yCoord - 1][xCoord].output);
    }else {
      console.log("Something could have gone wrong while calculating objects. this was the currCode" + currCode);
      //return null;
    }
    pseudoGrid[yCoord][xCoord].run(input);
    // takes care of the output ports
    for(let i = 0; i < gatePorts; i++){
      input = [];
      input.push(pseudoGrid[yCoord][xCoord + i].output);
      pseudoGrid[yCoord + 1][xCoord + i].run(input);
    }
  }
}



/**
 * Function returns boolean value depending on if the entered object type is a ball or mist
 * @param objectType A string containing the objectType
 * @param operationType 0 = check for ball, 1 = check for mist, 2 = check for both. 2 is default.
 */
function isBallMistOrBoth(objectType, operationType=2) {
  if (operationType === 0){
    return objectType.includes("ball");
  } else if(operationType === 1){
    return objectType.includes("mist");
  }else if(operationType === 2){
    return objectType.includes("ball") || objectType.includes("mist");
  }else{
    return false;
  }
}

function isNotObjectShadow(objectType){
  return !objectType.includes("shadow");
}


// displays pseudoGrid in console, for debugging purposes
function printGrid(){
  var gridRow;
  // TODO pring out the grid
  for(let i = 0; i < gridY; i++){
    gridRow = "";
    for(let j = 0; j < gridX; j++){
      gridRow += pseudoGrid[i][j].code;
    }
    console.log(gridRow);
  }
  console.log("done");
}

// resets pseudoGrid to all blanks and resets the cells to calculate
function resetGrid(){
  pseudoGrid = Array(gridY).fill(new Cell("-")).map(x => Array(gridX).fill(new Cell("-")));
  cellsToCalc = [];
}

