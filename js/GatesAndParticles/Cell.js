class Cell{
    
    // currGrid is the grid that we have currently
    // input is the input(s) to the gate



    /*
        id is the numerical id used for behind the scenes
        ouput is the vector to be outputted in the CELL BENEATH
    */
    code = -1;
    output = "?";
    constructor(id){
        this.code = id;
    }
    
    run(relCel){
        const notGate = math.matrix([[0, 1], [1, 0]]);
        if(this.code === "0"){
            // what to display in a blank cell if output is coming from above gate
            let temp = relCel[0];
                temp = temp.map(function(each_element){
                return Number(each_element.toFixed(5));
            });
            let toDisp = JSON.stringify(temp);

            let plusState = math.matrix([[Math.SQRT1_2], [Math.SQRT1_2]]);
            plusState = plusState.map(function(each_element){
                return Number(each_element.toFixed(5));
            });

            let toCmpPlus = JSON.stringify(plusState);


            let minState = math.matrix([[Math.SQRT1_2], [-1 * Math.SQRT1_2]]);
            minState = minState.map(function(each_element){
                return Number(each_element.toFixed(5));
            });

            let toCmpMin = JSON.stringify(minState);
            let globPhaseCmpMin = JSON.stringify(math.multiply(-1, minState));
            if(toDisp === toCmpPlus){
                this.code = "a";
            }else if(toDisp === toCmpMin || toDisp === globPhaseCmpMin){
                this.code = "b";
            }else{
                

                if(toDisp === JSON.stringify(math.matrix([[0], [1]]))){
                    this.code = "8";
                }else if(toDisp === JSON.stringify(math.matrix([[1], [0]]))){
                    this.code = "9";
                }else{
                    console.log("Error")
                }
            }
        }else if(this.code === "5"){
            this.output = math.multiply(notGate, relCel[0]);
        }else if(this.code === "1"){
            this.output = relCel[0];
        }else if(this.code === "1.1"){
            this.output = relCel[1];
        }else if(this.code === "1.2"){
            let ans = relCel[2];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]])) && JSON.stringify(relCel[1]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = relCel[3];
            }
            this.output = ans;
        }else if(this.code === "1.3"){
            let ans = relCel[3];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]])) && JSON.stringify(relCel[1]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = relCel[2];
            }
            this.output = ans;
        }else if(this.code === "2"){
            this.output = relCel[0];
        }else if(this.code === "2.1"){
            let ans = relCel[1];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = relCel[2];
            }
            this.output = ans;
        }else if(this.code === "2.2"){
            let ans = relCel[2];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = relCel[1];
            }
            this.output = ans;
        }else if(this.code === "4"){
            this.output = relCel[1];
        }else if(this.code === "4.1"){
            this.output = relCel[0];
        }else if(this.code === "3"){
            this.output = relCel[0];
        }else if(this.code === "3.1"){
            let ans = relCel[1];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = math.multiply(notGate, ans);
            }
            this.output = ans;
        }else if(this.code === "6"){         
            this.output = relCel[0];
        }else if(this.code === "7"){
            const peteGate = math.matrix([[Math.SQRT1_2, Math.SQRT1_2], [Math.SQRT1_2, -1 * Math.SQRT1_2]]);
            this.output = math.multiply(peteGate, relCel[0]);
        }else if(this.code === "8"){
            // black ball
            this.output = math.matrix([[0], [1]]);
        }else if(this.code === "9"){
            // white ball
            this.output = math.matrix([[1], [0]]);
        }else if(this.code === "a"){
            // + state
            this.output = math.matrix([[Math.SQRT1_2], [Math.SQRT1_2]]);
        }else if(this.code === "b"){
            // - state
            this.output = math.matrix([[Math.SQRT1_2], [-1 * Math.SQRT1_2]]);
        }
        
        
    }
    // instead of currGrid, ill pass in any necessary thing as a cell object in an array

     mistControlPop(){

    }
}