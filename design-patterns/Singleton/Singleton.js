/* Simple object can be Singleton, because we work with single instance of it.
*  We can define instance on demand, but in this realization
*  we can't to pass new params every time we want to re-instantiate it.
*  Instead we mutate the instance in place,
*  or we can write some method, which can do it for us
*  */
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

/* Similar approach, which make new instance like a module before export
*  it to the outer world.
*  We can't call it after through "new" keyword.
*  Also the same disadvantages, as: if constructor start before export,
*  we can't change it state after.
* */
class ExportedSingletonInstance {
	constructor(prop) {
		this.prop = prop;
	}
	
	static staticMethod() {
		return 42;
	}
	
	method() {
		return this.prop;
	}
}

class ClassPropSingleton {
	constructor(prop) {
		if (ClassPropSingleton.instance && typeof ClassPropSingleton.instance === 'object') {
			ClassPropSingleton._applyParams(prop);
			return ClassPropSingleton.instance;
		}
		this.prop = prop;
		ClassPropSingleton.instance = this;
	}
	
	static staticMethod() {
		return 42;
	}
	
	method() {
		return this.prop;
	}
	
	static _applyParams(prop) {
		ClassPropSingleton.instance.prop = prop;
	}
}

const IIFESingleton = {
	get instance() {
		return this.getInstance();
	},
	getInstance: (function(){
		let instance;
		return function() {
			if (!instance) {
				instance = {
					prop: 'test1',
					method() {
						return this.prop;
					}
				}
			}
			return instance;
		}
	}())
};


module.exports = {
	ExportedSingletonInstance: new ExportedSingletonInstance(),
	ClassLessSingletonLiteral,
	ClassPropSingleton,
	IIFESingleton,
};
