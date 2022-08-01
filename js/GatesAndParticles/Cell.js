class Cell{
    
    // currGrid is the grid that we have currently
    // input is the input(s) to the gate

    code = -1;
    output = "?";
    
    /*
        id is the numerical id used for behind the scenes
        ouput is the vector to be outputted in the CELL BENEATH
    */
    // instead of currGrid, ill pass in any necessary thing as a cell object in an array
    constructor(id, relCel){
        const notGate = math.matrix([[0, 1], [1, 0]]);
        this.code = id;
        if(id === "0"){
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

            if(toDisp === toCmpPlus){
                this.code = "a";
            }else if(toDisp === toCmpMin){
                this.code = "b";
            }else{
                
                // let temp = relCel[0];
                // temp = temp.map(function(each_element){
                //     return Number(each_element.toFixed(15));
                // });
                // toDisp = JSON.stringify(temp);

                if(toDisp === JSON.stringify(math.matrix([[0], [1]]))){
                    this.code = "8";
                }else if(toDisp === JSON.stringify(math.matrix([[1], [0]]))){
                    this.code = "9";
                }else{
                    console.log("didnt pas thorugh anything");
                }
            }
        }else if(id === "5"){
            this.output = math.multiply(notGate, relCel[0]);
        }else if(id === "1"){
            this.output = relCel[0];
        }else if(id === "1.1"){
            this.output = relCel[1];
        }else if(id === "1.2"){
            let ans = relCel[2];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]])) && JSON.stringify(relCel[1]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = relCel[3];
            }
            this.output = ans;
        }else if(id === "1.3"){
            let ans = relCel[3];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]])) && JSON.stringify(relCel[1]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = relCel[2];
            }
            this.output = ans;
        }else if(id === "2"){
            this.output = relCel[0];
        }else if(id === "2.1"){
            let ans = relCel[1];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = relCel[2];
            }
            this.output = ans;
        }else if(id === "2.2"){
            let ans = relCel[2];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = relCel[1];
            }
            this.output = ans;
        }else if(id === "4"){
            this.output = relCel[1];
        }else if(id === "4.1"){
            this.output = relCel[0];
        }else if(id === "3"){
            this.output = relCel[0];
        }else if(id === "3.1"){
            let ans = relCel[1];
            if(JSON.stringify(relCel[0]) === JSON.stringify(math.matrix([[0], [1]]))){
                ans = math.multiply(notGate, ans);
            }
            this.output = ans;
        }else if(id === "6"){         
            this.output = relCel[0];
        }else if(id === "7"){
            const peteGate = math.matrix([[Math.SQRT1_2, Math.SQRT1_2], [Math.SQRT1_2, -1 * Math.SQRT1_2]]);
            this.output = math.multiply(peteGate, relCel[0]);
        }else if(id === "8"){
            // black ball
            this.output = math.matrix([[0], [1]]);
        }else if(id === "9"){
            // white ball
            this.output = math.matrix([[1], [0]]);
        }else if(id === "a"){
            // + state
            this.output = math.matrix([[Math.SQRT1_2], [Math.SQRT1_2]]);
        }else if(id === "b"){
            // - state
            console.log("ALJDFHJ");
            this.output = math.matrix([[Math.SQRT1_2], [-1 * Math.SQRT1_2]]);
        }
        
        
    }

   
}