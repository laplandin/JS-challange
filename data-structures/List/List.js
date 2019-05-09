class List {
	constructor(list) {
		this.position = -1;
		this.length = Array.isArray(list) ? list.length : 0;
		this.storage = Array.isArray(list) ? list : [];
	}
	/* Edit operations */
	append(item) {
		this.storage[this.length++] = item;
	}
	
	prepend(item) {
		this.storage = [item].concat(this.storage);
	}
	
	insert(item, index) {
		// TODO: maybe do it immutable?
		this.storage.splice(index, 0, item);
		this.length++;
	}
	
	remove(index) {
		this.storage.splice(index, 1);
		this.length--;
	}
	
	clear() {
		this.position = -1;
		this.length = 0;
		this.storage = [];
	}
	
	/* Traverse operations */
	front() {
		if (this._checkIndex(0)) {
			this.position = 0;
		}
		return this.position;
	}
	
	end() {
		if (this.position > -1) {
			this.position = this.length - 1;
		}
		return this.position;
	}
	
	prev() {
		if (this.position - 1 > 0) {
			this.position--;
		}
		return this.position;
	}
	
	next() {
		if (this.position + 1 < this.length) {
			this.position++;
		}
		return this.position;
	}
	
	moveTo(index) {
		if (this._checkIndex(index)) {
			this.position = index;
			return true;
		}
		return false;
	}
	
	/* Info operations */
	currPos() {
		return this.position;
	}
	
	getCurrElement() {
		return this.storage[this.position];
	}
	
	getElement(index) {
		if (this._checkIndex(index)) {
			return this.storage[index];
		}
		return null;
	}
	
	findOne(item) {
		if (this.length === 0) {
			return null;
		}
		let found = null;
		switch (typeof item) {
			case 'string':
				found = this.storage.indexOf(item);
				break;
			case 'number':
				found = this.storage.indexOf(item);
				break;
			case 'object':
				this.storage.some((value, index) => {
					if (this._deepCompare(value, item)) {
						found = index;
						return true;
					}
					return false;
				});
				break;
			default:
				break;
		}
		return found === -1 ? null : found;
	}
	
	find(item) {
		if (this.length === 0) {
			return null;
		}
		switch (typeof item) {
			case 'string':
				return this._indexOfAll(this.storage, item);
			case 'number':
				return this._indexOfAll(this.storage, item);
			case 'object':
				let found = -1;
				this.storage.reduce((acc, value, index) => {
					if (this._deepCompare(value, item)) {
						acc.push(index);
					}
					return acc;
				}, []);
				return found;
			default:
				break;
		}
	}
	
	/* private helpers */
	_checkIndex(index) {
		return index > -1 && index < this.length;
	}
	
	_deepCompare(src, target) {
		if (typeof src !== 'object' || typeof target !== 'object') {
			return src === target;
		}
		return Object.entries(src).every(([key, value]) => {
			if (target.hasOwnProperty(key)) {
				if (typeof target[key] === 'object' && typeof value === 'object') {
					return this._deepCompare(value, target[key]);
				}
				return value === target[key];
			}
			return false;
		});
	}
	
	_indexOfAll(arr, item) {
		const found = [];
		let startIndex = 0;
		let index = arr.indexOf(item, startIndex);
		while (index > -1) {
			found.push(arr[index]);
			startIndex = index + 1;
			index = arr.indexOf(item, startIndex);
		}
		return found;
	}
}

module.exports = List;
