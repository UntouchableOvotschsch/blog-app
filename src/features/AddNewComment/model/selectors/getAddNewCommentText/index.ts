import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNewCommentText = (
    state: StateSchema,
) => state.addNewComment?.commentText || '';
