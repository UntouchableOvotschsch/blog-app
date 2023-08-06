import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNewCommentLoading = (
    state: StateSchema,
) => state.addNewComment?.isLoading || false;
