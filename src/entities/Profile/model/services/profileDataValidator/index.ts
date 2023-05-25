import { ProfileType } from 'entities/Profile';
import { ProfileValidationErrors } from 'entities/Profile/model/types/profile';

export const profileDataValidator = (profile?: ProfileType): ProfileValidationErrors[] => {
    if (!profile) {
        return [ProfileValidationErrors.NO_DATA];
    }
    const {
        age,
        lastname,
        username,
        country,
        firstname,
    } = profile;

    const errors: ProfileValidationErrors[] = [];

    if (!username || !firstname || !lastname) {
        errors.push(ProfileValidationErrors.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age) || age <= 0) {
        errors.push(ProfileValidationErrors.INCORRECT_AGE);
    }

    if (!country) {
        errors.push(ProfileValidationErrors.INCORRECT_COUNTRY);
    }

    return errors;
};
