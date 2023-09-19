import { StateSchema } from '@/app/providers/StoreProvider';
import { getCounter } from './index';

describe('getCounter', () => {
    test('should return counter state', () => {
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 10,
            },
        };
        expect(getCounter(state as StateSchema))
            .toEqual({ value: 10 });
    });
});
