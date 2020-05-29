MessyDemo = function(cnv) {
	//create physics and renderer object, pass canvas to renderer
	this.phys = new Physics();

	this.phys.drag = 0.85

	const cnvs = document.querySelector("#"+cnv)

	this.renderer = new Webglrend(cnvs);
	this.renderer.init();

	//create attraction and collision bheaviours
	a1 = new Attraction(0.1, 1000, new vector(320,240));
	col = new InterParticleCollision();

	for (var i = 0; i < 15; i++) {
		//create random number for particles mass
		temprand = Math.random()*10;

		//temp variable to store new particle, give random mass and a radius twice that of its mass
		temp = new Particle(temprand, temprand*2);

		//gen random pos and color
		randomPosition = new vector(Math.floor(Math.random()*500), Math.floor(Math.random()*450));
		color = [0,0,0,1].toString();

		//set color and pos of particle
		temp.color = color;
		temp.pos = randomPosition;

		//add particle to collision pool
		col.pool.push(temp)

		//add collision and attraction behaviours to particle
		temp.behaviours.push(a1)

		//add particle to physics
		this.phys.particles.push(temp)
	}

	this.phys.poolBehaviours.push(col)

	//function to step and render simulation
	this.draw = function() {
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

ClosedSystemDemo = function(cnv) {
	//create physics and renderer object, pass canvas to renderer
	this.phys = new Physics();

	const cnvs = document.querySelector("#"+cnv)

	this.renderer = new Webglrend(cnvs);
	this.renderer.init();

	//create attraction and collision bheaviours

	col = new InterParticleCollision();
	worldBoundCol = new WorldBoundCollision([], new vector(640, 480))

	for (var i = 0; i < 15; i++) {
		//create random number for particles mass
		temprand = Math.random()*10;

		//temp variable to store new particle, give random mass and a radius twice that of its mass
		temp = new Particle(1, 10);

		temp.velocity = new vector((Math.random()+1)*2, (Math.random()+1)*2)

		//gen random pos and color
		randomPosition = new vector(Math.floor(Math.random()*500), Math.floor(Math.random()*450));
		color = [0,0,0,1].toString();

		//set color and pos of particle
		temp.color = color;
		temp.pos = randomPosition;

		//add particle to collision pool
		col.pool.push(temp)
		worldBoundCol.pool.push(temp)

		//add particle to physics
		this.phys.particles.push(temp)
	}

	//this.phys.poolBehaviours.push(col)
	this.phys.poolBehaviours.push(worldBoundCol)

	//function to step and render simulation
	this.draw = function() {
		//KE = 0
		//for (var i = 0; i < this.phys.particles.length; i++) {
		//	p = this.phys.particles[i]
		//	KE += (vector.mag(p.velocity)**2)*0.5*p.mass
		//}
		//console.log(KE)
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}
