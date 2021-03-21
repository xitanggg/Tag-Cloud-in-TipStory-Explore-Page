import { useEffect, useRef } from 'react';

/**
 * useInterval is the react hook way of using setInterval.
 * By Dan Abramov
 *
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param {Function} callback
 * @param {Number} delay
 */

function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		async function tick() {
			await savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export default useInterval;
