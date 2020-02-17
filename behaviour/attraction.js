//apply a positive/negative force to particles based on their position relative to the "attraction"
attraction = function (strength, radius, pos) {
	this.strength = strength || null;
	this.pos = pos || new vector();
	this.radius = 1000 || radius;


	//store "radiusSq" as to avoid squaring the radius needlessly for every apply call
	this.radiusSq = this.radius * this.radius

	this.setPos = function(newVec) {
		this.pos = newVec;
	}

	this.setStrength = function(strength) {
		this.strength = strength;
	}

	this.setRadius = function(radius) {
		this.radius = radius;
		this.radiusSq = radius*radius;
	}

	this.apply = function(particle) {		
		//calculate distance between attraction and particle
		distVec = vector.subtract(this.pos, particle.pos);

		//normalize distance vector
		distVec.normalize()

		//multiply distance vector by 1 - the squared magnitude of distance vector over the radius squared
		distVec.multiplyScalar(1.0 - ((distVec.mag()*distVec.mag())/(this.radiusSq)))

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