import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddNewCommentLoading = (
    state: StateSchema,
) => state.commentForm?.isLoading || false;
