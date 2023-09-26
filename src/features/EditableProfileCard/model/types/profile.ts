import { ProfileType } from '@/entities/Profile';
import { ProfileValidationErrors } from '../consts';

export interface ProfileSchema {
    data?: ProfileType,
    isLoading: boolean,
    error?: string
    editable: boolean
    form?: ProfileType
    validationError?: ProfileValidationErrors[]

}
