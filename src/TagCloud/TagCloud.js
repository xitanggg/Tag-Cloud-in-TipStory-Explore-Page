import React, { useEffect, useRef, useState } from 'react';
import BookOutline from './BookOutline';
import styles from './TagCloud.module.css';
import { isInBook, isTagCollided, useInterval } from './utils';
import { BOOK_HEIGHT } from './utils/constant';
import testWords from './utils/testWords';

const initializedTagList = testWords.map((item) => ({
	...item,
	visibility: 'hidden',
	opacity: 0,
}));

function TagCloud() {
	const tagListRef = useRef(testWords);
	const [tagList, setTagList] = useState(initializedTagList);

	// Effect to make a new tag visible every 300ms
	const [displayIdx, setDisplayIdx] = useState(0);
	useInterval(() => {
		if (displayIdx === tagList.length) return;
		if (!tagListRef.current[displayIdx].hide) {
			tagList[displayIdx].visibility = 'visible';
			tagList[displayIdx].opacity = 1;
		}
		setDisplayIdx((prev) => prev + 1);
	}, 300);

	// Set bookWidth based on window size on mount (Default to 700px)
	const tagCloudRef = useRef('');
	const [bookWidth, setBookWidth] = useState(700);
	useEffect(() => {
		if (!tagCloudRef.current) return;
		const tagCloudWidth = tagCloudRef.current.clientWidth;
		if (tagCloudWidth !== 700) {
			setBookWidth(tagCloudWidth);
		}
	}, []);

	return (
		<div className={styles.tagCloud} ref={tagCloudRef}>
			<BookOutline bookWidth={bookWidth} />
			{tagList.map((item, idx) => (
				<Tag
					key={idx}
					bookWidth={bookWidth}
					tagObj={item}
					idx={idx}
					tagListRef={tagListRef}
				/>
			))}
		</div>
	);
}

function Tag({ bookWidth, tagObj, idx, tagListRef }) {
	const tagRef = useRef('');
	const [state, setState] = useState({
		x1: -999,
		y1: -999,
		fontSize: Math.floor(Math.random() * 4) + 15,
	});
	const { x1, y1, fontSize } = state;
	const { tag, visibility, opacity } = tagObj;
	const tagLink = `https://www.tipstory.org/tag/${tag.toLowerCase()}`;
	const tagDisplay = tag.charAt(0).toUpperCase() + tag.substring(1);

	useTagPosition(tagRef, idx, tagListRef, bookWidth, setState);

	return (
		<a href={tagLink} className={styles.tagLink}>
			<div
				ref={tagRef}
				className={styles.tag}
				style={{ left: x1, top: y1, fontSize, visibility, opacity }}
			>
				{tagDisplay}
			</div>
		</a>
	);
}

/**
 * useTagPosition is the core of the tag cloud algorithum and attempts
 * to place a tag inside the book.
 * If a tag is placed successfullly, the tag is set with new x1, y1, x2, y2.
 * If not, the tag is set to be hidden.
 */
const useTagPosition = (tagRef, idx, tagListRef, bookWidth, setState) => {
	useEffect(() => {
		if (!tagRef.current) return;
		// Initialized each tag's position along the middle line of the book
		const xRandomness = Math.random() * 100 - 50;
		const x1 = bookWidth / 2 + xRandomness;
		const y1 = BOOK_HEIGHT / 2;
		// Get width and height of current tag
		const width = tagRef.current.offsetWidth;
		const height = tagRef.current.offsetHeight;
		// Get other tags before current tag for collision comparision
		const otherTags = tagListRef.current.slice(0, idx);
		// Initialized theta of Archimedean spiral and define stepSize = 0.1 radian
		let theta = 0;
		const stepSize = 0.1;
		// Initialized numLoop and define maxNumLoop = 5000
		let numLoop = 0;
		const maxNumLoop = 5000;

		// Tag is placed successfully if it is within book and
		// doesn't collides with other tags
		while (true) {
			// Get x1, y1, x2, y2 of tag based on theta of Archimedean spiral
			const newX1 = x1 + theta * Math.cos(theta);
			const newY1 = y1 - theta * Math.sin(theta);
			const x2 = newX1 + width;
			const y2 = newY1 + height;
			const tagObj = { x1: newX1, y1: newY1, x2, y2 };

			// Break if numLoops exceed maxNumLoop
			// and set tag to hide
			if (numLoop > maxNumLoop) {
				tagListRef.current[idx].hide = true;
				break;
			}

			// Check if tag is withinBook
			const inBook = isInBook(tagObj, bookWidth);
			if (!inBook) {
				theta = theta + stepSize;
				numLoop += 1;
				continue;
			}

			// Check if tag collides with other tags
			const collision = isTagCollided(tagObj, otherTags);
			if (collision) {
				theta = theta + stepSize;
				numLoop += 1;
			} else {
				tagListRef.current[idx].x1 = newX1;
				tagListRef.current[idx].y1 = newY1;
				tagListRef.current[idx].x2 = x2;
				tagListRef.current[idx].y2 = y2;
				setState((prev) => ({ ...prev, x1: newX1, y1: newY1 }));
				break;
			}
		}
	}, [tagRef, idx, tagListRef, bookWidth, setState]);
};

export default TagCloud;
