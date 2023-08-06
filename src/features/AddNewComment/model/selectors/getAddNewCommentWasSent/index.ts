import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNewCommentWasSent = (
    state: StateSchema,
) => state.addNewComment?.wasSent || false;
