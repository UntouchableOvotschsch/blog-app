import { ProfileType } from 'entities/Profile';
import { ProfileValidationErrors } from '../consts/index';

export interface ProfileSchema {
    data?: ProfileType,
    isLoading: boolean,
    error?: string
    editable: boolean
    form?: ProfileType
    validationError?: ProfileValidationErrors[]

}
