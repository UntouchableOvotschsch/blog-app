import { FeatureFlags } from '@/shared/types/featureFlags';

import { JsonSettings } from './jsonSettings';
import { UserRoles } from '../consts';

export interface User {
    id: string;
    username: string;
    password?: string;
    avatar?: string;
    roles: UserRoles[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
