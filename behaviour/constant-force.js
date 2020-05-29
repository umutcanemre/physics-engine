//apply a constant force to given particles
/*class ConstantForce extends Behaviour {
	constructor()
}*/

ConstantForce = function(force) {
	this.force = force || new vector();

	this.apply = function(particle) {
		//add force property to particle
		particle.forceVec.add(this.force);
		
		//return force
	}
}

//

//behaviour.call(constant_force.prototype)

//constant_force.prototype.apply