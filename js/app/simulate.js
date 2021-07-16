function toggleHideOutput() {
    let checkBox = document.getElementById("checkIfHidden");
    hideResults = (checkBox.checked === true);
}

function run(allLevels = false) {

    let elements = getElementsFromCanvas();

    if(elements.length === 0){
        return ;
    }

    do {

        let levels = splitElementsIntoGroupsByElementLevel(elements);

        let returnedVals = removeDisconectedLevels(levels);

        elements = returnedVals[1];

        let matchedObjects = matchLevels(returnedVals[0]);

        matchedObjects = removeSingleObjects(matchedObjects);

        if (matchedObjects.length === 0) {
            return;
        }

        let simulationOutcome = simulate(matchedObjects);

        clearSoonToBeDuplicateObjects(simulationOutcome);

        drawObjects(simulationOutcome);

        elements.push(...simulationOutcome);
    }while(allLevels && (elements.length !== 0));
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



/**/

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





function splitElementsIntoGroupsByElementLevel(elements){
    let levels = {};

    elements.forEach((gate, i) => {
        if(gate.level in levels){
            levels[gate.level].push(gate);
        } else {
            levels[gate.level] = [gate];
        }
    });

    return levels;
}

function matchLevels(levels) {
    let keys = Object.keys(levels);
    let aboveRow = levels[keys[0]];

    for (let i = 1; i < keys.length; i++) {
        aboveRow = matchElements(aboveRow, levels[keys[i]]);
    }

    return aboveRow;
}

function matchElements(aboveRow, belowRow){
    let matchedObjects = [];
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
}

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
    let convertedObjects = [];

    for (let i = 0; i < objects.length; i++) {
        if(objects[i].isComplete()){
            convertedObjects.push(objects[i]);
        }
    }

    return convertedObjects;
}

function removeDisconectedLevels(levels){
    let convertedObjects = {};
    let keys = Object.keys(levels);
    let prevKey = parseInt(keys[0]);
    convertedObjects[prevKey] = levels[prevKey];
    let unusedObjects = [];

    for (let i = 1; i < keys.length; i++) {
        if((parseInt(keys[i]) === parseInt(parseInt(prevKey) + parseInt(gridSnapSize)))){
            convertedObjects[keys[i]] = levels[keys[i]];
        } else {
            unusedObjects.push(...levels[keys[i]]);
        }

        prevKey = keys[i];
    }

    return [convertedObjects, unusedObjects];
}

function simulate(matchedObjects){
    let newObjects = [];

    for (let i = 0; i < matchedObjects.length; i++) {

        try {
            let elementList = matchedObjects[i].run();

            elementList.forEach((item, i) => {
                newObjects.push(item);

            });
        }
        catch (e) {
            console.log("There was an error while trying to run a gate");
        }
    }

    currentStep++;
    return newObjects;
}





