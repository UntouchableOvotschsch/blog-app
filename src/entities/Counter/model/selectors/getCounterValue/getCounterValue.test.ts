import { StateSchema } from '@/app/providers/StoreProvider';
import { getCounterValue } from './index';

describe('getCounterValue', () => {
    test('should return counter value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 10,
            },
        };
        expect(getCounterValue(state as StateSchema))
            .toBe(10);
    });
});
