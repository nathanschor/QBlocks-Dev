let ballX = 3;
let ballY = 3;
let gateX = 4;
let gateY = 4;

function createPETE_Gate(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/pete.png', 'peteGate', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}

function createSWAP_Gate(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/swap.png', 'swapGate', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}

function createCSWAP_Gate(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 6, 2, layer, stage, 'img/cswap.png', 'cswapGate', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}

function createCCSWAP_Gate(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 8, 2, layer, stage, 'img/ccswap.png', 'ccswapGate', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}

function createCNOT_Gate(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/cnot.png', 'cnotGate', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}

function createNOT_Gate(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/not.png', 'notGate', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}

function createPIPE_Gate(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/pipe.png', 'pipeGate', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}

function createBLACK_BALL(){
  if(!willOverlap(gateX, gateY)) {
    newGate(gateX, gateY, 2, 2, layer, stage, 'img/black.png', 'blackBall', 'user', 'circle', false, 0);
    stage.add(layer);
  }
}

function createWHITE_BALL(){
  if(!willOverlap(gateX, gateY)) {
    newGate(gateX, gateY, 2, 2, layer, stage, 'img/white.png', 'whiteBall', 'user', 'circle', false, 0);
    stage.add(layer);
  }
}

function createWBMist(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/wb.png', 'wbMist', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}

function createWNegBMist(){
  if(!willOverlap(gateX, gateY)) {
    newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/wnegb.png', 'w-bMist', 'user', 'rectangle', false, 0);
    stage.add(layer);
  }
}


function runNext(){
  console.log("Running next simulation");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  let success = run();

  $(".loader-wrapper").fadeOut("fast");

  if(!success){
    processingError();
  }
}

function runAll(){
  console.log("Running all simulations");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  let success = run(true);

  $(".loader-wrapper").fadeOut("fast");

  if(!success){
    processingError();
  }
}

function goBack(){
  console.log("Going back one step");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  undoLastSimulation();

  $(".loader-wrapper").fadeOut("fast");
}

function willOverlap(gateX, gateY) {
  let overlapping = false;
  let shapes = ["Image", "Rect", "Circle"];

  shapes.forEach((shape, i) => {
    let shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      if( !(object.attrs.shapeType.includes("shadow"))){
        let new_x = parseInt(object.attrs.x);
        let new_y = parseInt(object.attrs.y);

        overlapping = (((new_x|0) === (gateX|0)) && ((new_y|0) === (gateY|0)));
      }
    });
  });

  return overlapping;
}

function clearSimulation(){
  console.log("Clearing simulation objects");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  clearSimulations();

  $(".loader-wrapper").fadeOut("fast");
}

function clearAllBallsAndMists(){
  console.log("Clearing simulation objects");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  clearBallsAndMists();

  $(".loader-wrapper").fadeOut("fast");
}

function clearCanvas(){
  console.log("Clearing all objects");

  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  clearAllObjects();

  $(".loader-wrapper").fadeOut("fast");
}

function processingError() {
  swal("Oops, something is wrong.", "It's likely there's a mismatch between the output of one gate and the input of the next one. They have to be equal.");
}
