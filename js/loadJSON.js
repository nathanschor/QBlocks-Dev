let filepathToJSON = "resources/gates.json";
window.list_of_gates = [];

$(document).ready(function(){
    $.getJSON(filepathToJSON, function(data){
        window.list_of_gates.push(data); // Prints: Harry
    }).fail(function(){
        console.log("An error has occurred.");
    });
});

console.log("JSON IMPORTED:");
console.log(window.list_of_gates);
console.log("End of import:");