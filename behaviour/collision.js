
/*

InterParticleCollision Class

Description:

A pool behaviour that handles making particles collide with one another. Handles detection
and resolution of inter particle collisions. Checking for collisions is simply done by checking
the distance between a particle and all other particles and seeing if the distance is small enough that
they are colliding. Resolution is handlded through an impulse method, where a force is added to the particles'
forceVec's to make them accelerate away in appropriate directions.

*/

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

					//all the stuff commented out immediately below is related to
					//a collision resolution method where you simply separate the colliding
					//particles by moving them the shortest distance apart until they are not colliding
					//I tried to use this in conjunction with my impulse based collisions to prevent particles
					//from ever becoming "stuck" within each other but because collision needs major revamping
					//I have temporarily disabled this part of collision resolution

					//separate colliding particles
					//let penetrationVector = lineOfImpact.clone()
					
					lineOfImpact.normalize()

					//let separationVector = vector.multiplyScalar(vector.subtract(penetrationVector, vector.multiplyScalar(lineOfImpact, p1.radius + p2.radius)), 0.5)
					
					//p2.pos.subtract(separationVector)
					//p1.pos.add(separationVector)
					
					//console.log(vector.subtract(p2.pos, p1.pos))

					//This commented out step would 
					//make references to masses and velocities of particles
					let v1i = vector.add(p1.velocity, vector.multiplyScalar(p1.forceVec,1/(2*m1)))
					let v2i = vector.add(p2.velocity, vector.multiplyScalar(p2.forceVec,1/(2*m2)))

					//let v1i = p1.velocity
					//let v2i = p2.velocity

					//compute the projections of the velocities of each particle along line of impact
					let v1iDotLineOfImpact = vector.dot(v1i, lineOfImpact)
					let v2iDotLineOfImpact = vector.dot(v2i, lineOfImpact)
					
					let p1VelocityAlongLineOfImpact = new vector()
					let p2VelocityAlongLineOfImpact = new vector()


					if (v1iDotLineOfImpact > 0) {
						 p1VelocityAlongLineOfImpact = vector.multiplyScalar(lineOfImpact, v1iDotLineOfImpact)
					}

					if (v2iDotLineOfImpact < 0){
						 p2VelocityAlongLineOfImpact = vector.multiplyScalar(lineOfImpact, v2iDotLineOfImpact)
					}

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

					let p1Impulse = vector.multiplyScalar(vector.subtract(p1NewVelocityAlongLineOfImpact, p1VelocityAlongLineOfImpact), m1)
					let p2Impulse = vector.multiplyScalar(vector.subtract(p2NewVelocityAlongLineOfImpact, p2VelocityAlongLineOfImpact), m2)

					p1.forceVec.add(p1Impulse)
					p2.forceVec.add(p2Impulse)
				}

				else {
					continue
				}
			}		
		} 
	}
}

//obsolete now that StaticBoundParticleCollision essentially does this but with broader range of application
/*
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
} */



//given input array of numbers return an array with the largest and smallest number of the given array in the form [min, max]
//uses linear search logic
function findMaxAndMinInArray(arr) {
	var max = 0;
	var min = 0;

	if (arr[0] > arr[1]) {
		max = arr[0]
		min = arr[1]
	}

	else {
		max = arr[1]
		min = arr[0]
	}

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i]
		}

		else if (arr[i] < min) {
			min = arr[i]
		}
	}

	return [min, max]
}

/*
StaticBoundParticleCollision class

Description:

Pool behaviour that handles the collision of particles with boundaries that do not move. Uses an application
of the separating axis theorem to check for collisions, every particle is checked to every boundary. Collisions
are resolved through an impulse to the particle along the axis normal to the boundary, the magnitude of this impulse
is such that the velocity that the component of the velocity of the particle along this normal axis is reversed in direction in
the next step of the Physics simulation.

This class can actually quite easily be expanded to fit static polygons or a collision mesh for maps of boundaries, such as for platformer 
games.

Constructor

particlePool -> an array of Particles, staticBoundaryPool -> an array of Boundarys

*/

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

	//Apply the separating axis theorem to determine whether there is a collision occuring with a given particle and a given bound

	static particleIsCollidingWithBound(bound, particle) {
		//there are two axes to check for an overlap between the particle and boundary, an axis parallel to the boundary
		//and an axis normal to the boundary. If the particle is not overlapping on either of these then no collision is occcuring.
		let axes = [bound.vectorFromOrigin, bound.normalAxis]

		for (var i = 0; i < axes.length; i++) {
			let normalizedAxis = vector.normalize(axes[i])

			//Computer projections of the end points of the boundary and the particle on the relevant axis
			let projectionOfParticleOntoAxis = vector.dot(particle.pos, normalizedAxis) 

			let projectionsOfBoundOntoAxis = [vector.dot(bound.endpts[1], normalizedAxis), vector.dot(bound.endpts[0], normalizedAxis)]
			
			//find out the max/min projections of the boundary on the axis (this step is more relevant if this class was expanded to include polygons or map meshes)
			let maxMinProjectionsOfBoundOntoAxis = findMaxAndMinInArray(projectionsOfBoundOntoAxis)

			//Based on the projections of the particle/boundary on the relevant axis determine if the particle is overlapping on that axis
			if (!(
				(projectionOfParticleOntoAxis <= maxMinProjectionsOfBoundOntoAxis[1] + particle.radius) &&
				(projectionOfParticleOntoAxis >= maxMinProjectionsOfBoundOntoAxis[0] - particle.radius)
			)) {

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
				
				//if a collision is occuring with the given particle and given bound
				if (StaticBoundParticleCollision.particleIsCollidingWithBound(bound, p)) {	
					//create a normalized vector to represent the line of impact of the collision
					let lineOfImpact = vector.normalize(bound.normalAxis)


					//create a projection of the particle's velocity on the line of impact
					let pVelocityProjectedOnLineOfImpact = vector.dot(p.velocity, lineOfImpact)// + vector.dot(vector.multiplyScalar(p.forceVec,1/(2*p.mass)), lineOfImpact) 

									
					//create projections of boundary and particle along line of impact
					let projectionOfBoundOntoAxis = vector.dot(bound.endpts[0], lineOfImpact) 
					let projectionOfParticleOntoAxis = vector.dot(p.pos, lineOfImpact)


					//WIP vector that describes the shortest possible distance required to move the given particle
					//away from the boundary to make them not overlapping
					//let separationVector = vector.multiplyScalar(
					//	lineOfImpact, 
					//	(particle.radius - Math.abs(projectionOfParticleOntoAxis-projectionOfBoundOntoAxis))*Math.sign(pVelocityProjectedOnLineOfImpact*-1)
					//)

					//separate particle from boundary	
					//p.pos.add(separationVector)

					//to resolve the collision, add an impulse to the particle with force such that the component 
					//of the particle's velocity along the line of impact becomes opposite in direction but equal in magnitude
					//to its original velocity pre-collision
					p.forceVec.add(vector.multiplyScalar(lineOfImpact, pVelocityProjectedOnLineOfImpact*-2*p.mass))
				}
			}		
		} 
	}
}

