const styled = require('./index.js');

test('styled without params', () => {
	expect(styled()``()).toBe('');
});

test('styled with simple css', () => {
	expect(
		styled()`
			color: red;
		`()
	).toBe('color: red;');
});

test('styled with multiple line css', () => {
	expect(
		styled()`
			color: white;
			background: black;
		`()
	).toBe('color: white;background: black;');
});

test('styled with query', () => {
	const styledColor = styled()`
		color: ${argument => argument.color || 'red'};
	`;

	expect(
		styledColor({ color: 'blue' })
	).toBe('color: blue;');

	expect(
		styledColor()
	).toBe('color: red;');
});

test('extended styled', () => {
	const styledColor = styled()`
		color: ${argument => argument.color || 'red'};
	`;

	const styledColorWithBackground = styled(styledColor)`
		background: ${argument => argument.bg || 'white'};
	`;

	expect(
		styledColorWithBackground({ color: 'blue' })
	).toBe('color: blue;background: white;');

	expect(
		styledColorWithBackground({ color: 'yellow', bg: 'blue' })
	).toBe('color: yellow;background: blue;');

	expect(
		styledColorWithBackground()
	).toBe('color: red;background: white;');
});