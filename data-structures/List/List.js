class List {
	constructor(list) {
		this.position = 0;
		this.length = Array.isArray(list) ? list.length : 0;
		this.storage = Array.isArray(list) ? list : [];
	}
	
	append(item) {
		this.storage[this.length++] = item;
	}
	
	insert(item, index) {
		this.storage.splice(index, 0, item);
		this.length++;
	}
}

module.exports = List;