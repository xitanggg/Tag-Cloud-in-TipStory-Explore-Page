/**
 * isTagCollised checks if tagObj collides with any tagObjs in
 * the tagList array. It returns true to indicate a collision.
 *
 * @param {Object} tagObj
 * @param {Array} otherTags
 */
const isTagCollided = (tagObj, otherTags) => {
	const { x1, y1, x2, y2 } = tagObj;
	// notOnTop is the list of tags that current tagObj is not on top of
	// Note y value increases by going down in html
	// Conventinally, tagObj is on top of another if y2 > item.y1
	// In html, it is the opposite, tagObj is on top of another if y2 < item.y1
	// (lower value of means higher up)
	const notOnTop = otherTags.filter((item) => !(y2 < item.y1));
	if (notOnTop.length === 0) return false;
	const notOnBottom = notOnTop.filter((item) => !(y1 > item.y2));
	if (notOnBottom.length === 0) return false;
	const notOnLeft = notOnBottom.filter((item) => !(x1 > item.x2));
	if (notOnLeft.length === 0) return false;
	const notOnRight = notOnLeft.filter((item) => !(x2 < item.x1));
	if (notOnRight.length === 0) return false;
	return true;
};

export default isTagCollided;
