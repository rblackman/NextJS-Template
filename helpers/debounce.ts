/**
 * Enforce that a function not be called until a certain amount of time has passed without it being called.
 */
export default function debounce<T extends Function>(callback: T, wait = 20) {
	let timeoutRef = 0;
	const callable = (...args: any) => {
		clearTimeout(timeoutRef);
		timeoutRef = window.setTimeout(() => callback(...args), wait);
	};
	return <T>(<any>callable);
}
