function over(buttonName){
    let object = window.list_of_gates.find(e => e.name === buttonName);

    if (object != null) {
        document.getElementById("title").innerHTML= object.name;
        document.getElementById("description").innerHTML= object.description;
    }
}