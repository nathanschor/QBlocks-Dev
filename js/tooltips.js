function over(buttonName){
    let gate = window.list_of_gates[0].find(e => e.name === buttonName);
    console.log(window.list_of_gates);

    if (gate != null) {
        document.getElementById("title").innerHTML= gate.title;
        document.getElementById("description").innerHTML= gate.description;
    }
}