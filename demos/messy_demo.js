messy_demo = function(cnv) {
	//create physics and renderer object, pass canvas to renderer
	this.phys = new physics();

	this.phys.drag = 0.995

	this.renderer;
	const cnvs = document.querySelector("#"+cnv)

	this.renderer = new webglrend(cnvs);
	this.renderer.init();

	//create attraction and collision bheaviours
	a1 = new attraction(100, 1000, new vector(320,240));
	col = new collision();

	for (var i = 0; i < 15; i++) {
		//create random number for particles mass
		temprand = Math.random()*10;

		//temp variable to store new particle, give random mass and a radius twice that of its mass
		temp = new particle(temprand, temprand*2);

		//gen random pos and color
		randomPosition = new vector(Math.floor(Math.random()*500), Math.floor(Math.random()*450));
		color = [0,0,0,1].toString();

		//set color and pos of particle
		temp.setColor(color);
		temp.setPos(randomPosition) 

		//add particle to collision pool
		col.pool.push(temp)

		//add collision and attraction behaviours to particle
		temp.behaviours.push(a1, col)

		//add particle to physics
		this.phys.particles.push(temp)
	}

	//function to step and render simulation
	this.draw = function() {
		this.phys.step()
		this.renderer.render(this.phys.particles)
	}
}

	