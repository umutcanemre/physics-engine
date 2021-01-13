/*

Boundary class

Description:

Compositional relationship with the vector class, represents a line in the canvas,
usually one that particles cannot pass. This stores the end points of such a line as two
vectors and has some useful static and instance methods. Since particles are often meant
to collide with boundaries, there are built in properties like rightHandNormalAxis and vectorFromOrigin
which are very useful for making the code that detects/resolves collisions readable. These properties are
meant to be private as they are dependant on endpoint, hence the use of a setters/getters for properties of this class, so that
these properties are updated when the endpoints change. Also these properties are quite useful in reducing the number
of computations that occur, as the axis normal to the boundary is stored in memory rather than computed each time there
is a check for collisions.

Constructor:

endpts -> array of two vectors

*/


class Boundary {
	constructor(endpts) {
		this.endpts = endpts || [new vector(), new vector()];
		//a vector to represent an axis that is normal to the line segment between the endpoints of the boundary
		this._rightHandNormalAxis = Boundary.determineNormalAxis(this.endpts);
		this._vectorFromOrigin = Boundary.determineVectorFromOrigin(this.endpts);
	}

	static determineNormalAxis(endpts) {
		return vector.normal(vector.subtract(endpts[1], endpts[0]));
	}

	//Return boundary as a vector pointing in the same direction with equal magnitude centered at origin
	static determineVectorFromOrigin(endpts) {
		return vector.subtract(endpts[1], endpts[0])
	}

	set endpoints(l) {
		this.endpts = l;
		this._rightHandNormalAxis = Boundary.determineNormalAxis(this.endpts);
		this._vectorFromOrigin = Boundary.determineVectorFromOrigin(this.endpts);
	}

	get endpoints() {
		return this.endpts;
	}

	get vectorFromOrigin() {
		return this._vectorFromOrigin;
	}

	get normalAxis() {
		return this._rightHandNormalAxis;
	}

	

}