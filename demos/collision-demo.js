class CollisionDemo extends Demo {
	constructor(cnv) {
		super(cnv);
	}

	init() {
		super.init()
		//create attraction and collision behaviours
		let a1 = new Attraction(1, 1000, new vector(320,240));
		let col = new InterParticleCollision();

		//positions to set the two particles in the demo
		let poss = [new vector(50, 240), new vector(590, 240)]

		//masses to set the particles of the demo
		let masses = [1, 1]

		//create two particles
		for (var i = 0; i < 2; i++) {
			//create a temp var to store particle in
			temp = new Particle(masses[i], 10);

			//generate a random rgba color that the renderer can read
			color = [0,0,0, 1].toString();

			//set particles color to the rand color
			temp.color = color;

			//set appropriate position to particle
			temp.pos = poss[i]

			//push particle into collision pool
			col.pool.push(temp)

			//add the attraction and collision behaviours to particle
			temp.behaviours.push(a1)

			//add particles to the physics object
			this.phys.particles.push(temp)


		}

		this.phys.poolBehaviours.push(col)
	}
	//draw function to step and render simulation
	draw() {
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

class BilliardDemo extends Demo {

	constructor(cnv) {
		super(cnv);
	}

	init() {
		super.init();

		this.col = new InterParticleCollision();

		this.phys.poolBehaviours.push(this.col)

		for (var i = 0; i < 16; i++) {
			let tempParticle = new Particle(1,10)
			
			tempParticle.behaviours.push()

			tempParticle.color = [Math.random()*(1-0.5)+0.5,Math.random()*(1-0.5)+0.5,Math.random(),1].toString()

			this.phys.particles.push(tempParticle)

			this.col.pool.push(tempParticle)
		}


		this.phys.particles[0].velocity = new vector(Math.random()*3,5)

		this.phys.particles[0].pos = new vector(Math.random()*240+100, 0);


		//pool ball configuration
		var particleIndex = 1;

		for (var i = 0; i <= 5; i++) {
			for (var j = 0; j <= 4 - i; j++) {
				this.phys.particles[particleIndex].pos = new vector(330-(20*j)-(10*i), 240-(20*i))
				particleIndex += 1
			}
		}


	}
}
