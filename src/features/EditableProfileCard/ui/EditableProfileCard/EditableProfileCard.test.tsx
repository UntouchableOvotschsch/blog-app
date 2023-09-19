import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderForTests, RenderForTestsOptions } from '@/shared/config/jest/renderForTests';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Countries } from '@/entities/Country';
import { Currencies } from '@/entities/Currency';
import { ProfileType } from '@/entities/Profile';
import { UserRoles } from '@/entities/User';
import { $api } from '@/shared/api';
import EditableProfileCard from './index';
import { profileReducer } from '../../model/slice/profileSlice';

const profileData: ProfileType = {
    id: 1,
    country: Countries.Russia,
    currency: Currencies.RUB,
    city: 'Moscow',
    age: 22,
    username: 'admin',
    lastname: 'Solomatin',
    firstname: 'Sergey',
    avatar: 'asd-asd',
};

const state: DeepPartial<StateSchema> = {
    profile: {
        data: profileData,
        form: profileData,
        editable: false,
        isLoading: false,
    },
    user: {
        authData: {
            id: '1',
            roles: [
                UserRoles.ADMIN,
            ],
        },
    },
};

const options: RenderForTestsOptions = {
    initialState: state,
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('EditableProfileCard.test', () => {
    test('Change to Edit mode', async () => {
        renderForTests(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelBtn')).toBeInTheDocument();
    });

    test('CancelEditMode', async () => {
        renderForTests(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));

        await userEvent.clear(screen.getByTestId('ProfileCard.FirstnameInput'));
        await userEvent.clear(screen.getByTestId('ProfileCard.LastnameInput'));

        await userEvent.type(screen.getByTestId('ProfileCard.FirstnameInput'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.LastnameInput'), 'user');

        expect(screen.getByTestId('ProfileCard.FirstnameInput')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.LastnameInput')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelBtn'));

        expect(screen.getByTestId('ProfileCard.FirstnameInput')).toHaveValue(profileData.firstname);
        expect(screen.getByTestId('ProfileCard.LastnameInput')).toHaveValue(profileData.lastname);
    });

    test('with validation errors', async () => {
        renderForTests(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));

        await userEvent.clear(screen.getByTestId('ProfileCard.FirstnameInput'));
        await userEvent.clear(screen.getByTestId('ProfileCard.LastnameInput'));

        await userEvent.click(screen.getByTestId('EditableProfileCardFooter.SaveBtn'));

        expect(screen.getByTestId('EditableProfileCardFooter.Error.Text')).toBeInTheDocument();
    });

    test('Success Saving', async () => {
        renderForTests(<EditableProfileCard id="1" />, options);
        const mockApi = jest.spyOn($api, 'put');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));

        await userEvent.clear(screen.getByTestId('ProfileCard.FirstnameInput'));
        await userEvent.clear(screen.getByTestId('ProfileCard.LastnameInput'));

        await userEvent.type(screen.getByTestId('ProfileCard.FirstnameInput'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.LastnameInput'), 'user');

        await userEvent.click(screen.getByTestId('EditableProfileCardFooter.SaveBtn'));

        expect(mockApi).toHaveBeenCalled();
    });
});
