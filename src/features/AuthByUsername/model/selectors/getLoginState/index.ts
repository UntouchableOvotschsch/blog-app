import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginState = (state: StateSchema) =>
    state?.authByUsername || {
        username: '',
        password: '',
        error: '',
        isLoading: false,
    };
