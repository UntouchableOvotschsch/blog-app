import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { Countries } from '@/entities/Country';
import { Currencies } from '@/entities/Currency';
import { UserRoles } from '@/entities/User';
import { ProfileType } from '@/entities/Profile';
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
        id: 1,
    };

    test('Fulfilled updating', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: updatedProfile,
            },
            user: {
                authData: {
                    roles: [
                        UserRoles.ADMIN,
                    ],
                    id: '1',
                    avatar: '',
                    username: '',
                },
            },
        });
        thunk.api.put.mockResolvedValue(Promise.resolve({ data: updatedProfile }));
        const result = await thunk.callThunk('1');

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
            user: {
                authData: {
                    roles: [
                        UserRoles.ADMIN,
                    ],
                    id: '1',
                    avatar: '',
                    username: '',
                },
            },
        });
        thunk.api.put.mockRejectedValue(
            {
                status: 403,
            },
        );
        const result = await thunk.callThunk('1');

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
            user: {
                authData: {
                    roles: [
                        UserRoles.ADMIN,
                    ],
                    id: '1',
                    avatar: '',
                    username: '',
                },
            },
        });

        const result = await thunk.callThunk('1');

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
