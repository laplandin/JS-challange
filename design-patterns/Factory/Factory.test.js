const Factory = require('./Factory');

describe('Factory tests', () => {
	test('Factory properly deliver props to childs', () => {
		const props = { size: 10, fill: 'green' };
		const factory = new Factory(props);
		const circle = factory.create('circle');
		const square = factory.create('square');
		
		expect(circle.getInfo()).toEqual({ radius: props.size/2, fill: props.fill });
		expect(square.getInfo()).toEqual({ side: props.size, fill: props.fill });
	});
	
	test('Factory returns new instance every time', () => {
		const factory = new Factory();
		const circle = factory.create('circle');
		const circle1 = factory.create('circle');
		
		expect(circle).not.toBe(circle1);
	});
});
