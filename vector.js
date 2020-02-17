//object to store practical and convienient vector operations
vector = function(x, y) {
	//arithmetic vector operations between two vectors
	vector.add = function(v1, v2) {
		return new vector((v1.x + v2.x), (v1.y + v2.y));
	}

	vector.subtract = function(v1, v2) {
		return new vector((v1.x - v2.x), (v1.y - v2.y));
	}

	//"scale" a vector by multiplying by a scalar quantity
	vector.multiplyScalar = function(v, s) {
		return new vector(v.x*s, v.y*s);
	}

	//return absolute value of a vector
	vector.abs = function(v) {
		return new vector(Math.abs(v.x), Math.abs(v.y));
	}

	//return the inverse of a vector
	vector.inv = function(v) {
		return new vector(1/v.x, 1/v.y);
	}

	//return the square of a vector
	vector.sq = function(v) {
		return new vector(v.x*v.x, v.y*v.y)
	}

	this.x = x || 0;
	this.y = y || 0;


	//add a vector to this one (also return result)
	this.add = function(v) { 
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		return this;
	}

	//subtract vector from this one and also return result
	this.subtract = function(v) { 
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	//set this vector's components to 0 and return empty vector
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		return this;
	}

	//copy the contents of given vector v into this one
	this.copy = function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}

	//multiply this vector by a scalar value and also return the result
	this.multiplyScalar = function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	//square this vector and also return result
	this.sq = function() {
		this.x *= this.x;
		this.y *= this.y;
		return this;
	}

	//make this vector equal to its inverse, also return the result
	this.inv = function() {
		this.x = 1/this.x;
		this.y = 1/this.y;
		return this;
	}

	//return the magnitude of this vector using distance formula
	this.mag = function() {
		return Math.sqrt((this.x*this.x)+(this.y*this.y))
	}

	//normalize this vector and also return the result
	this.normalize = function() { 
		m = Math.sqrt(this.x * this.x + this.y * this.y);

		this.x /= m;
		this.y /= m;
		return this;
	}
}

// export {vector};