//apply a constant force to given particles
constant_force = function(force) {
	this.force = force || new vector();

	this.apply = function(particle) {
		//add force property to particle
		particle.forceVec.add(force);
	}
}

//

//behaviour.call(constant_force.prototype)

//constant_force.prototype.apply