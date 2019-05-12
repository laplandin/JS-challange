const Stack = require('./Stack');
const generateItems = require('../libs/generateArray');

describe('Test Suite for Stack', () => {
	test('creates new stack from initial data', () => {
		const length = 5;
		const initialState = generateItems(length);
		const stack = new Stack(initialState);
		expect(stack.storage).toBe(initialState);
		expect(stack.top).toBe(length);
	});
	
	test('"push" put new item ton Stack', () => {
		const stack = new Stack();
		const item = { test : 'test' };
		stack.push(item);
		expect(stack.storage[0]).toBe(item);
		expect(stack.length).toBe(1);
		expect(stack.storage.length).toBe(1);
	});
	
	test('"pop" shifts stack to start and returns last item from stack', () => {
		const length = 5;
		const initialState = generateItems(length);
		const stack = new Stack(initialState);
		let popped = stack.pop();
		expect(stack.top).toBe(4);
		expect(popped).toBe(initialState[length - 1]);
		
		popped = stack.pop('some unnecessary arg', { another : 'one'});
		expect(stack.top).toBe(3);
		expect(popped).toBe(initialState[length - 2]);
	});
	
	test('"peek" returns top item from stack', () => {
		const initialState = generateItems(5);
		let stack = new Stack();
		expect(stack.peek(0)).toBe(undefined);
		stack = new Stack(initialState);
		expect(stack.peek()).toBe(initialState[initialState.length - 1]);
	});
});
