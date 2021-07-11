let filepathToJSON = "../resources/gates.json";
window.list_of_gates = [];

$(document).ready(function(){
    $.getJSON(filepathToJSON, function(data){
        window.list_of_gates = data; // Prints: Harry
    }).fail(function(){
        console.log("An error has occurred.");
    });
});