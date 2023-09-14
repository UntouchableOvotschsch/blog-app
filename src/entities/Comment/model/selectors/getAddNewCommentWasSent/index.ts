import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNewCommentWasSent = (
    state: StateSchema,
) => state.commentForm?.wasSent || false;
