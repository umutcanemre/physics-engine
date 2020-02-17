var webglrend = {}

webglrend = (function(canvas) {		
	const gl = canvas.getContext("webgl");
	if (gl === null) {
		alert("Oh no");
		return;
	}

	//webgl scripts for vertex and fragment shader respectively
	this.vs_s = "precision mediump float; uniform vec2 u_resolution; attribute vec2 a_position; attribute float a_radius; attribute vec4 a_color; varying vec4 v_color; void main() { vec2 zeroToOne = a_position / u_resolution; vec2 zeroToTwo = zeroToOne * 2.0; vec2 clipSpace = zeroToTwo - 1.0; gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); gl_PointSize = a_radius*2.0; v_color = a_color; }"
	this.fs_s = "precision mediump float; uniform sampler2D u_texture; varying vec4 v_color; void main() {gl_FragColor = texture2D(u_texture, gl_PointCoord)*v_color; vec2 pt = gl_PointCoord - vec2(0.5); if (pt.x*pt.x+pt.y*pt.y > 0.25) {discard;} }"
	
	this.particlePositionBuffer = null;
	this.particleRadiiBuffer = null;
	this.particleColorBuffer = null;
	this.particleShader = null;

	this.init = function() {
		this.initShaders();
		this.initBuffers();
		this.initViewport();

		this.defaultParticleTexture = this.createCircleTex(128);
	},

	this.initShaders = function() {
		//create particle shader as webgl program
		this.particleShader = this.createShaderProgram(this.vs_s, this.fs_s);

		//console.log(this.particleShader);
		
		//attributes and uniforms of particle shader and their locations
		this.particleShader.Attributes = {
			positionAttributeLocation : gl.getAttribLocation(this.particleShader, "a_position"),
			radiusAttributeLocation : gl.getAttribLocation(this.particleShader, "a_radius"),
			colorAttributeLocation : gl.getAttribLocation(this.particleShader, 'a_color'),
			
		}

		this.particleShader.Uniforms = {
			resolutionUniformLocation : gl.getUniformLocation(this.particleShader, 'u_resolution'),
			textureUniformLocation : gl.getUniformLocation(this.particleShader, 'u_texture'),
		}


	},

	this.initBuffers = function() {
		this.particlePositionBuffer = gl.createBuffer();
		this.particleRadiiBuffer = gl.createBuffer();
		gl.useProgram(this.particleShader)
		this.particleColorBuffer = gl.createBuffer();
		//gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	},

	this.initViewport = function() {
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.uniform2f(this.particleShader.Uniforms.resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
	},

	//create default circle texture
	this.createCircleTex = function(diameter) {
		var diameter = diameter || 128
		//create a canvas
		var c = document.createElement("canvas");
		//set width and height of canvas to the size of the texture, get context
		c.width = c.height = diameter;
		ctx = c.getContext("2d");
		
		radius = diameter*0.5;

		//draw a circle to fit perfectly within the canvas
		ctx.beginPath();
		ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
		ctx.closePath();
		//fill circle with white
		ctx.fillStyle = "#FFF";
		ctx.fill();
		
		//create a gl texture
		texture = gl.createTexture();

		//bind texture to TEXTURE_2D
		gl.bindTexture(gl.TEXTURE_2D, texture);

        //create the texture image from the canvas circle data
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);

		
		//set texture parameters
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		gl.generateMipmap(gl.TEXTURE_2D)


		//console.log(gl.getParameter(gl.TEXTURE_BINDING_2D));
		//unbind this texture
		gl.bindTexture(gl.TEXTURE_2D, null);


		return texture
	}


	//Create a webgl program given source of vertex and fragment shaders
	this.createShaderProgram = function(vs_source, fs_source) {
		this.vs = gl.createShader(gl.VERTEX_SHADER);
		this.fs = gl.createShader(gl.FRAGMENT_SHADER);

		gl.shaderSource(this.vs, vs_source);
		gl.shaderSource(this.fs, fs_source);

		//compile vertex shader and check for success
		gl.compileShader(this.vs);

		var success = gl.getShaderParameter(this.vs, gl.COMPILE_STATUS);
		if (!success) {
			console.log(gl.getShaderInfoLog(this.vs));
			gl.deleteShader(this.vs);
			return 1;
		}

		//compile fragment shader and check for success
		gl.compileShader(this.fs);

		var success = gl.getShaderParameter(this.fs, gl.COMPILE_STATUS);
		if (!success) {
			console.log(gl.getShaderInfoLog(this.fs));
			gl.deleteShader(this.fs);
			return 1;
		}

		this.program = gl.createProgram();

		//attach vs and fs to program
		gl.attachShader(this.program, this.vs);
		gl.attachShader(this.program, this.fs);
		
		//link program to gl
		gl.linkProgram(this.program);

		//check for success
		var success = gl.getProgramParameter(this.program, gl.LINK_STATUS);

		if (success) {
			return this.program;
		}

		//delete program otherwise
		console.log(gl.getProgramInfoLog(this.program));
		gl.deleteProgram(this.program);
	},

	this.render = function(particles) {
		//expects to recieve array of particle objects
		positions = [];
		radii = [];
		colors = [];

		//for each particle, push its properties into arrays to be used later by buffers
		for (var i = 0; i < particles.length; i++) {
			positions.push(particles[i].pos.x, particles[i].pos.y)
			radii.push(particles[i].radius)


			//split the colour property of the particle into  R, G, B, A in an array RGBA
			rgba = particles[i].color.split(",");
			//console.log("RGBA: " + rgba)

			//push the array of color for the particle into color array
			for (var j = 0; j < rgba.length; j++) {
				colors.push(rgba[j]);
			}
		}

		//set amount of times to call drawArrays using the length of radii, which represents the amount of particles
		count = radii.length
		//console.log(colors)

		//bind default particle texture
		gl.activeTexture(gl.TEXTURE0)
		gl.bindTexture(gl.TEXTURE_2D, this.defaultParticleTexture)

		//use particleshader
		gl.useProgram(this.particleShader)

		//clear canvas
		gl.clearColor(0.0,0.0,0.0,0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		//bind, enable and tell webgl how to use particle position, radius and color buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, this.particleRadiiBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(radii), gl.STATIC_DRAW);
		gl.vertexAttribPointer(this.particleShader.Attributes.radiusAttributeLocation, 1, gl.FLOAT, false, 0, 0)
		gl.enableVertexAttribArray(this.particleShader.Attributes.radiusAttributeLocation)
			
		gl.bindBuffer(gl.ARRAY_BUFFER, this.particlePositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		gl.vertexAttribPointer(this.particleShader.Attributes.positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
		gl.enableVertexAttribArray(this.particleShader.Attributes.positionAttributeLocation)

		gl.bindBuffer(gl.ARRAY_BUFFER, this.particleColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		gl.vertexAttribPointer(this.particleShader.Attributes.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0)
		gl.enableVertexAttribArray(this.particleShader.Attributes.colorAttributeLocation)

		//draw everything
		gl.drawArrays(gl.POINTS, 0, count);
	}
})
