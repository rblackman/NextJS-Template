// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
/* eslint-disable no-alert, no-bitwise */
export default function uuidv4(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function convert(c) {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
