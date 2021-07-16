let ballX = 3;
let ballY = 3;
let gateX = 4;
let gateY = 4;

function createPETE_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/pete.png', 'peteGate', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}

function createSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/swap.png', 'swapGate', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}

function createCSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 6, 2, layer, stage, 'img/cswap.png', 'cswapGate', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}

function createCCSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 8, 2, layer, stage, 'img/ccswap.png', 'ccswapGate', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}

function createCNOT_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/cnot.png', 'cnotGate', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}

function createNOT_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/not.png', 'notGate', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}

function createPIPE_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'img/pipe.png', 'pipeGate', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}

function createBLACK_BALL(){
  newGate(gateX,  gateY, 2, 2, layer, stage, 'img/black.png', 'blackBall', 'user', 'circle', false, currentLevel);
  stage.add(layer);
}

function createWHITE_BALL(){
  newGate(gateX,  gateY, 2, 2, layer, stage, 'img/white.png', 'whiteBall', 'user', 'circle', false, currentLevel);
  stage.add(layer);
}

function createWBMist(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/wb.png', 'wbMist', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}

function createWNegBMist(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'img/wnegb.png', 'w-bMist', 'user', 'rectangle', false, currentLevel);
  stage.add(layer);
}


function runNext(){
  console.log("Running next simulation");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  run();

  $(".loader-wrapper").fadeOut("fast");
}

function runAll(){
  console.log("Running all simulations");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  run(true);

  $(".loader-wrapper").fadeOut("fast");
}

function goBack(){
  console.log("Going back one step");
  $('#loading-sign').removeClass('hidden');
  $(".loader-wrapper").fadeIn("fast");

  undoLastSimulation();

  $(".loader-wrapper").fadeOut("fast");
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
