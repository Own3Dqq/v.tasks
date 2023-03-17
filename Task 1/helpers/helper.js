export function convertDollarsToNumber(string) {
	return +string.replace(/[\s,$]/g, '').split('.')[0];
}
