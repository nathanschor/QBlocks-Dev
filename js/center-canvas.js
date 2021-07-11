window.addEventListener("load", function(){
    var my_element = document.getElementById("misty-states-canvas");

    console.log("Scrolling");

    my_element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
    });
});