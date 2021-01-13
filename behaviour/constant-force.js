//apply a constant force to given particles, extends behaviour

/*

Constructor:

force -> number for how strong the force is

*/

class ConstantForce extends Behaviour {
	
	constructor(force) {
		super();
		this.force = force || new vector();
	}

	apply() {
		//add force property to particle
		particle.forceVec.add(this.force);
	}
}