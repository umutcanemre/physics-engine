/*
Behaviour class

Description:

Although not fully finished, a Behaviour is something that modifies the forceVec of 
select particles. For it to work, the Behaviour is added to a particle's Behaviours array, and the
instance of the Physics class will have a loop to apply all Behaviours particle's have for each particle.


*/

class Behaviour {

	constructor() {
		return;
	}

	//represents magnitude of force behaviour exerts on a given particle, would be calculated upon calling apply function
	//this.magnitude = new vector();

	apply(particle) {
		
		return;
		//particle.forces = vector.add(this.magnitude, particle.forces)
	}
}