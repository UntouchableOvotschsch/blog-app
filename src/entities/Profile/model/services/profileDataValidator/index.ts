import { ProfileType } from 'entities/Profile';
import { ProfileValidationErrors } from 'entities/Profile/model/types/profile';
import { emptyObjChecker } from 'shared/lib/helpers/emptyObjChecker';

export const profileDataValidator = (profile?: ProfileType): ProfileValidationErrors[] => {
    const isEmpty = emptyObjChecker(profile);
    if (!profile || isEmpty) {
        return [ProfileValidationErrors.NO_DATA];
    }
    const errors: ProfileValidationErrors[] = [];

    const {
        age,
        lastname,
        username,
        country,
        firstname,
    } = profile;

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
