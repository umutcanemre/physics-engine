//apply a positive/negative force to particles based on their position relative to the "attraction"
class Attraction {

	constructor(strength, radius, pos) {
		this.strength = strength || null;
		this.pos = pos || new vector();
		this.r = 1000 || radius;
		//set radiusSq to avoid needlessly computing the radius squared
		this.rSq = this.r * this.r
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

		//multiply distance vector by 1 - the squared magnitude of distance vector over the radius squared
		distVec.multiplyScalar(1.0 - ((vector.mag(distVec)*vector.mag(distVec)/(this.rSq))))

		//scale the resulting distance vector by strength and add this to the particles force vector
		particle.forceVec.add(distVec.multiplyScalar(this.strength));

		/* Old attraction
		distVec = vector.subtract(this.pos, particle.pos);

		theta = Math.atan(distVec.y/distVec.x)

		nforce = this.strength/(distVec.mag()*distVec.mag())

		forceVec = new vector(nforce*Math.cos(theta)*Math.sign(distVec.x), nforce*Math.sin(theta)*Math.sign(distVec.y) )

		particle.forceVec.add(forceVec);



		*/

	}
}