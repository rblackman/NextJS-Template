import debounce from '../helpers/debounce';
import useEventListener from './useEventListener';

type WindowSize = { width: number | undefined; height: number | undefined };
type Callback = (width: number | undefined, height: number | undefined) => unknown;

export default function useWindowSizeListener(callback: Callback, debounceWait: number = 250): void {
	const isClient = typeof window === 'object';

	function getSize(): WindowSize {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined
		};
	}

	function handleResize() {
		const size = getSize();
		callback(size.width, size.height);
	}

	const debouncedHandleResize = debounceWait > 0 ? debounce(handleResize, debounceWait) : handleResize;

	useEventListener('resize', debouncedHandleResize, window);
}
