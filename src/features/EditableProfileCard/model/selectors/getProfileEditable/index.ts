import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileEditable = (state: StateSchema) => state?.profile?.editable || false;
