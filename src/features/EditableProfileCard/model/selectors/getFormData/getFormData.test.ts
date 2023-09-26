import { StateSchema } from '@/app/providers/StoreProvider';
import { Countries } from '@/entities/Country';
import { Currencies } from '@/entities/Currency';
import { getFormData } from '.';

describe('getFromData.test', () => {
    const state: DeepPartial<StateSchema> = {
        profile: {
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                avatar: '',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
            },
        },
    };
    test('should return state', () => {
        expect(getFormData(state as StateSchema))
            .toEqual({
                country: Countries.Russia,
                currency: Currencies.RUB,
                avatar: '',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
            });
    });
    test('with empty state', () => {
        expect(getFormData({} as StateSchema))
            .toEqual(undefined);
    });
});
