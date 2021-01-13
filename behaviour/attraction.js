//apply a positive/negative force to particles based on their position relative to the "attraction." Essentially, imagine
//each particle has a force vector pointing towards the attraction at all times with the same magnitude regardless of position.
//This is a Behaviour, which means that particles must individually have an instance of this class added to their
//behaviours array for the particles to obey the attraction.

/*

Constructor:

strength -> number to represent how strong the attraction will be, pos -> vector with coordinates of position of vector

*/
class Attraction extends Behaviour{

	constructor(strength, pos) {
		super();
		this.strength = strength || null;
		this.pos = pos || new vector();
		//this.r = 1000 || radius;
		//set radiusSq to avoid needlessly computing the radius squared
		//this.rSq = this.r * this.r
	}

	set radius(r) {
		this.r = r
		this.rSq = r*r
	}

	apply(particle) {		
		//calculate distance between attraction and particle
		let distVec = vector.subtract(this.pos, particle.pos);

		//normalize distance vector
		distVec.normalize()

		//scale the resulting distance vector by strength and add this to the particles force vector
		distVec.multiplyScalar(this.strength)

		particle.forceVec.add(distVec);
	}
}