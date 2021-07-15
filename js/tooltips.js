function over(buttonName){
    let gate = window.list_of_gates[0].find(e => e.name === buttonName);
    console.log(window.list_of_gates);

    console.log("OBJECT FOUND:");
    console.log(gate);
    console.log("end of object found");

    if (gate != null) {
        document.getElementById("title").innerHTML= gate.title;
        document.getElementById("description").innerHTML= gate.description;
    }
}