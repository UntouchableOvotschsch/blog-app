import { StateSchema } from '@/app/providers/StoreProvider';

import { getProfileEditable } from '.';

describe('getProfileEditable.test', () => {
    const state: DeepPartial<StateSchema> = {
        profile: {
            editable: true,
        },
    };
    test('should return state', () => {
        expect(getProfileEditable(state as StateSchema))
            .toBe(true);
    });
    test('with empty state', () => {
        expect(getProfileEditable({} as StateSchema))
            .toEqual(false);
    });
});
