import React, { useEffect, useRef } from 'react';
import { BOOK_HEIGHT, SEMI_MINOR_AXIS } from '../utils/constant';

/**
 * Return a canvas with a book drawn.
 * Deafult size of the book: width = 700px, height = 500px
 */
function BookOutline({ bookWidth = 700 }) {
	const canvasRef = useRef();

	// Draw book outline on mount
	useEffect(() => {
		if (!canvasRef.current) return;
		canvasRef.current.width = bookWidth;
		canvasRef.current.height = BOOK_HEIGHT;
		const semiMajorAxis = bookWidth / 4;
		if (canvasRef.current.getContext) {
			const ctx = canvasRef.current.getContext('2d');
			ctx.strokeStyle = 'rgb(5, 151, 242)';
			ctx.beginPath();
			// Draw top left ellipse
			ctx.moveTo(bookWidth / 2, SEMI_MINOR_AXIS);
			ctx.ellipse(
				semiMajorAxis,
				SEMI_MINOR_AXIS,
				semiMajorAxis,
				SEMI_MINOR_AXIS,
				0,
				0,
				Math.PI,
				true
			);
			// Top right ellipse
			ctx.moveTo(bookWidth, SEMI_MINOR_AXIS);
			ctx.ellipse(
				semiMajorAxis * 3,
				SEMI_MINOR_AXIS,
				semiMajorAxis,
				SEMI_MINOR_AXIS,
				0,
				0,
				Math.PI,
				true
			);
			// Left bound
			ctx.moveTo(1, SEMI_MINOR_AXIS - 5);
			ctx.lineTo(1, BOOK_HEIGHT);
			// Right bound
			ctx.moveTo(bookWidth - 1, SEMI_MINOR_AXIS - 5);
			ctx.lineTo(bookWidth - 1, BOOK_HEIGHT);
			// Bottom left ellipse
			ctx.moveTo(bookWidth / 2, BOOK_HEIGHT);
			ctx.ellipse(
				semiMajorAxis,
				BOOK_HEIGHT,
				semiMajorAxis,
				SEMI_MINOR_AXIS,
				0,
				0,
				Math.PI,
				true
			);
			// Bottom right ellipse
			ctx.moveTo(bookWidth, BOOK_HEIGHT);
			ctx.ellipse(
				semiMajorAxis * 3,
				BOOK_HEIGHT,
				semiMajorAxis,
				SEMI_MINOR_AXIS,
				0,
				0,
				Math.PI,
				true
			);
			ctx.stroke();
		}
	}, [bookWidth]);

	return <canvas ref={canvasRef}></canvas>;
}

export default BookOutline;
