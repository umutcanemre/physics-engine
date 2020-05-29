class Boundary {
	constructor(endpts) {
		this.endpts = endpts || [new vector(), new vector()];
		//a vector to represent an axis that is normal to the line segment between the endpoints of the boundary
		this._rightHandNormalAxis = Boundary.determineNormalAxis(this.endpts);
	}

	static determineNormalAxis(endpts) {
		return vector.normal(vector.subtract(endpts[1], endpts[0]));
	}

	set endpoints(l) {
		this.endpts = l;
		this.normalAxis = Boundary.determineNormalAxis(this.endpts);
	}

	get endpoints() {
		return this.endpts;
	}

	get normalAxis() {
		return this._rightHandNormalAxis;
	}

}