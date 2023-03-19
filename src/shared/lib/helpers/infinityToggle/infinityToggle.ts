export function infinityToggle(array: any[], value: any) {
    if (!value || !array) {
        return undefined;
    }
    const index = array.indexOf(value);

    if (index + 1 === array.length) {
        return array[0];
    }

    return array.find((_, i) => i === index + 1);
}
