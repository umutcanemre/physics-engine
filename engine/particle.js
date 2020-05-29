class Particle {
	constructor(mass, radius) {
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
		this.jerk = new vector();
		this.snap = new vector();

		//stores states of properties in previous step of simulation
		this.old = {
			pos: new vector(),
			forceVec: new vector(),
			velocity: new vector(),
			jerk: new vector(),
			snap: new vector()
		}
	}
	
	//update forces acting on particle using behaviours of the particles
	updateForceVec() {
		//for each behaviour of the particle
		for (var i = 0; i < this.behaviours.length; i++) {
			
			//apply behaviour to particle
			this.behaviours[i].apply(this);

		}
	}
}
