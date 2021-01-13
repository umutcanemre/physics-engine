/*
Demo class

Description:

A class that has a generic structure for a demo of the physics library. For convienience it initializes
an instance of Phyiscs and Webglrend as phys and renderer respectively. It takes a canvas as an argument
which is used to initialize the rednerer. It also declares a generic draw
method which handles the stepping/drawing of the demo, this method does not need to be redefined in dervied
classes unless there is something else you want to do every frame other than draw/step the demo.

Constructor:

cnv -> canvas id on webpage

*/

class Demo {
	constructor(cnv) {
		this.cnvs = document.querySelector("#"+cnv)
	}

	init() {
		this.phys = new Physics();
		this.renderer = new Webglrend(this.cnvs);
		this.renderer.init();
	}

	draw() {
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}


}

//Showcases two particles of equal masses attracted to a central point colliding.
//What is significant is that these particles successfully collide despite not moving at constant
//velocities, they, in fact, are accelerating at a constant rate.
//Demo primarily demonstrates functionality of collision, particularly with accelerating particles.
class CollisionDemo extends Demo {
	constructor(cnv) {
		super(cnv);
	}

	init() {
		super.init()
		//create attraction and collision behaviours
		this.a1 = new Attraction(1, new vector(320,240));
		this.col = new InterParticleCollision();

		//positions to set the two particles in the demo
		let poss = [new vector(50, 240), new vector(590, 240)]

		//masses to set the particles of the demo
		let masses = [1, 1]

		//create two particles
		for (var i = 0; i < 2; i++) {
			//create a temp var to store particle in
			let temp = new Particle(masses[i], 10);

			//generate a random rgba color that the renderer can read
			let color = [0,0,0, 1].toString();

			//set particles color to the rand color
			temp.color = color;

			//set appropriate position to particle
			temp.pos = poss[i]

			//push particle into collision pool
			this.col.pool.push(temp)

			//add the attraction and collision behaviours to particle
			temp.behaviours.push(this.a1)

			//add particles to the physics object
			this.phys.particles.push(temp)


		}

		this.phys.poolBehaviours.push(this.col)
	}
	//draw function to step and render simulation
	draw() {
		
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

//This showcases particles lined up with another particle coming and hitting them
//analagous to a Newton's cradle you are able to see the momentum travel through the series of particles.
//Demo primarily demonstrates how momentum/Kinetic energy is successfully conserved in an entertaining
//special case of inter-particle collisions. Note that there are also boundaries placed to the left and right
//of particles so that the demo may repeat indefinitely.
class CradleDemo extends Demo {
	constructor(cnv) {
		super(cnv);
	}

	init() {
		super.init();

		//initialize collisions
		this.col = new InterParticleCollision()
		
		this.worldBoundCol = new StaticBoundParticleCollision();

		this.phys.poolBehaviours.push(this.col, this.worldBoundCol)

		//create all particles
		for (var i = 0; i < 4; i++) {
			let tempParticle = new Particle(1,10)
			tempParticle.behaviours.push()

			tempParticle.color = [Math.random()*(1-0.5)+0.5,Math.random()*(1-0.5)+0.5,Math.random(),1].toString()

			this.phys.particles.push(tempParticle)

			this.col.pool.push(tempParticle)
			this.worldBoundCol.pool.push(tempParticle)
		}

		this.worldBoundCol.boundPool.push(
			new Boundary([new vector(240,0), new vector(240, 480)]),
			new Boundary([new vector(420, 0), new vector(420, 480)])
		)

		//set appropriate positions/velocities of particles

		this.phys.particles[0].velocity = new vector(3,0)

		this.phys.particles[0].pos = new vector(280, 240);

		this.phys.particles[1].pos = new vector(320, 240);

		this.phys.particles[2].pos = new vector(342, 240);

		this.phys.particles[3].pos = new vector(362, 240);

	}
}

//Showcases particles arranged in a triangle like in billiards, with a single particle
//moving towards them to "break" the billiards. Demo pimarily showcases possibilities
//with a functioning collision behaviour.

class BilliardDemo extends Demo {

	constructor(cnv) {
		super(cnv);
	}

	init() {
		super.init();

		//initialize collision
		this.col = new InterParticleCollision();

		this.phys.poolBehaviours.push(this.col)

		//spawn particles
		for (var i = 0; i < 16; i++) {
			let tempParticle = new Particle(1,10)
			
			tempParticle.behaviours.push()

			tempParticle.color = [Math.random()*(1-0.5)+0.5,Math.random()*(1-0.5)+0.5,Math.random(),1].toString()

			this.phys.particles.push(tempParticle)

			this.col.pool.push(tempParticle)
		}

		//position particle to hit billiards and give it some velocity
		this.phys.particles[0].velocity = new vector(2,5)

		this.phys.particles[0].pos = new vector(230, 0);


		//pool ball configuration
		var particleIndex = 1;

		//position all other particles in billiard pattern
		for (var i = 0; i <= 5; i++) {
			for (var j = 0; j <= 4 - i; j++) {
				this.phys.particles[particleIndex].pos = new vector(330-(20*j)-(10*i), 240-(20*i))
				particleIndex += 1
			}
		}
	}

	draw() {
		let KE = 0
		let p = 0
		for (var i = 0; i < this.phys.particles.length; i++) {
			p = this.phys.particles[i]
			KE += (vector.mag(p.velocity)**2)*0.5*p.mass
		}
		//console.log(KE)

		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

//Demo with attaction and collision, almost identical to AttractionDemo except for different color scheme and particle sizing
class MessyDemo extends Demo {
	constructor(cnv) {
		super(cnv);
	}

	init() {
		super.init();
		console.log("shid")
		//create attraction and collision bheaviours
		this.a1 = new Attraction(0.1, new vector(320,240));
		this.col = new InterParticleCollision();

		for (var i = 0; i < 15; i++) {
			//create random number for particles mass
			let temprand = Math.random()*10;

			//temp variable to store new particle, give random mass and a radius twice that of its mass
			let temp = new Particle(temprand, temprand*2);

			//gen random pos and color
			let randomPosition = new vector(Math.floor(Math.random()*500), Math.floor(Math.random()*450));
			let color = [0,0,0,1].toString();

			//set color and pos of particle
			temp.color = color;
			temp.pos = randomPosition;

			//add particle to collision pool
			this.col.pool.push(temp)

			//add collision and attraction behaviours to particle
			temp.behaviours.push(this.a1)

			//add particle to physics
			this.phys.particles.push(temp)
		}

		this.phys.poolBehaviours.push(this.col)
	}
}

//Boundaries to prevent particles from leaving the canvas space, all particles have some
//random velocity and initial position. No collisions occur between the particles as collisions do
//not conserve kinetic energy in all cases and this causes the whole demo to break
//Demo primarily showcases world boundaries
class ClosedSystemDemo extends Demo {
	constructor(cnv) {
		super(cnv);
	}

	init() {
		super.init();

		this.col = new InterParticleCollision();
		this.worldBoundCol = new StaticBoundParticleCollision(
			[],

			[
				new Boundary([new vector(0,0), new vector(640, 0)]), //world bounds
				new Boundary([new vector(0,0), new vector(0, 480)]),
				new Boundary([new vector(0,480), new vector(640, 480)]),
				new Boundary([new vector(640,480), new vector(640, 0)]),

				new Boundary([new vector(240,0), new vector(240, 220)]),//rectangles on top and bottom middle of screen
				new Boundary([new vector(400,0), new vector(400, 220)]),

				new Boundary([new vector(240,480), new vector(240, 260)]),
				new Boundary([new vector(400,480), new vector(400, 260)]),

				new Boundary([new vector(240,220), new vector(400, 220)]),
				new Boundary([new vector(240,260), new vector(400, 260)]),

				//new Boundary([new vector(120,100), new vector(170, 150)]),
				//new Boundary([new vector(170,150), new vector(120, 200)]),
				//new Boundary([new vector(120,200), new vector(70, 120)]),
				//new Boundary([new vector(70,120), new vector(120, 100)]),
			]
		);

		//spawn 3000 particles, give random position (can't spawn within any boundaries) and velocity
		for (var i = 0; i < 3000; i++) {
			//create random number for particles mass
			let temprand = Math.random()*10;

			let color = [1,0.2,0.4,1].toString();

			let size = Math.random()*(8-4)+4

			let randomPosition = new vector(Math.floor(Math.random() * (220 - 20) + 20), Math.random() * (440 - 20) + 20);

			//if (i > 250) {
			//	size = 9//Math.random()*(6-4)+4
			//	color = [1,0.7,0,1].toString();
			//	randomPosition = new vector(Math.floor(Math.random() * (600 - 420) + 420), Math.random() * (100 - 20) + 20)
			//}

			//temp variable to store new particle, give random mass and a radius twice that of its mass
			let temp = new Particle(size/2, size);


			let randomSignX =  Math.random() < 0.5 ? -1 : 1;
			let randomSignY = Math.random() < 0.5 ? -1 : 1;


			temp.forceVec.add(new vector((Math.random()*5*randomSignX), (Math.random()*5*randomSignY)))
			
			//set color and pos of particle
			temp.color = color;
			temp.pos = randomPosition;

			//add particle to collision pool
			this.col.pool.push(temp)
			this.worldBoundCol.pool.push(temp)

			//add particle to physics
			this.phys.particles.push(temp)
		}

		//this.phys.poolBehaviours.push(col)
		this.phys.poolBehaviours.push(this.worldBoundCol)

		this.color = [1,0.2,0.4,1].toString();
		this.altColor = [1,0.4,0.2,1].toString();
	}

	draw () {
		let KE = 0
		let P = 0
		for (var i = 0; i < this.phys.particles.length; i++) {
			if (this.phys.particles[i].velocity.x > 0) {
				this.phys.particles[i].color = this.altColor
			}

			else {
				this.phys.particles[i].color = this.color
			}

			P = this.phys.particles[i]
			KE += (vector.mag(this.phys.particles[i].velocity)**2)*0.5*this.phys.particles[i].mass
		}
		//console.log(KE)
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

//Central attraction with particles of no initial velocity and random positions all 
//having the attraction behaviour. Particles are also random color/size
//Particles collide with each other.
//Demo Primarily demonstrates inter-particle collision and collective attraction to a central point

class AttractionDemo extends Demo {
	constructor(cnv) {
		super(cnv);
	}

	init() {
		super.init()

		//create attraction behaviour
		this.a1 = new Attraction(0.2, new vector(320,240));
		this.col = new InterParticleCollision();
		//worldBoundCol = new WorldBoundCollision();

		//worldBoundCol.worldBounds = new vector(640, 480);

		//create 20 particles
		for (var i = 0; i < 30; i++) {
			//create random number to use 
			let tempRand = (Math.random()*5+3);

			//create temp variable to store particle, make particle have random mass and radius that is twice that of its mass
			let temp = new Particle(tempRand, tempRand*2);

			//gen a random position for particle
			let randomPosition = new vector(Math.floor(Math.random()*500), Math.floor(Math.random()*450));

			//gen random color for particle
			let color = [Math.random(), Math.random(), Math.random(), 1].toString();

			//set colors and pos of particles
			temp.color = color;
			temp.pos = randomPosition //new vector(100, 100));

			//add attraction behaviour to particle
			temp.behaviours.push(this.a1)
			this.col.pool.push(temp)
			//worldBoundCol.pool.push(temp)

			//add particle to physics object
			this.phys.particles.push(temp)


		}

		this.phys.poolBehaviours.push(this.col)
		//this.phys.poolBehaviours.push(worldBoundCol)
	}
}