export function transformAndDeleteCharacters(string) {
	return +string.replace(/[\s,$]/g, '').split('.')[0];
}
