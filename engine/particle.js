/*
Particle class

Description:

A circular "particle" with a mass, radius, color, position, velocity, forceVec, and behaviours (a vector of the forces acting
on the particle at a given step). All motion related quantities are stored up to one previous step which is
used when integrating the particle's position. There is an updateForceVec function which applies any Behaviours this
particle has to it.

Constructor:

mass -> number, radius -> number

Other properties:

pos, velocity, forceVec -> vector

behaviours -> array of Behaviour instances

old.pos, old.velocity, old.forceVec are NOT meant to be modified outside of the
Physics class itself.

*/

class Particle {
	constructor(mass, radius) {
		//constant properties of particle
		this.mass = mass || 1.0;
		this.radius = radius || 1.0;

		//stores all things that could apply a force to particles
		this.behaviours = [];

		this.color = null;

		//properties of particle
		this.pos = new vector();
		this.forceVec = new vector();
		this.velocity = new vector();
		//this.jerk = new vector();
		//this.snap = new vector();

		//stores states of properties in previous step of simulation
		this.old = {
			pos: new vector(),
			forceVec: new vector(),
			velocity: new vector(),
			//jerk: new vector(),
			//snap: new vector()
		}
	}
	
	//update forces acting on particle using behaviours of the particles
	updateForceVec() {
		//for each behaviour of the particle
		for (var i = 0; i < this.behaviours.length; i++) {
			
			//apply behaviour to particle
			this.behaviours[i].apply(this);

		}
	}
}
