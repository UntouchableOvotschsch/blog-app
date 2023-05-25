import { Currencies } from 'entities/Currency/model/types/currencies';
import { Countries } from 'entities/Country/model/types/countries';

export enum ProfileValidationErrors {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR'
}

export interface ProfileType {
    'firstname'?: string,
    'lastname'?: string,
    'age'?: number,
    'currency'?: Currencies,
    'country'?: Countries,
    'city'?: string,
    'username'?: string,
    'avatar'?: string
}

export interface ProfileSchema {
    data?: ProfileType,
    isLoading: boolean,
    error?: string
    editable: boolean
    form?: ProfileType
    validationError?: ProfileValidationErrors[]

}
