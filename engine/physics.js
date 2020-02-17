physics = function(particles) {
	//store particles
	this.particles = particles || [];
	//constant time step of the engine
	this.timeStep = 1/60;
	//stores total elapsed time
	this.elapsed = 0;
	//coefficient to dampen velocities of all particles by
	this.drag = 0.995

	this.step = function() {
		for (i = 0; i < this.particles.length; i++) {
			//create reference to current particle in array
			particle = this.particles[i]

			//update forces currently acting on particle
			particle.updateForceVec();

			//copy current particle position into old pos
			particle.old.pos.copy(particle.pos);		

			//copy current velocity into old velocity
			particle.old.velocity.copy(particle.velocity);
			
			//translate forces acting on the particle into displacement of the particle and add to its position for the timestep
			particle.pos.add(vector.add(particle.velocity, vector.multiplyScalar(particle.forceVec, (1/particle.mass)*this.timeStep*this.timeStep)))

			//calculate particles new velocity by subtracting new position from old
			particle.velocity = vector.subtract(particle.pos, particle.old.pos).multiplyScalar(this.drag)

			//console.log(particle.forceVec.x)

			//reset forces acting on particle
			particle.forceVec.clear();

			//add to total elapsed time
			this.elapsed += 1/60
		}


	}

}