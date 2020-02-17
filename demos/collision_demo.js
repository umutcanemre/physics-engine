collision_demo = function(cnv) {
	
	//create physics and renderer object, pass canvas to renderer
	this.phys = new physics();
	this.renderer;
		const cnvs = document.querySelector("#"+cnv)

	this.renderer = new webglrend(cnvs);
	this.renderer.init();

	//create attraction and collision behaviours
	a1 = new attraction(100, 1000, new vector(320,240));
	col = new collision();

	//positions to set the two particles in the demo
	poss = [new vector(50, 240), new vector(590, 240)]

	//masses to set the particles of the demo
	masses = [1, 1.4]

	//create two particles
	for (var i = 0; i < 2; i++) {
		//create a temp var to store particle in
		temp = new particle(masses[i], 10);

		//generate a random rgba color that the renderer can read
		color = [0,0,0, 1].toString();

		//set particles color to the rand color
		temp.setColor(color);

		//set appropriate position to particle
		temp.setPos(poss[i])

		//push particle into collision pool
		col.pool.push(temp)

		//add the attraction and collision behaviours to particle
		temp.behaviours.push(a1, col)

		//add particles to the physics object
		this.phys.particles.push(temp)


	}

	//draw function to step and render simulation
	this.draw = function() {
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

	