/*
PoolBehaviour Class

Description:

Meant to be a behaviour that holds a pool of particles and is either a behaviour
that is meant to be applied to many particles or is a behaviour that is dependant
on the positions or other properties of other particles involved. I.e. if all particles
had gravitational attractions to one another this would be an appropriate use of a PoolBehaviour,
or for collisions.

Constructor:

particlePool -> Array of Particle instances, default empty array.

*/

class PoolBehaviour {
	constructor(particlePool) {
		this.pool = particlePool || []
	}

	apply() {
		return;
	}
}