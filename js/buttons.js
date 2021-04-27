let ballX = 3;
let ballY = 3;
let gateX = 4;
let gateY = 4;

function createPETE_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks-Dev/img/pete.png', 'peteGate', 'user');
  stage.add(layer);
}

function createSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks-Dev/img/swap.png', 'swapGate', 'user');
  stage.add(layer);
}

function createCSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 6, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks-Dev/img/cswap.png', 'cswapGate', 'user');
  stage.add(layer);
}

function createCCSWAP_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 8, 2, layer, stage, 'https://raw.githubusercontent.com/JulianBeaulieu/QBlocks-Dev/main/img/ccswap.png', 'ccswapGate', 'user');
  stage.add(layer);
}

function createCNOT_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks-Dev/img/cnot.png', 'cnotGate', 'user');
  stage.add(layer);
}

function createNOT_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks-Dev/img/not.png', 'notGate', 'user');
  stage.add(layer);
}

function createPIPE_Gate(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 2, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks-Dev/img/pipe.png', 'pipeGate', 'user');
  stage.add(layer);
}

function createBLACK_BALL(){
  newBall(blockSnapSize * ballX, blockSnapSize * ballY, 0.5, layer, stage, 'black', 'user');
  stage.add(layer);
}

function createWHITE_BALL(){
  newBall(blockSnapSize * ballX, blockSnapSize * ballY, 0.5, layer, stage, 'white', 'user');
  stage.add(layer);
}

function createWBMist(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks-Dev/img/wb.png', 'wbMist', 'user');
  stage.add(layer);
}

function createWNegBMist(){
  newGate(blockSnapSize * gateX, blockSnapSize * gateY, 4, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks-Dev/img/wnegb.png', 'w-bMist', 'user');
  stage.add(layer);
}


function start(){
  console.log("Starting simulations");
  getShapes();
}

function reset(){
  console.log("Clearing simulation objects");
  document.getElementById("start-button-tag").innerText = "Start";
  showUsergenerated();
  clearSimulations();
}

function clearAll(){
  console.log("Clearing all objects");
  clearAllObjects();
}
