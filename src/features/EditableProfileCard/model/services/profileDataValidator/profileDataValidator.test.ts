import { Countries } from '@/entities/Country';
import { ProfileType } from '@/entities/Profile';
import { profileDataValidator } from './index';

describe('profileDataValidator.test', () => {
    test('with no data', () => {
        expect(profileDataValidator(undefined))
            .toEqual(['NO_DATA']);
    });
    test('with empty obj', () => {
        expect(profileDataValidator({}))
            .toEqual(['NO_DATA']);
    });

    test('with incorrect user data', () => {
        expect(profileDataValidator({
            username: '',
            lastname: 'S',
            firstname: 'S',
            age: 22,
            country: Countries.Russia,
        } as ProfileType))
            .toEqual([
                'INCORRECT_USER_DATA',
            ]);
    });

    test('with incorrect type age', () => {
        expect(profileDataValidator({
            username: 'S',
            lastname: 'S',
            firstname: 'S',
            age: '20',
            country: Countries.Russia,
        } as unknown as ProfileType))
            .toEqual([
                'INCORRECT_AGE',
            ]);
    });

    test('with negative age', () => {
        expect(profileDataValidator({
            username: 'S',
            lastname: 'S',
            firstname: 'S',
            age: -20,
            country: Countries.Russia,
        } as ProfileType))
            .toEqual([
                'INCORRECT_AGE',
            ]);
    });

    test('with incorrect country', () => {
        expect(profileDataValidator({
            username: 'S',
            lastname: 'S',
            firstname: 'S',
            country: '',
            age: 22,
        } as unknown as ProfileType))
            .toEqual([
                'INCORRECT_COUNTRY',
            ]);
    });
});
