import isTagCollided from './isTagCollided';

// Note y1 is -100 because html y value increases by going down
// (y value increases by going up in convential graph)
it('1 rec on right', () => {
	const tagObj = { x1: 100, y1: -100, x2: 200, y2: 0 };
	const tagList = [{ x1: 250, y1: -100, x2: 350, y2: 0 }];
	expect(isTagCollided(tagObj, tagList)).toEqual(false);
});

it('1 rec on bottom', () => {
	const tagObj = { x1: 100, y1: -100, x2: 200, y2: 0 };
	const tagList = [{ x1: 100, y1: 100, x2: 200, y2: 200 }];
	expect(isTagCollided(tagObj, tagList)).toEqual(false);
});

it('1 rec on left', () => {
	const tagObj = { x1: 100, y1: -100, x2: 200, y2: 0 };
	const tagList = [{ x1: 0, y1: -100, x2: 50, y2: 0 }];
	expect(isTagCollided(tagObj, tagList)).toEqual(false);
});

it('1 rec on top', () => {
	const tagObj = { x1: 100, y1: -100, x2: 200, y2: 0 };
	const tagList = [{ x1: 100, y1: -400, x2: 200, y2: -300 }];
	expect(isTagCollided(tagObj, tagList)).toEqual(false);
});

it('1 rec on right, bottom, left, top each', () => {
	const tagObj = { x1: 100, y1: 100, x2: 200, y2: 0 };
	const tagList = [
		{ x1: 250, y1: -100, x2: 350, y2: 0 },
		{ x1: 100, y1: 100, x2: 200, y2: 200 },
		{ x1: 0, y1: -100, x2: 50, y2: 0 },
		{ x1: 100, y1: -400, x2: 200, y2: -300 },
	];
	expect(isTagCollided(tagObj, tagList)).toEqual(false);
});

it('1 rec inside', () => {
	const tagObj = { x1: 100, y1: -100, x2: 200, y2: 0 };
	const tagList = [{ x1: 150, y1: -150, x2: 250, y2: -50 }];
	expect(isTagCollided(tagObj, tagList)).toEqual(true);
});

it('1 rec on right, 1 rec inside', () => {
	const tagObj = { x1: 100, y1: -100, x2: 200, y2: 0 };
	const tagList = [
		{ x1: 250, y1: -100, x2: 350, y2: 0 },
		{ x1: 150, y1: -150, x2: 250, y2: -50 },
	];
	expect(isTagCollided(tagObj, tagList)).toEqual(true);
});
