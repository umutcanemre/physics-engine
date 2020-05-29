class InterParticleCollision extends PoolBehaviour {
	constructor(particlePool) {
		super(particlePool);
	}

	apply() {
		for (var i = 0; i < this.pool.length; i++) {
			let p1 = this.pool[i];

			for (var j = i+1; j < this.pool.length; j++) {
				let p2 = this.pool[j];

				//Its not strictly the line of impact, but it represents the line between the centers of the two particles
				var lineOfImpact = vector.subtract(p2.pos, p1.pos);
				
				if (vector.mag(lineOfImpact) <= (p1.radius + p2.radius)) {
					let m1 = p1.mass, m2 = p2.mass
					
					lineOfImpact.normalize()
					
					//make references to masses and velocities of particles

					

					let v1i = vector.add(p1.velocity, vector.multiplyScalar(p1.forceVec,1/(2*m1)))
					let v2i = vector.add(p2.velocity, vector.multiplyScalar(p2.forceVec,1/(2*m2)))

					//compute dot products of initial velocities and line of impact
					//these will be used later to determine if either particle is actually moving
					//towards the other particle during the collision, and if so, the component of
					//the velocity that is toward the other particle
					let v1iDotLineOfImpact = vector.dot(v1i, lineOfImpact)
					let v2iDotLineOfImpact = vector.dot(v2i, lineOfImpact)

					//set the component of the velocity that is moving towards the other particle to zero by defualt
					let p1VelocityAlongLineOfImpact = new vector(0,0)
					let p2VelocityAlongLineOfImpact = new vector(0,0)

					//if the velocity of a particle has a component towards the other particle, compute the exact vector
					//that represents the projection of its velocity along the line of impact
					if (v1iDotLineOfImpact > 0) {
						p1VelocityAlongLineOfImpact = new vector(v1iDotLineOfImpact*lineOfImpact.x, v1iDotLineOfImpact*lineOfImpact.y)
					}

					if (v2iDotLineOfImpact < 0) {
						p2VelocityAlongLineOfImpact = new vector(v2iDotLineOfImpact*lineOfImpact.x, v2iDotLineOfImpact*lineOfImpact.y)
					}

					

					//todo fix spacing


					let p1NewVelocityAlongLineOfImpact = vector.multiplyScalar(
						vector.add(
							vector.multiplyScalar(p2VelocityAlongLineOfImpact, 2*m2),
							vector.multiplyScalar(p1VelocityAlongLineOfImpact, m2*(-1)),
							vector.multiplyScalar(p1VelocityAlongLineOfImpact, m1)
						), 
						1/(m1+m2)
					)

					let p2NewVelocityAlongLineOfImpact = vector.multiplyScalar(
						vector.add(
							vector.multiplyScalar(p1VelocityAlongLineOfImpact, 2*m1),
							vector.multiplyScalar(p2VelocityAlongLineOfImpact, m1*(-1)),
							vector.multiplyScalar(p2VelocityAlongLineOfImpact, m2)), 
						1/(m1+m2))

					p1.forceVec.add(vector.multiplyScalar(vector.subtract(p1NewVelocityAlongLineOfImpact, p1VelocityAlongLineOfImpact), m1))
					p2.forceVec.add(vector.multiplyScalar(vector.subtract(p2NewVelocityAlongLineOfImpact, p2VelocityAlongLineOfImpact), m2))
				}
			}		
		} 
	}
}

class WorldBoundCollision extends PoolBehaviour { 
	constructor(particlePool, worldBounds) {
		super(particlePool);
		this.worldBounds = worldBounds || new vector();
	}

	//best collisions ever
	apply() {
		for (var i = 0; i < this.pool.length; i++) {
			var p = this.pool[i]



			if (p.pos.y <= p.radius) {
				p.velocity.y = Math.abs(p.velocity.y)
			}

			else if (p.pos.y >= this.worldBounds.y-p.radius) {
				p.velocity.y = Math.abs(p.velocity.y)*(-1)

			}

			if (p.pos.x <= p.radius) {
				p.velocity.x = Math.abs(p.velocity.x)
			}

			else if (p.pos.x >= this.worldBounds.x-p.radius) {
				p.velocity.x = Math.abs(p.velocity.x)*(-1)

			}
		}
	}
}

//todo make it work

class StaticBoundParticleCollision extends PoolBehaviour {
	constructor(particlePool, staticBoundaryPool) {
		super(particlePool);
		//bounds are each stored as an array of two vectors
		this.boundPool = staticBoundaryPool || []
	}

	static findRightHandedNormal(bound) {
		let boundVectorFromOrigin = vector.subtract(bound[1], bound[0])
		return new vector(boundVectorFromOrigin.y, -boundVectorFromOrigin.x)
	}

	static particleIsCollidingWithBound(bound, particle) {
		let axes = [StaticBoundParticleCollision.findRightHandedNormal(bound), vector.subtract(bound[1], bound[0])]

		//console.log(axes)

		for (var i = 0; i < axes.length; i++) {
			let normalizedAxis = vector.normalize(axes[i])
			let projectionOfCircleOntoAxis = vector.dot(particle.pos, normalizedAxis) //vector.projection(particle.pos, axes[i])

			


			let projectionsOfBoundOntoAxis = [vector.dot(bound[0], normalizedAxis), vector.dot(bound[1], normalizedAxis)] //[vector.projection(bound[0], axes[i]), vector.projection(bound[1], axes[i])]

			//console.log(String(Math.abs(projectionOfCircleOntoAxis - projectionsOfBoundOntoAxis[0]) > particle.radius) + " " + String(Math.abs(projectionOfCircleOntoAxis - projectionsOfBoundOntoAxis[1]) > particle.radius))
			//console.log(projectionOfCircleOntoAxis)

			if (
				(Math.abs(projectionOfCircleOntoAxis - projectionsOfBoundOntoAxis[0]) > particle.radius) && 
				(Math.abs(projectionOfCircleOntoAxis - projectionsOfBoundOntoAxis[1]) > particle.radius) 
			) {

				return false;

			}
		}

		return true;
	}

	apply() {
		for (var i = 0; i < this.pool.length; i++) {
			let p = this.pool[i];

			for (var j = 0; j < this.boundPool.length; j++) {
				let bound = this.boundPool[j];
				
				//detect collision
				if (StaticBoundParticleCollision.particleIsCollidingWithBound(bound, p)) {
					console.log("collision")
					//handle collision
				}
			}		
		} 
	}
}

