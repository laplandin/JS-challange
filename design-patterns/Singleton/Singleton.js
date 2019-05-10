const ClassLessSingletonLiteral = {
	get instance() {
		if (!this._instance) {
			this._init();
		}
		return this._instance;
	},
	_init() {
		this._instance = {
			prop: 'prop',
			method() {
				return this.prop;
			},
			staticMethod() {
				return 42;
			},
		}
	},
};


class ExportedSingletonInstance {
	constructor() {
		this.prop = 'prop';
	}
	
	static staticMethod() {
		return 42;
	}
	
	method() {
		return this.prop;
	}
}

class ClassPropSingleton {
	constructor() {
		if (ClassPropSingleton.instance && typeof ClassPropSingleton.instance === 'object') {
			return ClassPropSingleton.instance;
		}
		this.prop = 'prop';
		ClassPropSingleton.instance = this;
	}
	
	static staticMethod() {
		return 42;
	}
	
	method() {
		return this.prop;
	}
}


module.exports = {
	ExportedSingletonInstance: new ExportedSingletonInstance(),
	ClassLessSingletonLiteral,
	ClassPropSingleton,
};
