/* 

Physics class

Description:

Main body of the engine. Stores array of all particles, poolBehaviours and stores elapsed time. Handles
integrating forces acting on particle's and their velocities to update their positions, and applying all
appropriate behaviours to appropriate particles to update the forces acting on them at each step.

Integration is done through a velocity verlet method, up to the second direvative of position. This may be done
to arbitratily many direvatives of position which gives slightly greater accuracy but increases computation time.
Integrating up to the acceleration with the velocity verlet method is reasonably accurate for the purposes of this 
engine. The main idea is the integrate the acceleration at an instant into velocity and add it to the particles velocity.
Then integrate the particle's new velocity and acceleration into positional change and add it to the position. The verlet
method just comes from a Taylor series expansion of position and its time direvatives about the current step to predict the
following step.

Constructor:

particles -> an array of instances of Particle class, default value is an empty array

*/

Physics = function(particles) {
	//store particles
	this.particles = particles || [];
	//constant time step of the engine
	this.timeStep = 1/60;
	//stores total elapsed time
	this.elapsed = 0;
	//coefficient to dampen velocities of all particles by
	this.drag = 1//0.995

	this.poolBehaviours = []

	this.step = function() {
		for (var i = 0; i < this.particles.length; i++) {
			//create reference to current particle in array
			particle = this.particles[i]

			//copy current particle position into old pos
			particle.old.pos = particle.pos.clone();		

			//copy current velocity into old velocity
			particle.old.velocity = particle.velocity.clone();

			particle.old.forceVec = particle.forceVec.clone();

			//particle.old.jerk.copy(particle.jerk);

			//particle.old.snap.copy(particle.snap)

			//update forces currently acting on particle
			particle.updateForceVec();
		}

		//Compute all 
		for (var i = 0; i < this.poolBehaviours.length; i++) {
			this.poolBehaviours[i].apply()
		}

		for (var i = 0; i < this.particles.length; i++) {
			//create reference to current particle in array
			particle = this.particles[i]

			//particle.jerk = vector.subtract(particle.forceVec, particle.old.forceVec).multiplyScalar(1/particle.mass)
			
			particle.velocity.add(particle.forceVec.multiplyScalar(1/particle.mass))

			//translate forces acting on the particle into displacement of the particle and add to its position for the timestep
			particle.pos.add(vector.add(particle.velocity, vector.multiplyScalar(particle.forceVec, (1/(2*particle.mass)))))//, particle.jerk.multiplyScalar(1/6)))

			particle.acceleration = vector.subtract(particle.velocity, particle.old.velocity)

			particle.velocity.multiplyScalar(this.drag)
			
			//console.log(this.particles[0].forceVec.x)

			//particle.snap = vector.subtract(particle.jerk, particle.old.jerk)


			//add to total elapsed time
			this.elapsed += 1/60
		}

		for (var i = 0; i < this.particles.length; i++) {
			particle = this.particles[i]
			//reset forces acting on particle
			particle.forceVec.clear();
		}


	}

}