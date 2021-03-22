import { BOOK_HEIGHT, SEMI_MINOR_AXIS } from './constant';

/**
 * isInBook checks if tagObj is within the book.
 * It returns true if tagObj is within the book.
 *
 * @param {Object} tagObj
 * @param {Number} bookWidth
 * @returns {Boolean}
 */
const isInBook = (tagObj, bookWidth) => {
	const { x1, y1, x2, y2 } = tagObj;
	// Check if outside of left
	if (x1 < 0) return false;
	// Check if outside of top
	if (y1 < 0) return false;
	// Check if outside of right
	if (x2 > bookWidth) return false;
	// Check if outside of bottom
	if (y2 > BOOK_HEIGHT) return false;
	// Perform top left ellipse test
	const halfBookWidth = bookWidth / 2;
	const semiMajorAxis = bookWidth / 4;
	if (x1 < halfBookWidth && y1 < SEMI_MINOR_AXIS) {
		if (x2 > halfBookWidth) return false;
		const y1Boundary1 = getTopLeftEllipseY(x1, semiMajorAxis);
		if (y1 < y1Boundary1) return false;
		const y1Boundary2 = getTopLeftEllipseY(x2, semiMajorAxis);
		if (y1 < y1Boundary2) return false;
	}
	// Perform top right ellipse test
	if (x2 > halfBookWidth && y1 < SEMI_MINOR_AXIS) {
		if (x1 < halfBookWidth) return false;
		const y1Boundary1 = getTopRightEllipseY(x1, semiMajorAxis);
		if (y1 < y1Boundary1) return false;
		const y1Boundary2 = getTopRightEllipseY(x2, semiMajorAxis);
		if (y1 < y1Boundary2) return false;
	}
	// Perform bottom left ellipse test
	if (x1 < halfBookWidth && y2 > BOOK_HEIGHT - SEMI_MINOR_AXIS) {
		if (x2 > halfBookWidth) return false;
		const y2Boundary1 = getBottomLeftEllipseY(x1, semiMajorAxis);
		if (y2 > y2Boundary1) return false;
		const y2Boundary2 = getBottomLeftEllipseY(x2, semiMajorAxis);
		if (y2 > y2Boundary2) return false;
	}
	// Perform bottom right ellipse test
	if (x2 > halfBookWidth && y2 > BOOK_HEIGHT - SEMI_MINOR_AXIS) {
		if (x1 < halfBookWidth) return false;
		const y2Boundary1 = getBottomRightEllipseY(x1, semiMajorAxis);
		if (y2 > y2Boundary1) return false;
		const y2Boundary2 = getBottomRightEllipseY(x2, semiMajorAxis);
		if (y2 > y2Boundary2) return false;
	}
	return true;
};

const getTopLeftEllipseY = (x, semiMajorAxis) => {
	// Ellipse center at (h, k) = (175, 50)
	// Semi-major axis: a = 175
	// Semi-minor axis: b = 50
	const h = semiMajorAxis;
	const k = SEMI_MINOR_AXIS;
	const a = semiMajorAxis;
	const b = SEMI_MINOR_AXIS;
	// y = +-sqrt(b^2 - (x-h)^2 * b^2 / a^2) + k
	// *Very tricky: Looking at the book canvas, it seems that this is top half
	// of the ellipse, but it is actually the bottom half when view in
	// conventional rectangular coordinates. Y-axis in html is vertically flipped.
	const y = -Math.sqrt(b ** 2 - ((x - h) ** 2 * b ** 2) / a ** 2) + k;
	return y;
};

const getTopRightEllipseY = (x, semiMajorAxis) => {
	// Ellipse center at (h, k) = (525, 50)
	// Semi-major axis: a = 175
	// Semi-minor axis: b = 50
	const h = semiMajorAxis * 3;
	const k = SEMI_MINOR_AXIS;
	const a = semiMajorAxis;
	const b = SEMI_MINOR_AXIS;
	// y = +-sqrt(b^2 - (x-h)^2 * b^2 / a^2) + k
	const y = -Math.sqrt(b ** 2 - ((x - h) ** 2 * b ** 2) / a ** 2) + k;
	return y;
};

const getBottomLeftEllipseY = (x, semiMajorAxis) => {
	// Ellipse center at (h, k) = (175, 500)
	// Semi-major axis: a = 175
	// Semi-minor axis: b = 50
	const h = semiMajorAxis;
	const k = BOOK_HEIGHT;
	const a = semiMajorAxis;
	const b = SEMI_MINOR_AXIS;
	const y = -Math.sqrt(b ** 2 - ((x - h) ** 2 * b ** 2) / a ** 2) + k;
	return y;
};

const getBottomRightEllipseY = (x, semiMajorAxis) => {
	// Ellipse center at (h, k) = (525, 500)
	// Semi-major axis: a = 175
	// Semi-minor axis: b = 50
	const h = semiMajorAxis * 3;
	const k = BOOK_HEIGHT;
	const a = semiMajorAxis;
	const b = SEMI_MINOR_AXIS;
	const y = -Math.sqrt(b ** 2 - ((x - h) ** 2 * b ** 2) / a ** 2) + k;
	return y;
};

export default isInBook;
