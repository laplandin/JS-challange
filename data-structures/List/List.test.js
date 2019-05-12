const List = require('./List');
const generateItems = require('../libs/generateArray');

test('creates new list with initial state of storage', () => {
	const initialState = generateItems(10);
	const list = new List(initialState);
	expect(list.length).toBe(10);
	expect(list.storage).toEqual(initialState);
});

describe('\n/* -------------- Edit operations -------------- */\n', () => {
	test('"append" adds new item to list', () => {
		const list = new List();
		const item = {
			data: 'some data',
		};
		list.append(item);
		
		expect(list.length).toBe(1);
		expect(list.storage[0]).toEqual(item);
	});
	
	test('"prepend" adds new item to first position in list', () => {
		const initialState = generateItems(3);
		const list = new List(initialState);
		const newItem = { prop: 'new item' };
		const expectedList = [newItem, ...initialState];
		list.prepend(newItem);
		
		expect(list.length).toBe(initialState.length + 1);
		expect(list.storage).toEqual(expectedList);
	});
	
	test('"insert" inserts new item after existing element', () => {
		const initialState = generateItems(2);
		const newItem = { n: 1.5 };
		const list = new List(initialState);
		const index = 1;
		const expectedList = initialState.slice(0, index).concat(newItem).concat(initialState.slice(index));
		list.insert(newItem, index);
		
		expect(list.length).toBe(3);
		expect(list.storage).toEqual(expectedList);
	});
	
	test('"remove" removes item from List by index', () => {
		const initialState = generateItems(3);
		const list = new List(initialState);
		const expectedList = initialState.slice(0,2);
		const expectedList2 = expectedList.slice(1);
		
		list.remove(2);
		expect(list.length).toBe(expectedList.length);
		expect(list.storage).toEqual(expectedList);
		
		list.remove(0);
		expect(list.length).toBe(expectedList2.length);
		expect(list.storage).toEqual(expectedList2);
	});
	
	test('"clear" removes off items from List', () => {
		const initialState = generateItems(5);
		const list = new List(initialState);
		list.clear();
		
		expect(list.position).toBe(-1);
		expect(list.storage).toEqual([]);
		expect(list.length).toBe(0);
	});
	
	test('it handles invalid input parameters correctly for edit operations', () => {
		const initialState = generateItems(3);
		const list = new List(initialState);
		const length = list.length;
		const storage = [...list.storage];
		const position = list.position;
		
		const iExpect = () => {
			expect(list.length).toBe(length);
			expect(list.storage).toEqual(storage);
			expect(list.position).toBe(position);
		};
		
		/* check for empty input */
		
		list.append();
		iExpect();
		
		list.prepend();
		iExpect();
		
		list.insert();
		iExpect();
		
		list.remove();
		iExpect();
		
		/* check for invalid input (index out of range) */
		
		list.insert({}, {});
		list.insert({}, 100);
		list.insert({}, -100);
		list.insert({}, NaN);
		list.insert({}, null);
		iExpect();
		
		list.remove({}, {});
		list.remove({}, 100);
		list.remove({}, -100);
		list.remove({}, NaN);
		list.remove({}, null);
		iExpect();
	});
});

describe('\n/* -------------- Traverse operations -------------- */\n', () => {
	test('"front" moves pointer to first position', () => {
		const initialState = generateItems(5);
		const list = new List(initialState);
		list.front();
		expect(list.position).toBe(0);
	});
	
	test('"end" moves pointer to last position', () => {
		const initialState = generateItems(5);
		const list = new List(initialState);
		list.end();
		expect(list.position).toBe(list.length - 1);
	});
	
	test('"prev" moves pointer to previous position, if exist', () => {
		const initialState = generateItems(3);
		const list = new List(initialState);
		list.position = list.length - 1; // 2
		list.prev();
		expect(list.position).toBe(1);
		list.prev();
		expect(list.position).toBe(0);
		list.prev();
		expect(list.position).toBe(0);
	});
	
	test('"next" moves pointer to next position, if exist', () => {
		const initialState = generateItems(5);
		const list = new List(initialState);
		list.next();
		expect(list.position).toBe(0);
	});
	
	test('"moveTo" moves pointer to specified position', () => {
		const initialState = generateItems(5);
		const list = new List(initialState);
		list.moveTo(3);
		expect(list.position).toBe(3);
	});
	
	test('it should correctly handle incorrect input for traverse operations', () => {
		const initialState = generateItems(5);
		const list = new List(initialState);
		list.moveTo(3);
		const position = list.position;
		
		list.moveTo(10);
		list.moveTo(-4);
		list.moveTo({});
		list.moveTo(NaN);
		list.moveTo();
		
		expect(list.position).toBe(position);
	});
	
	test('it should correctly handle incorrect input for traverse operations on empty list', () => {
		const list = new List();
		const position = list.position;
		expect(list.position).toBe(position);
		list.front();
		expect(list.position).toBe(position);
		list.end();
		expect(list.position).toBe(position);
		list.prev();
		expect(list.position).toBe(position);
		list.next();
		expect(list.position).toBe(position);
		list.moveTo(2);
		expect(list.position).toBe(position);
	});
});

describe('\n/* -------------- Info operations -------------- */\n', () => {
	test('getCurrElement correctly', () => {
		const initialState = generateItems(10);
		let list = new List(initialState);
		const index = 5;
		list.position = index;
		const expected =  initialState[index];
		let current = list.getCurrElement();
		expect(current).toEqual(expected);
		
		list = new List();
		current = list.getCurrElement();
		expect(current).toBe(null);
	});
	
	test('getCurrElement correctly', () => {
		const initialState = generateItems(10);
		const list = new List(initialState);
		const index = 5;
		const current = initialState[index];
		expect(list.getElement(index)).toEqual(current);
		expect(list.getElement(index + 100)).toEqual(null);
		expect(list.getElement(index - 100)).toEqual(null);
	});
	
	test('findOne should returns first index of exactly matched item', () => {
		const item = { a: 1, b: { c: 1, d: { e: 1}}};
		const number = 0;
		const string = ' ';
		const list = new List([number, string, item, number, item, number, string]);
		let index = list.findOne(item);
		
		/* find object */
		expect(index).toBe(2);
		
		list.storage[2] = item.a;
		index = list.findOne(item);
		expect(index).toBe(4);
		
		index = list.findOne(item.b);
		expect(index).toBe(null);
		
		/* find number */
		index = list.findOne(number);
		expect(index).toBe(0);
		
		list.storage[0] = 1;
		index = list.findOne(number);
		expect(index).toBe(3);
		
		/* find string */
		index = list.findOne(string);
		expect(index).toBe(1);
		
		list.storage[1] = null;
		index = list.findOne(string);
		expect(index).toBe(6);
	});
	
	test('find should returns array of indexes of exactly matched item', () => {
		const item = { a: 1, b: { c: 1, d: { e: 1}}};
		const number = 0;
		const string = ' ';
		const list = new List([number, string, item, number, item, number, string]);
		let index = list.find(item);
		/* find object */
		expect(index).toEqual([2, 4]);
		
		list.storage[2] = item.a;
		index = list.find(item);
		expect(index).toEqual([4]);
		
		index = list.find(item.b);
		expect(index).toBe(null);
		
		/* find number */
		index = list.find(number);
		expect(index).toEqual([0, 3, 5]);
		
		list.storage[0] = 1;
		index = list.find(number);
		expect(index).toEqual([3, 5]);
		
		/* find string */
		index = list.find(string);
		expect(index).toEqual([1, 6]);
		
		list.storage[1] = null;
		index = list.find(string);
		expect(index).toEqual([6]);
	});
	
	test('toString function', () => {
		const initialState = [0, 1, true, false, { a: 1 }, null, 'string', '', undefined];
		const list = new List(initialState);
		expect(list.toString()).toBe(initialState.toString());
	});
});
