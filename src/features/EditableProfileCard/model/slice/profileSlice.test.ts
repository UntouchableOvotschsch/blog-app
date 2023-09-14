import { Countries } from 'entities/Country';
import { Currencies } from 'entities/Currency';
import { ProfileSchema, ProfileValidationErrors } from '../types/profile';
import { profileActions, profileReducer } from './profileSlice';
import { fetchProfileData } from '../services/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData';

describe('profileSlice', () => {
    const profileState: ProfileSchema = {
        isLoading: false,
        editable: false,
        form: {
            country: Countries.Russia,
            currency: Currencies.RUB,
            avatar: '',
            city: 'sdfsdf',
            age: 22,
            username: 'sdfsdfsdf',
            lastname: 'sdfdf',
            firstname: 'sfdsfsdfsdff',
        },
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
    };
    test('setEditable', () => {
        expect(profileReducer(profileState, profileActions.setEditable(true)))
            .toEqual<ProfileSchema>({
                ...profileState,
                editable: true,
            });
    });
    test('cancelFormChanging', () => {
        expect(profileReducer(profileState, profileActions.cancelFormChanging()))
            .toEqual<ProfileSchema>({
                ...profileState,
                form: profileState.data,
            });
    });

    test('changeProfileData', () => {
        expect(profileReducer(
            profileState,
            profileActions.changeProfileData({ username: 'Sergey' }),
        ))
            .toEqual<ProfileSchema>({
                ...profileState,
                form: {
                    ...profileState.form,
                    username: 'Sergey',
                },
            });
    });

    test('fetchProfileDataLoading', () => {
        const action = { type: fetchProfileData.pending };
        expect(profileReducer(profileState, action))
            .toEqual<ProfileSchema>({
                ...profileState,
                isLoading: true,
            });
    });
    test('fetchProfileDataRejected', () => {
        const action = {
            type: fetchProfileData.rejected,
            payload: 'Ошибка при получения профиля',
        };
        expect(profileReducer(profileState, action))
            .toEqual<ProfileSchema>({
                ...profileState,
                error: 'Ошибка при получения профиля',
            });
    });
    test('fetchProfileDataFulfilled', () => {
        const action = {
            type: fetchProfileData.fulfilled,
            payload: {
                ...profileState.data,
            },
        };
        expect(profileReducer(profileState, action))
            .toEqual<ProfileSchema>({
                ...profileState,
                isLoading: false,
                data: action.payload,
                form: action.payload,
            });
    });
    test('updateProfileDataLoading', () => {
        const action = { type: updateProfileData.pending };
        expect(profileReducer(profileState, action))
            .toEqual<ProfileSchema>({
                ...profileState,
                isLoading: true,
            });
    });

    test('updateProfileDataRejected', () => {
        const action = {
            type: updateProfileData.rejected,
            payload: [
                ProfileValidationErrors.SERVER_ERROR,
            ],
        };
        expect(profileReducer(profileState, action))
            .toEqual<ProfileSchema>({
                ...profileState,
                isLoading: false,
                validationError: action.payload,
            });
    });

    test('updateProfileDataFulfilled', () => {
        const action = {
            type: updateProfileData.fulfilled,
            payload: { ...profileState.data },
        };
        expect(profileReducer(profileState, action))
            .toEqual<ProfileSchema>({
                ...profileState,
                data: {
                    ...profileState.data,
                },
                form: {
                    ...profileState.data,
                },
                isLoading: false,
                editable: false,
                validationError: undefined,
            });
    });
});
