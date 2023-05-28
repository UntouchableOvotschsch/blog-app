import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';
import { Countries } from 'entities/Country';
import { Currencies } from 'entities/Currency';
import { ProfileType } from '../../types/profile';
import { fetchProfileData } from '.';

describe('fetchProfileData', () => {
    const fetchedProfile: ProfileType = {
        country: Countries.Russia,
        currency: Currencies.RUB,
        avatar: '',
        city: 'Moscow',
        age: 22,
        username: 'admin',
        lastname: 'Solomatin',
        firstname: 'Sergey',
    };

    test('Fulfilled fetching', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockResolvedValue({ data: fetchedProfile });
        const result = await thunk.callThunk();

        expect(thunk.api.get)
            .toHaveBeenCalled();
        expect(result.payload)
            .toEqual(fetchedProfile);
        expect(result.meta.requestStatus)
            .toBe('fulfilled');
        expect(thunk.dispatch)
            .toHaveBeenCalledTimes(2);
    });

    test('Rejected fetching', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockRejectedValue({ status: 403 });
        const result = await thunk.callThunk();

        expect(thunk.api.get)
            .toHaveBeenCalled();
        expect(thunk.dispatch)
            .toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus)
            .toBe('rejected');
        expect(result.payload)
            .toBe('Ошибка при получения профиля');
    });
});