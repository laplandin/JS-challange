function List(list) {
	this.position = 0;
	this.length = Array.isArray(list) ? list.length : 0;
	this.storage = Array.isArray(list) ? list : [];
}

List.prototype.append = function(item) {
	this.storage[this.length++] = item;
};

List.prototype.insert = function(item, index) {
	this.storage.splice(index, 0, item);
	this.length++;
};

module.exports = List;
