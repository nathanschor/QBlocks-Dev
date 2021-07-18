let filepathToJSON = "resources/gates.json";
window.list_of_gates = [];

$(document).ready(function(){
    $.getJSON(filepathToJSON, function(data){
        window.list_of_gates.push(data); // Prints: Harry
    }).fail(function(){
        console.log("An error has occurred.");
    });
});

function over(buttonName){
    try{
        let gate = window.list_of_gates[0].find(e => e.name === buttonName);

        if (gate != null) {
            document.getElementById("title").innerHTML= gate.title;
            document.getElementById("description").innerHTML= gate.description;
        }
    } catch (e) {}
}