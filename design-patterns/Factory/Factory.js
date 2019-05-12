class Factory {
	constructor(props) {
		if (!props) props = {};
		this.size = props.size || 0;
		this.fill = props.fill || 'none';
	}
	create(type) {
		switch(type) {
			case 'circle': return new Circle({ radius: this.size/2, fill: this.fill });
			case 'square': return new Square({ side: this.size, fill: this.fill });
			default: throw new Error('Unexpected input');
		}
	}
}

class Circle {
	constructor(props) {
		this.radius = props.radius;
		this.fill = props.fill;
	}
	
	getInfo() {
		return { fill: this.fill, radius: this.radius };
	}
}

class Square {
	constructor(props) {
		this.side = props.side;
		this.fill = props.fill;
	}
	
	getInfo() {
		return { fill: this.fill, side: this.side };
	}
}

module.exports = Factory;
