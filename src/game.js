class Game {
	constructor(canvas) {
    this.canvas = canvas;
    this.canvasBG = canvasBG;
    this.contextBG = this.canvasBG.getContext("2d");
		this.context = this.canvas.getContext("2d");
    this.world = new World
    this.person = new Person
    this.createPerson();
    this.walkPerson();
	}

createPerson() {
  context.globalAlpha = 0.7;
  let path = []
  let steps = Math.floor(Math.random() * 100)
  for (let i = 0; i < steps; i++) {
    path.push([Math.random(), Math.random()])
  }
  let options = {
    location: [0, 0],
    destination: [0, 0],
    path: path,
    speed: Math.random() / 10
  }
  this.world.generatePerson(options)
  console.log(this.world.people);
}

createDockingStation() {
	context.globalAlpha = 0.7;
   // this.world.generateDockingStation({location: [ cursorX / canvas.height , cursorY / canvas.width ]})
   let dockingStation = this.world.generateDockingStation();
   this.showDockingStation(dockingStation);
   console.log(dockingStation);
}

showDockingStation(dockingStation) {
	let width = 30;
	let height = 20;
  this.contextBG.fillRect(dockingStation.location[0] * this.canvasBG.width, dockingStation.location[1] * this.canvasBG.height, width, height);
}

walkPerson(){
  // clears the canvas on each run time
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  // sets the font for balance
  this.context.fillStyle = "black";
  this.context.font = '28px serif';
  this.context.fillText(`£ ${this.world.balance}`,600,50);
  // on each tick person takes a step
  this.world.tick();
  let width = 20;
  let height = 20;
  this.world.people.forEach(person1 => {
    if (person1.onVehicle) {
      this.context.fillRect(person1.location[0] * this.canvas.width, person1.location[1] * this.canvas.height, width + 20, height);
    } else {
      this.context.fillRect(person1.location[0] * this.canvas.width, person1.location[1] * this.canvas.height, width, height);
    }
    // TO BE TAKEN OUT LATER
    // draw lines to see where people are going.
    // does not affect the people or world at all
    this.context.lineWidth = 1
    this.context.strokeStyle = 'red'
    this.context.beginPath();
    this.context.moveTo(person1.location[0] *  this.canvas.width, person1.location[1] *  this.canvas.height);
    this.context.lineTo(person1.destination[0] *  this.canvas.width, person1.destination[1] *  this.canvas.height);
    this.context.stroke();

    if (person1.path[0]) {
      this.context.strokeStyle = 'green'
      this.context.beginPath();

      this.context.moveTo(person1.location[0] *  this.canvas.width, person1.location[1] *  this.canvas.height);
      this.context.lineTo(person1.path[0][0] *  this.canvas.width, person1.path[0][1] *  this.canvas.height);
      this.context.stroke();
      this.context.strokeStyle = 'blue'
      this.context.beginPath();
      this.context.moveTo(person1.destination[0] *  this.canvas.width, person1.destination[1] *  this.canvas.height);
      this.context.lineTo(person1.path[0][0] *  this.canvas.width, person1.path[0][1] *  this.canvas.height);
      this.context.stroke();
    }

  });
	setTimeout(() => {
    this.walkPerson();
  }, 50);
}




}