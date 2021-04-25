function createPETE_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 2, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks/img/pete.png', 'peteGate', 'user');
  stage.add(layer);
}

function createSWAP_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks/img/swap.png', 'swapGate', 'user');
  stage.add(layer);
}

function createCSWAP_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 6, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks/img/cswap.png', 'cswapGate', 'user');
  stage.add(layer);
}

function createCCSWAP_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 8, 2, layer, stage, 'https://raw.githubusercontent.com/JulianBeaulieu/QBlocks/main/img/ccswap.png', 'ccswapGate', 'user');
  stage.add(layer);
}

function createCNOT_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks/img/cnot.png', 'cnotGate', 'user');
  stage.add(layer);
}

function createNOT_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 2, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks/img/not.png', 'notGate', 'user');
  stage.add(layer);
}

function createBLACK_BALL(){
  newBall(blockSnapSize * 2, blockSnapSize * 2, 0.5, layer, stage, 'black', 'user');
  stage.add(layer);
}

function createWHITE_BALL(){
  newBall(blockSnapSize * 2, blockSnapSize * 2, 0.5, layer, stage, 'white', 'user');
  stage.add(layer);
}

function createWBMist(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks/img/wb.png', 'wbMist', 'user');
  stage.add(layer);
}

function createWNegBMist(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'https://julianBeaulieu.com/QBlocks/img/wnegb.png', 'w-bMist', 'user');
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
