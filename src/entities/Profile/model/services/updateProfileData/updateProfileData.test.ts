import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';
import { ProfileType } from 'entities/Profile';
import { Countries } from 'entities/Country';
import { Currencies } from 'entities/Currency';
import { updateProfileData } from '.';

describe('updateProfileData', () => {
    const updatedProfile: ProfileType = {
        country: Countries.Russia,
        currency: Currencies.RUB,
        avatar: '',
        city: 'Moscow',
        age: 22,
        username: 'admin',
        lastname: 'Solomatin',
        firstname: 'Sergey',
    };

    test('Fulfilled updating', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: updatedProfile,
            },
        });
        thunk.api.put.mockResolvedValue({ data: updatedProfile });
        const result = await thunk.callThunk();

        expect(thunk.api.put)
            .toHaveBeenCalled();
        expect(result.payload)
            .toEqual(updatedProfile);
        expect(result.meta.requestStatus)
            .toBe('fulfilled');
        expect(thunk.dispatch)
            .toHaveBeenCalledTimes(2);
    });

    test('Rejected updating', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: updatedProfile,
            },
        });
        thunk.api.put.mockRejectedValue(
            {
                status: 403,
            },
        );
        const result = await thunk.callThunk();

        expect(thunk.api.put)
            .toHaveBeenCalled();
        expect(thunk.dispatch)
            .toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus)
            .toBe('rejected');
        expect(result.payload)
            .toEqual(['SERVER_ERROR']);
    });

    test('Validation error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: {
                    ...updatedProfile,
                    lastname: '',
                },
            },
        });

        const result = await thunk.callThunk();

        expect(thunk.api.put)
            .toHaveBeenCalledTimes(0);
        expect(thunk.dispatch)
            .toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus)
            .toBe('rejected');
        expect(result.payload)
            .toEqual(['INCORRECT_USER_DATA']);
    });
});
