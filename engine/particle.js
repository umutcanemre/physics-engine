particle = function(mass, radius) {
	
	//constant properties of particle
	this.mass = mass || 1.0;
	this.radius = radius || 1.0;

	//stores all things that could apply a force to particles
	this.behaviours = [];

	this.color = null;

	//properties of particle
	this.pos = new vector();
	this.forceVec = new vector();
	this.velocity = new vector();

	//stores states of properties in previous step of simulation
	this.old = {
		pos: new vector(),
		forceVec: new vector(),
		velocity: new vector()
	}


	//various setters
	this.setRadius = function(radius) {
		this.radius = radius || 1.0;
	}

	this.setMass = function(mass) {
		this.mass = mass || 1.0;
	}

	this.setPos = function(newVec) {
		this.pos = newVec;
	}

	this.setColor = function(newColor) {
		this.color = newColor;
	}

	//update forces acting on particle using behaviours of the particles
	this.updateForceVec = function() {
		//store current force vector in old force vector
		this.old.forceVec = this.forceVec;

		//for each behaviour of the particle
		for (var i = 0; i < this.behaviours.length; i++) {
			
			//apply behaviour to particle
			this.behaviours[i].apply(this);
		}
	}
}
