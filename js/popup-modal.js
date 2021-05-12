// Get the introductionModal
var introduction_Modal = document.getElementById("introductionModal");

// Get the instructionModal
var instruction_Modal = document.getElementById("instructionModal");

// Get the mistyStatesModal
var mistyStates_Modal = document.getElementById("mistyStatesModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    introduction_Modal.style.display = "none";
    $("#introductionModal iframe").attr("src", $("#introductionModal iframe").attr("src"));
}

span.onclick = function() {
    instruction_Modal.style.display = "none";
    $("#instructionModal iframe").attr("src", $("#instructionModal iframe").attr("src"));
}

span.onclick = function() {
    mistyStates_Modal.style.display = "none";
    $("#mistyStatesModal iframe").attr("src", $("#mistyStatesModal iframe").attr("src"));
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === introduction_Modal) {
        introduction_Modal.style.display = "none";
        $("#introductionModal iframe").attr("src", $("#introductionModal iframe").attr("src"));
    } else if (event.target === instruction_Modal) {
        instruction_Modal.style.display = "none";
        $("#instructionModal iframe").attr("src", $("#instructionModal iframe").attr("src"));
    } else if (event.target === mistyStates_Modal) {
        mistyStates_Modal.style.display = "none";
        $("#mistyStatesModal iframe").attr("src", $("#mistyStatesModal iframe").attr("src"));
    }
}