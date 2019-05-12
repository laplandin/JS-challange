class Stack {
	constructor(initialState) {
		// Better way is to create deep copy
		this.storage = Array.isArray(initialState) ? initialState : [];
		this.top = this.storage.length; // points to last element in stack
	}
	
	push (item) {
		return this.storage[this.top++] = item;
	}
	
	pop() {
		return this.storage[--this.top];
	}
	
	peek() {
		return this.storage[this.top - 1];
	}
	
	get length() {
		return this.top;
	}
}

module.exports = Stack;
