let ballX = 3;
let ballY = 3;
let gateX = 4;
let gateY = 4;

function createPETE_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/pete.png', 'peteGate', 'user');
  stage.add(layer);
}

function createSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/swap.png', 'swapGate', 'user');
  stage.add(layer);
}

function createCSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 6, 2, layer, stage, 'img/cswap.png', 'cswapGate', 'user');
  stage.add(layer);
}

function createCCSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 8, 2, layer, stage, 'img/ccswap.png', 'ccswapGate', 'user');
  stage.add(layer);
}

function createCNOT_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/cnot.png', 'cnotGate', 'user');
  stage.add(layer);
}

function createNOT_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/not.png', 'notGate', 'user');
  stage.add(layer);
}

function createPIPE_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/pipe.png', 'pipeGate', 'user');
  stage.add(layer);
}

function createBLACK_BALL(){
  newGate(gateX,  gateY, 2, 2, layer, stage, 'img/black.png', 'black', 'user', 'circle');
  stage.add(layer);
}

function createWHITE_BALL(){
  newGate(gateX,  gateY, 2, 2, layer, stage, 'img/white.png', 'white', 'user', 'circle');
  stage.add(layer);
}

function createWBMist(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/wb.png', 'wbMist', 'user');
  stage.add(layer);
}

function createWNegBMist(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/wnegb.png', 'w-bMist', 'user');
  stage.add(layer);
}


function start(){
  console.log("Starting simulations");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  getShapes();

  $(".loader-wrapper").fadeOut("fast");
}

function reset(){
  console.log("Clearing simulation objects");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  showUsergenerated();
  clearSimulations();

  $(".loader-wrapper").fadeOut("fast");
  //clearBalls();
}

function clearAll(){
  console.log("Clearing all objects");

  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  clearAllObjects();

  $(".loader-wrapper").fadeOut("fast");
}
