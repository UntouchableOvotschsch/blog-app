import { StateSchema } from 'app/providers/StoreProvider';
import { Countries } from 'entities/Country';
import { Currencies } from 'entities/Currency';
import { getProfileData } from './index';

describe('getProfileData.test', () => {
    const state: DeepPartial<StateSchema> = {
        profile: {
            data: {
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
        expect(getProfileData(state as StateSchema))
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
        expect(getProfileData({} as StateSchema))
            .toEqual(undefined);
    });
});
