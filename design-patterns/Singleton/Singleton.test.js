const Singleton = require('./Singleton');

function iExpect(first, second) {
	expect(first).toBe(second);
	expect(first.method()).toBe('prop');
}

test('Test classless singleton object', () => {
	const { ClassLessSingletonLiteral } = Singleton;
	const first = ClassLessSingletonLiteral.instance;
	const second = ClassLessSingletonLiteral.instance;
	
	iExpect(first, second);
	expect(first.staticMethod()).toBe(42);
});

test('Test for Exported Singleton Instance', () => {
	const { ExportedSingletonInstance } = Singleton;
	// We cannot call this instance with 'new', because of it already exported instantiated
	const first = ExportedSingletonInstance;
	const second = ExportedSingletonInstance;
	
	iExpect(first, second);
	expect(first.constructor.staticMethod()).toBe(42);
});

test('Test for class own prop singleton', () => {
	const { ClassPropSingleton } = Singleton;
	
	const first = new ClassPropSingleton();
	const second = new ClassPropSingleton();
	
	iExpect(first, second);
	expect(ClassPropSingleton.staticMethod()).toBe(42);
});
