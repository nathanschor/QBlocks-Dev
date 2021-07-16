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

    let shapes = ["Image", "Rect", "Circle", "Mist"];

    shapes.forEach((shape, i) => {
        let shapeInStage = stage.find(shape);
        shapeInStage.each(function (object) {
            if(!object.attrs.shapeType.includes("shadow") && object.attrs.createdAtLevel === currentStep){
                console.log(object);
                object.destroy();
            }
        });
    });

    layer.draw();

    currentStep--;
}

function getElementsFromCanvas(){
    let shapes = ["Image", "Circle"];
    let elements = [];

    shapes.forEach((shape, i) => {
        let shapeInStage = stage.find(shape);
        shapeInStage.each(function (object) {
            if(isNotObjectShadow(object.attrs.shapeType.toLowerCase())) {
                elements.push(createObject(object));
            }
        });
    });

    return elements
}

function drawObjects(objects, userGen=false){
    let generationType = userGen ? "user" : "simulation";
    objects.forEach((object, i) => {
        if(object.constructor.name.toLowerCase() === 'ball'){
            let imgFilePath = hideResults ? 'img/square.png' : ('img/' + ((object.color === 1) ? 'white' : 'black') + '.png');
            let objectType = ((object.color === 1) ? 'white' : 'black') + 'Ball';

            console.log("Current level in drawObjects: " + currentStep);
            newGate(object.x - object.radius, object.y - object.radius, 2, 2, layer, stage, imgFilePath, objectType, generationType, 'circle', hideResults, currentStep);
        } else if(object.constructor.name.toLowerCase() === 'mist'){
            if(object.colorLeft === 1 && object.colorRight === 0 && object.signLeft === '+' && object.signRight === '+'){
                newGate(object.x, object.y, 4, 2, layer, stage, 'img/wb.png', 'wbMist', generationType, 'rectangle', hideResults, currentStep);
            } else {
                newGate(object.x, object.y, 4, 2, layer, stage, 'img/wnegb.png', 'w-bMist', generationType, 'rectangle', hideResults, currentStep);
            }
        } else {
            console.log("Something went wrong: " + object.toString());
            return null;
        }
        stage.add(layer);
    });
};