import { MutableRefObject, useEffect, useRef } from 'react';

export default function useInterval<T extends () => void | Promise<void>>(
	callback: T,
	updateInterval: number,
	immediate: boolean,
	deps?: ReadonlyArray<any>
) {
	const savedCallback: MutableRefObject<T | undefined> = useRef<T>();
	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		function tick(): void {
			if (savedCallback.current) {
				savedCallback.current();
			}
		}

		const id = window.setInterval(tick, updateInterval);
		if (immediate) {
			tick();
		}

		return () => clearInterval(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateInterval, immediate, ...(deps || [])]);
}
