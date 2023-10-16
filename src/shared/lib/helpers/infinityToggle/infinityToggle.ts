export function infinityToggle<T>(array: Array<T>, value: T): T {
    if (value && array[0]) {
        const index = array.indexOf(value);

        if (index + 1 === array.length) {
            return array[0];
        }
        return array.find((_, i) => i === index + 1) ?? array[0];
    }
    return value ?? array[0];
}
