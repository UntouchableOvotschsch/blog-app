import { ProfileType } from 'entities/Profile';

export enum ProfileValidationErrors {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
    NO_RIGHTS_TO_EDIT = 'NO_RIGHTS_TO_EDIT'
}

export interface ProfileSchema {
    data?: ProfileType,
    isLoading: boolean,
    error?: string
    editable: boolean
    form?: ProfileType
    validationError?: ProfileValidationErrors[]

}