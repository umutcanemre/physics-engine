attraction_demo = function(cnv) {
	//create physics and renderer object, pass canvas to renderer
	this.phys = new physics();
	this.phys.drag = 1;

	this.renderer;
	const cnvs = document.querySelector("#"+cnv)

	this.renderer = new webglrend(cnvs);
	this.renderer.init();

	
	//create attraction behaviour
	a1 = new attraction(2000, 1000, new vector(320,240));

	//create 20 particles
	for (var i = 0; i < 20; i++) {
		//create random number to use 
		tempRand = (Math.random()*5+3);

		//create temp variable to store particle, make particle have random mass and radius that is twice that of its mass
		temp = new particle(tempRand, tempRand*2);

		//gen a random position for particle
		randomPosition = new vector(Math.floor(Math.random()*500), Math.floor(Math.random()*450));

		//gen random color for particle
		color = [Math.random(), Math.random(), Math.random(), 1].toString();

		//set colors and pos of particles
		temp.setColor(color);
		temp.setPos(randomPosition) //new vector(100, 100));

		//add attraction behaviour to particle
		temp.behaviours.push(a1)

		//add particle to physics object
		this.phys.particles.push(temp)


	}

	//function to step and render simulation
	this.draw = function() {
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

	