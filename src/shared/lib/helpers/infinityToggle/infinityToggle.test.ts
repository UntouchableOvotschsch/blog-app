import { infinityToggle } from 'shared/lib/helpers/infinityToggle/infinityToggle';

describe('infinityToggle', () => {
    test('with numbers', () => {
        expect(infinityToggle([1, 2, 3, 4, 5], 4)).toBe(5);
    });
    test('with themes', () => {
        expect(infinityToggle(['light', 'dark'], 'dark')).toBe('light');
    });
    test('with strings', () => {
        expect(infinityToggle(['1', '2', '3', '4', '5'], '4')).toBe('5');
    });
    test('with fake value', () => {
        expect(infinityToggle(['1', '2', '3', '4', '5'], '9')).toBe('1');
    });
    test('with undefined array', () => {
        expect(infinityToggle(undefined, '4')).toBe(undefined);
    });
    test('with undefined value', () => {
        expect(infinityToggle([1, 2, 3, 4, 5], null)).toBe(undefined);
    });
    test('with both undefined params', () => {
        expect(infinityToggle(undefined, null)).toBe(undefined);
    });
    test('with both undefined params', () => {
        expect(infinityToggle(undefined, null)).toBe(undefined);
    });
});
