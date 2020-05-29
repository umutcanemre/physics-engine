//object to store practical and convienient vector operations
class vector {
	//arithmetic vector operations between two vectors
	constructor(x,y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	static add() {
		//return Array.prototype.reduce.call(arguments, function(a,b) { return new vector(a.x+b.x, a.y+b.y);}, new vector());
		
		let result = new vector(0,0)

		for (var i = 0; i < arguments.length; i++) {
			result.x += arguments[i].x
			result.y += arguments[i].y
		}

		return result
	}

	static subtract(v1, v2) {
		return new vector((v1.x - v2.x), (v1.y - v2.y));
	}

	//"scale" a vector by multiplying by a scalar quantity
	static multiplyScalar(v, s) {
		return new vector(v.x*s, v.y*s);
	}

	//return absolute value of a vector
	static abs(v) {
		return new vector(Math.abs(v.x), Math.abs(v.y));
	}

	//return the inverse of a vector
	static inv(v) {
		return new vector(1/v.x, 1/v.y);
	}

	//return the square of a vector
	static sq(v) {
		return new vector(v.x*v.x, v.y*v.y)
	}

	static mag(v) {
		return Math.sqrt((v.x*v.x)+(v.y*v.y))
	}

	static dot(v1, v2) {
		return v1.x*v2.x + v1.y*v2.y
	}

	static normalize(v) {
		let m = vector.mag(v);

		return new vector(v.x/m, v.y/m)
	}

	static normal(v) {
		return new vector(v.y, -v.x)
	}

	//return vector projection of v1 onto v2
	static projection(v1, v2) {
		let dp = vector.dot(v1, v2)
		let v2Normalized = vector.normalize(v2)

		return new vector(dp*v2.x, dp*v2.y)
	}


	//add a vector to this one and also return result
	add(v) {
		for (var i = 0; i < arguments.length; i++) {
			this.x += arguments[i].x
			this.y += arguments[i].y
		}

		return this;
	}

	//subtract vector from this one and also return result
	subtract(v) { 
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	//set this vector's components to 0 and return empty vector
	clear() {
		this.x = 0;
		this.y = 0;
		return this;
	}

	//copy the contents of given vector v into this one
	clone() {
		return this;
	}

	//multiply this vector by a scalar value and also return the result
	multiplyScalar(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	//square this vector and also return result
	sq() {
		this.x *= this.x;
		this.y *= this.y;
		return this;
	}

	//make this vector equal to its inverse, also return the result
	inv() {
		this.x = 1/this.x;
		this.y = 1/this.y;
		return this;
	}

	//normalize this vector and also return the result
	normalize() { 
		let m = Math.sqrt(this.x * this.x + this.y * this.y);

		this.x /= m;
		this.y /= m;
		return this;
	}

}

// export {vector};