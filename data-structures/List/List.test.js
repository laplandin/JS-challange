const ListEs5 = require('./List.es5');
const List = require('./List');

const lists = [ListEs5, List];

const generateItems = (n) => {
	return Array.from(Array(n), (_, index) => ({ n: index }));
};

test('creates new list with initial state of storage', () => {
	lists.forEach(List => {
		const initialState = generateItems(10);
		const list = new List(initialState);
		expect(list.length).toBe(10);
		expect(list.storage).toEqual(initialState);
	});
});

test('append adds new item to list', () => {
	lists.forEach(List => {
		const list = new List();
		const item = {
			data: 'some data',
		};
		list.append(item);
		expect(list.length).toBe(1);
		expect(list.storage[0]).toEqual(item);
	});
});

test('insert inserts new item after existing element', () => {
	lists.forEach(List => {
		const initialState = generateItems(2);
		const newItem = { n: 1.5 };
		const list = new List(initialState);
		const index = 1;
		const expectedList = initialState.slice(0, index).concat(newItem).concat(initialState.slice(index));
		list.insert(newItem, index);
		
		expect(list.length).toBe(3);
		expect(list.storage).toEqual(expectedList);
	});
});
