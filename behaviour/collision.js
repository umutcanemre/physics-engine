collision = function () {
	this.pool = [];
	this.dist = new vector();

	this.apply = function(p1) {
		for (var i = 0; i < this.pool.length; i++) {
			p2 = this.pool[i];

			if (p1 !== p2) {
				this.dist = vector.subtract(p2.pos, p1.pos).mag();
				
				if (this.dist <= (p1.radius + p2.radius)) {

					//make references to masses and velocities of particles
					m1 = p1.mass;
					m2 = p2.mass;

					//multiply velocities of colliding particles by 60 to get m/s since v by default is m/1/60s
					v1i = p1.velocity.x*60;
					v2i = p2.velocity.x*60;

					//empty variables for the final velocities
					v1f = null;
					v2f = null;

					//calculate theoretical final velocities for each particle
					v2f = ( (2*m1*v1i) - (m1*v2i) + (m2*v2i) ) / (m1 + m2)

					v1f = ( (2*m2*v2i) - (m2*v1i) + (m1*v1i) ) / (m2 + m1)

					//calculate initial momentum for each particle
					P1i = m1*v1i;
					P1f = m1*v1f;

					//calculate theoretical final momentum of particle
					P2i = m2*v2i;
					P2f = m2*v2f;

					/*debug
					console.log("M1: " + m1)
					console.log("M2: " + m2)

					console.log("V1I: " + v1i)
					console.log("V2I: " + v2i)

					console.log("V1F: " + v1f)
					console.log("V2F: " + v2f)

					console.log(P1f - P1i)
					console.log(P2f - P2i)*/

					//add force to x axis of each particle based on calculated force of impulse from collision (Fd*T = dP)
					p1.forceVec.add(new vector((P1f - P1i)*61.75, 0))
					p2.forceVec.add(new vector((P2f - P2i)*61.75, 0))

					//identical calculations for the momentums/velocities for the y axis
					v1i = p1.velocity.y*60;
					v2i = p2.velocity.y*60;

					v2f = ( (2*m1*v1i) - (m1*v2i) + (m2*v2i) ) / (m1 + m2)

					v1f = ( (2*m2*v2i) - (m2*v1i) + (m1*v1i) ) / (m2 + m1)

					P1i = m1*v1i;
					P1f = m1*v1f;

					P2i = m2*v2i;
					P2f = m2*v2f;

					p1.forceVec.add(new vector(0, (P1f - P1i)*61))
					p2.forceVec.add(new vector(0, (P2f - P2i)*61))
							

					/*a = (m2 + (m1*m2*m2))
					b = (-1)*(-2*m1*m1*v1i*m2) - (2*m1*m2*m2*v2i)
					c = ( (m1*m1*m1*v1i*v1i)+((2*m1*m1*v1i*m2*v2i))-(m1*v1i*v1i)-(m2*v2i*v2i) )

					//console.log(b)

					v2f = ((b*-1) - Math.sqrt(b*b - 4*a*c )) / (2*a) 
					
//					console.log("THE V2I IS: " + v2i)
//					console.log("THE NEGATIVE V2F IS: " + v2f)

					v2f = (b*-1 + Math.sqrt(b*b - 4*a*c )) / (2*a)*23 

//					console.log("THE POSITIVE V2F IS: " + v2f)

					P1i = p2.mass*p2.old.velocity.x
					P1f = p2.mass*v2f

					P2i = p1.mass*p1.old.velocity.x
					P2f = (m1*v1i + m2*v2i - (m2*v2f)) / m1

					


					m1 = p2.mass;
					m2 = p1.mass;

					v1i = p2.old.velocity.y;
					v2i = p1.old.velocity.y;

					v1f = null;
					v2f = null;

					a = (m2 + (m1*m2*m2))
					b = -1*(-2*m1*m1*v1i*m2) - (2*m1*m2*m2*v2i)
					c = ( (m1*m1*m1*v1i*v1i)+((2*m1*m1*v1i*m2*v2i))-(m1*v1i*v1i)-(m2*v2i*v2i) )

					//console.log(b)

					v2f = ((b*-1) - Math.sqrt(b*b - 4*a*c )) / (2*a) 
					
//					console.log("THE V2I IS: " + v2i)
//					console.log("THE NEGATIVE V2F IS: " + v2f)

					v2f = (b*-1 + Math.sqrt(b*b - 4*a*c )) / (2*a)*15 

//					console.log("THE POSITIVE V2F IS: " + v2f)

					P1i = p2.mass*p2.old.velocity.y
					P1f = p2.mass*v2f

					P2i = p1.mass*p1.old.velocity.y
					P2f = (m1*v1i + m2*v2i - (m2*v2f)) / m1


					p2.forceVec.add(new vector((P1f - P1i)/(1/60)))
					p1.forceVec.add(new vector((P2f - P2i)/(1/60)))

					*/
				}

			}

			
		}
	}
}