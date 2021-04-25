function simulate(matchedObjects){
  var newObjects = [];

  for (var i = 0; i < matchedObjects.length; i++) {
    let particles = matchedObjects[i];
    let gate = particles[0];
    particles.splice(0, 1);

    let elementList = gate.run(particles);

    elementList.forEach((item, i) => {
      newObjects.push(item);
    });
  }

  return newObjects;
}
