AttractionDemo = function(cnv) {
	//create physics and renderer object, pass canvas to renderer
	this.phys = new Physics();
	this.phys.drag = 1;

	this.renderer;
	const cnvs = document.querySelector("#"+cnv)

	this.renderer = new Webglrend(cnvs);
	this.renderer.init();

	
	//create attraction behaviour
	a1 = new Attraction(0.1, 1000, new vector(320,240));
	col = new InterParticleCollision();
	//worldBoundCol = new WorldBoundCollision();

	//worldBoundCol.worldBounds = new vector(640, 480);

	//create 20 particles
	for (var i = 0; i < 20; i++) {
		//create random number to use 
		tempRand = (Math.random()*5+3);

		//create temp variable to store particle, make particle have random mass and radius that is twice that of its mass
		temp = new Particle(tempRand, tempRand*2);

		//gen a random position for particle
		randomPosition = new vector(Math.floor(Math.random()*500), Math.floor(Math.random()*450));

		//gen random color for particle
		color = [Math.random(), Math.random(), Math.random(), 1].toString();

		//set colors and pos of particles
		temp.color = color;
		temp.pos = randomPosition //new vector(100, 100));

		//add attraction behaviour to particle
		temp.behaviours.push(a1)
		col.pool.push(temp)
		//worldBoundCol.pool.push(temp)

		//add particle to physics object
		this.phys.particles.push(temp)


	}

	this.phys.poolBehaviours.push(col)
	//this.phys.poolBehaviours.push(worldBoundCol)


	//function to step and render simulation
	this.draw = function() {
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

	