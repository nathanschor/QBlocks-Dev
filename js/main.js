// TODO: https://konvajs.org/docs/sandbox/Drop_DOM_Element.html


// var width = window.innerWidth;
// var height = window.innerHeight;
// window.onresize = function(){ location.reload(); }
var width = document.getElementById('canvas-div').clientWidth;
var height = (window.innerHeight * 0.5);

console.log("Height: " + height + " | Width: " + width);
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;
var gridSnapSize = 60;
var userGeneratedParticles = [];
var timeout;
var lastTap = 0;
var hideResults = false;

/*############################################################################*/
/*####################### Ball Definition ####################################*/
/*############################################################################*/

function newBall(x, y, radius, layer, stage, color, createdBy) {
  var shadowCircle = new Konva.Circle({
    x: x,
    y: y,
    shapeType: 'shadowCircle',
    type: color+'Ball',
    id: createdBy,
    radius: blockSnapSize * radius,
    fill: '#FF7B17',
    opacity: 0.6,
    stroke: '#CF6412',
    strokeWidth: 3,
    dash: [20, 2]
  });
  shadowCircle.hide();
  layer.add(shadowCircle);

  let circle = new Konva.Circle({
    x: x,
    y: y,
    x_prev: x,
    y_prev: y,
    shapeType: 'circle',
    type: color+'Ball',
    id: createdBy,
    radius: blockSnapSize * radius,
    fill: color,
    borderSize: 5,
    borderColor: 'black',
    stroke: 'black',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: {x : 1, y : 1},
    shadowOpacity: 0.4,
    draggable: true
  });

  circle.on('dragstart', (e) => {
    shadowCircle.show();
    shadowCircle.moveToTop();
    circle.moveToTop();
    circle.position({
      x_prev: circle.x,
      y_prev: circle.y
    });
  });

  circle.on('dragend', (e) => {
    let tempX = Math.round(circle.x() / gridSnapSize) * gridSnapSize;
    let tempY = Math.round(circle.y() / gridSnapSize) * gridSnapSize; // blockSnapSize
    circle.position({
      x: tempX,
      y: tempY
    });
    stage.batchDraw();
    shadowCircle.hide();
  });

  circle.on('dragmove', (e) => {
    let tempX = Math.round(circle.x() / gridSnapSize) * gridSnapSize;
    let tempY = Math.round(circle.y() / gridSnapSize) * gridSnapSize; // blockSnapSize
    shadowCircle.position({
      x: tempX,
      y: tempY
    });
    console.log("x: " + tempX + " | y: " + tempY);
    stage.batchDraw();
  });

  layer.add(circle);

  // do something else on right click
  circle.on('contextmenu', (e) => {
    circle.destroy();
    layer.draw();
  });
}

/*############################################################################*/
/*####################### Gate Definition ####################################*/
/*############################################################################*/

function newGate(x, y, width, height, layer, stage, filepath, type, createdBy, shapetype = 'rectangle', hidden = false) {
  let tempShadowShapeType = 'shadow' + shapetype;

  var shadowRectangle = new Konva.Rect({
    x: x,
    y: y,
    shapeType: tempShadowShapeType,
    type: type,
    id: createdBy,
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
        newGate(x, y, width, height, layer, stage, 'img/' + type + '.png', type, "simulation", 'circle', false);
      }
    });

    rectangle.on('touchend', (e) => {
      var currentTime = new Date().getTime();
      var tapLength = currentTime - lastTap;
      clearTimeout(timeout);
      if (tapLength < 500 && tapLength > 0) {
        rectangle.destroy();
        layer.draw();
        if(hidden){
          newGate(x, y, width, height, layer, stage, 'img/' + type + '.png', type, "simulation", 'circle', false);
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

var stage = new Konva.Stage({
  container: 'canvas',
  width: width,
  height: height
});

var gridLayer = new Konva.Layer();

for (var i = 0; i < width / gridSnapSize; i++) {
  gridLayer.add(new Konva.Line({
    points: [Math.round(i * gridSnapSize) + 0.5, 0, Math.round(i * gridSnapSize) + 0.5, height],
    stroke: '#ddd',
    strokeWidth: 1,
  }));
}

gridLayer.add(new Konva.Line({points: [0,0,10,10]}));
for (var j = 0; j < height / gridSnapSize; j++) {
  gridLayer.add(new Konva.Line({
    points: [0, Math.round(j * gridSnapSize), width, Math.round(j * gridSnapSize)],
    stroke: '#ddd',
    strokeWidth: 1,
  }));
}

var layer = new Konva.Layer();
stage.add(gridLayer);

// do not show context menu on right click
stage.on('contentContextmenu', (e) => {
  e.evt.preventDefault();
});

gridLayer.draw();

function fitStageIntoParentContainer() {
  var container = document.querySelector('#stage-parent');

// now we need to fit stage into parent
  var containerWidth = document.getElementById('canvas-div').clientWidth;
// to do this we need to scale the stage
  var scaleX = containerWidth / width;

// now we need to fit stage into parent
  var containerHeight = (window.innerHeight * 0.5);
// to do this we need to scale the stage
  var scaleY = containerHeight / height;
  console.log(containerWidth+" x " + containerHeight);
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
var type = '';
var listOfObjects = ['not', 'cnot', 'white', 'black', 'swap', 'cswap', 'ccswap', 'pete', 'pipe', 'wbmist', 'wnegbmist'];

for (i = 0; i < listOfObjects.length; i++) {
  let obj = listOfObjects[i];
  let id = 'drag-' + obj;
  document.getElementById(id).addEventListener('dragstart', function (e) {
    type = obj;
  });
}

var con = stage.container();
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

  for (var i = 1; i < width / gridSnapSize; i++) {
    let temp = Math.round((x / gridSnapSize) * gridSnapSize) + 0.5
    if((Math.round((i-1) * gridSnapSize) + 0.5) < temp &&
        temp < (Math.round(i * gridSnapSize) + 0.5)){
      gateX = Math.round((i-1) * gridSnapSize) + 0.5;
    }
  }

  for (var j = 1; j < height / gridSnapSize; j++) {
    let temp = Math.round((y / gridSnapSize) * gridSnapSize)
    if((Math.round((j-1) * gridSnapSize)) < temp &&
        temp < (Math.round(j * gridSnapSize))){
      gateY = Math.round((j-1) * gridSnapSize);
    }
  }

  console.log("gateX: " + gateX + " | gateY: " + gateY);

  if(type === 'cnot'){
    newGate(gateX,  gateY, 4, 2, layer, stage, 'img/cnot.png', 'cnotGate', 'user');
  } else if(type === 'not'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/not.png', 'notGate', 'user');
  } else if(type === 'ccswap'){
    newGate(gateX,  gateY, 8, 2, layer, stage, 'img/ccswap.png', 'ccswapGate', 'user');
  } else if(type === 'cswap'){
    newGate(gateX,  gateY, 6, 2, layer, stage, 'img/cswap.png', 'cswapGate', 'user');
  } else if(type === 'swap'){
    newGate(gateX,  gateY, 4, 2, layer, stage, 'img/swap.png', 'swapGate', 'user');
  } else if(type === 'pete'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/pete.png', 'peteGate', 'user');
  } else if(type === 'pipe'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/pipe.png', 'pipeGate', 'user');
  } else if(type === 'white'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/white.png', 'white', 'user', 'circle');
  } else if(type === 'black'){
    newGate(gateX,  gateY, 2, 2, layer, stage, 'img/black.png', 'black', 'user', 'circle');
  } else if(type === 'wbmist'){
    newGate(gateX,  gateY, 4, 2, layer, stage, 'img/wb.png', 'wbMist', 'user');
  } else if(type === 'wnegbmist'){
    newGate(gateX,  gateY, 4, 2, layer, stage, 'img/wnegb.png', 'w-bMist', 'user');
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
  var target = e.target;

  layer.children.each(function (shape) {
    // do not check intersection with itself
    if (shape === target) {
      return;
    }

    else if (haveIntersection(shape, target)) {
      newX = calcNewX(shape, target)
      newY = calcNewY(shape, target)
      target.position({
        x: newX,
        y: newY
      });
    } else {
    }
  });
});

/*############################################################################*/
/*####################### Simulation Code ####################################*/
/*############################################################################*/

function toggleHideOutput() {
  var checkBox = document.getElementById("checkIfHidden");
  hideResults = (checkBox.checked === true);
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
  }
  return result;
}

function createObject(object) {
  if(object.attrs.type.toLowerCase().includes("ccswap")){
    return new CCSwap(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("cswap")){
    return new CSwap(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("cnot")){
    return new CNot(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("swap")){
    return new Swap(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("not")){
    return new Not(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("pipe")){
    return new Pipe(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("pete")){
    return new Pete(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("black")){
    return new Ball(0, '+', object.attrs.x + object.attrs.height/2, object.attrs.y + object.attrs.height/2, object.attrs.height/2, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("white")){
    return new Ball(1, '+', object.attrs.x + object.attrs.height/2, object.attrs.y + object.attrs.height/2, object.attrs.height/2, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("wb")){
    return new Mist(1, '+', 0, '+', object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else if(object.attrs.type.toLowerCase().includes("w-b")){
    return new Mist(1, '+', 0, '1', object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height, makeid(10));
  } else {
    console.log("Something went wrong while creating the objects");
    return null;
  }
}

function drawObjects(objects, userGen=false){
  let generationType = userGen ? "user" : "simulation";
  objects.forEach((object, i) => {
    if(object.constructor.name.toLowerCase() === 'ball'){
      let imgFilePath = hideResults ? 'img/square.png' : ('img/' + ((object.color === 1) ? 'white' : 'black') + '.png');

      newGate(object.x - object.radius, object.y - object.radius, 2, 2, layer, stage, imgFilePath, ((object.color === 1) ? 'white' : 'black'), generationType, 'circle', hideResults);
    } else if(object.constructor.name.toLowerCase() === 'mist'){
      if(object.colorLeft === 1 && object.colorRight === 0 && object.signLeft === '+' && object.signRight === '+'){
        newGate(object.x, object.y, 4, 2, layer, stage, 'img/wb.png', 'wbMist', generationType);
      } else {
        newGate(object.x, object.y, 4, 2, layer, stage, 'img/wnegb.png', 'w-bMist', generationType);
      }
    } else {
      console.log("Something went wrong: " + object.toString());
      return null;
    }
    stage.add(layer);
  });
};

/**/

function clearBalls() {
  // select shapes by name
  let shapes = ["Image", "Circle", "Square"];

  shapes.forEach((shape, i) => {
    var shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      if(!object.attrs.shapeType.toLowerCase().includes("shadow")){
        if(object.attrs.shapeType.toLowerCase().includes("circle") || object.attrs.shapeType.toLowerCase().includes("square")){
          object.destroy();
          layer.draw();
        }
      }
    });
  });
};

function clearSimulations() {
  // select shapes by name
  var objects = stage.find('#simulation');

  objects.each(function (object) {
    object.destroy();
    layer.draw();
  });
};

function hideUsergenerated() {
  // select shapes by name
  var objects = stage.find('#user');

  objects.each(function (object) {
    if(!object.attrs.shapeType.toLowerCase().includes("shadow")) {
      if (object.attrs.shapeType.toLowerCase().includes("circle") ||
          object.attrs.shapeType.toLowerCase().includes("mist")) {
        userGeneratedParticles.push(createObject(object))
        object.destroy();
        layer.draw();
      }
    }
  });
};

function showUsergenerated() {
  // select shapes by name

  drawObjects(userGeneratedParticles, true);
  console.log(userGeneratedParticles);
  userGeneratedParticles = [];
};

function clearAllObjects(){
  // select shapes by name

  let shapes = ["Image", "Rect", "Circle"]

  shapes.forEach((shape, i) => {
    var shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      console.log(shape);
      object.destroy();
    });
  });

  layer.draw();
};

function clearSoonToBeDuplicateObjects(simulationOutcome){
  // select shapes by name

  //let shapes = ["Image", "Square", "Circle", "Rect"]

  let dictOfObjectsByCoordinates = {};

  simulationOutcome.forEach((element, i) => {
    if( !(element.getTopLeftCoordinates() in dictOfObjectsByCoordinates) ){
      dictOfObjectsByCoordinates[element.getTopLeftCoordinates()] = true;
    }
  });

  var objects = stage.find('#simulation');

  objects.each(function (object) {
    let x = parseInt(object.attrs.x);
    let y = parseInt(object.attrs.y);

    if([x, y] in dictOfObjectsByCoordinates){
      object.destroy();
    }
  });

  layer.draw();
};

/**/

function getShapes() {
  let shapes = ["Image", "Circle"];
  var elements = [];

  shapes.forEach((shape, i) => {
    var shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      if(!object.attrs.shapeType.toLowerCase().includes("shadow")){
        if(object.attrs.shapeType.toLowerCase().includes("circle") ||
            object.attrs.shapeType.toLowerCase().includes("mist")){
              elements.push(createObject(object));
            } else {
              elements.push(createObject(object));
            }
      }
    });
  });

  // #### This will remove intermittent balls for the animation to be smooth
  // if(document.getElementById("start-button-tag").innerText.toLowerCase() === "start"){
  //   document.getElementById("start-button-tag").innerText = "Continue";
  //   hideUsergenerated();
  // }

  let levels = splitElementsIntoGroupsByElementLevel(elements);

  console.log("Getting Levels");
  console.log(levels);

  levels = removeDisconectedLevels(levels);

  var matchedObjects = matchLevels(levels);

  matchedObjects = removeSingleObjects(matchedObjects);

  console.log("Getting IDs");
  console.log(matchedObjects[0].getID());

  if(matchedObjects.length === 0){
    return ;
  }

  let simulationOutcome = simulate(matchedObjects);

  //clearSimulations();

  clearSoonToBeDuplicateObjects(simulationOutcome);

  drawObjects(simulationOutcome);

  return(simulationOutcome);
};

function splitElementsIntoGroupsByElementLevel(elements){
  var levels = {};

  elements.forEach((gate, i) => {
    if(gate.level in levels){
      levels[gate.level].push(gate);
    } else {
      levels[gate.level] = [gate];
    }
  });

  return levels;
};

function matchLevels(levels) {
  let keys = Object.keys(levels);
  var aboveRow = levels[keys[0]];

  for (var i = 1; i < keys.length; i++) {
    aboveRow = matchElements(aboveRow, levels[keys[i]]);
  }

  return aboveRow;
};

function matchElements(aboveRow, belowRow){
  var matchedObjects = [];
  let ids = [];
  let idDict = {};

  aboveRow.forEach((element, i) => {
    idDict[element.id] = element;
  });

  belowRow.forEach((element, i) => {
    let temp = matchElement(element, aboveRow);
    aboveRow = temp[1];
    matchedObjects.push(temp[0]);
    ids = Array.from(new Set(ids.concat(temp[0].getID())));
  });

  Object.keys(idDict).forEach((key, i) => {
    if( !(ids.includes(key)) ){
      matchedObjects.push(idDict[key]);
    }
  });


  matchedObjects = Array.from(new Set(matchedObjects));

  return matchedObjects;
};

function matchElement (element, aboveRow) {

  aboveRow.forEach((elementAbove, i) => { //Loops through above elements
    elementAbove.getCenterCoordinates().forEach((centerCoordinates, j) => { //loops through all of the centers of the elements.

      if(element.isBelow(centerCoordinates[0], centerCoordinates[1])){
        element.addCenter(centerCoordinates[0], centerCoordinates[1], elementAbove,
                            elementAbove.getCenterPosition(centerCoordinates[0], centerCoordinates[1]));
      }

    });
  });

  return [element, aboveRow];
}

function removeSingleObjects(objects) {
  var convertedObjects = [];

  for (var i = 0; i < objects.length; i++) {
    if(objects[i].isComplete()){
      convertedObjects.push(objects[i]);
    }
  }

  return convertedObjects;
};

function removeDisconectedLevels(levels){
  var convertedObjects = {};
  let keys = Object.keys(levels);
  var prevKey = parseInt(keys[0]);
  convertedObjects[prevKey] = levels[prevKey];

  for (var i = 1; i < keys.length; i++) {
    if((parseInt(keys[i]) === parseInt(parseInt(prevKey) + parseInt(gridSnapSize)))){
      convertedObjects[keys[i]] = levels[keys[i]];
    }

    prevKey = keys[i];
  }

  return convertedObjects;
};

function simulate(matchedObjects){
  var newObjects = [];

  for (var i = 0; i < matchedObjects.length; i++) {

    try {
      let elementList = matchedObjects[i].run();

      elementList.forEach((item, i) => {
        newObjects.push(item);
      });
    }
    catch (e) {}
  }

  return newObjects;
}