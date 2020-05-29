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